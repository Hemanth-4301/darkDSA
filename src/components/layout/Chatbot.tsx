import React, { useState, useRef, useEffect } from "react";
import {
  Copy,
  Send,
  Bot,
  Loader2,
  Volume2,
  VolumeX,
  Mic,
  Plus,
} from "lucide-react";
import { Message, CodeBlock } from "./types";

const Chatbot: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechMessageId, setSpeechMessageId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const speechSynthesis = window.speechSynthesis;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<any>(null);

  const startNewConversation = () => {
    setMessages([]);
    setInput("");
  };

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => prev + transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        setError("Speech recognition failed. Please try again.");
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          setIsListening(false);
        }
      };
    } else {
      console.warn("Speech recognition not supported");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, [speechSynthesis]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error("Speech recognition start failed:", e);
        setIsListening(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    // Include previous messages for context
    const conversationHistory = [...messages, userMessage]
      .map(
        (msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
      )
      .join("\n\n");

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA0_UI74_D3ALET9H0leTY23Ujamhkrgkw",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": "AIzaSyA0_UI74_D3ALET9H0leTY23Ujamhkrgkw",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a helpful AI assistant. Continue this conversation and remember the context:\n\n${conversationHistory}\n\nAssistant:`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const botResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response.";

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: botResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Error calling Gemini API:", err);
      setError("Failed to get response from AI. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "I encountered an error processing your request. Please try again later.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    const toast = document.createElement("div");
    toast.textContent = "Copied to clipboard!";
    toast.className =
      "fixed bottom-4 right-4 bg-gradient-to-r from-blue-600/90 to-blue-700/90 text-white px-4 py-2 rounded-lg shadow-lg z-50 backdrop-blur-md";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const toggleSpeech = (message: Message) => {
    if (isSpeaking && speechMessageId === message.id) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeechMessageId(null);
      return;
    }

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(
      message.content.replace(/```[\s\S]*?```/g, "")
    );
    utteranceRef.current = utterance;

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeechMessageId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeechMessageId(null);
    };

    speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setSpeechMessageId(message.id);
  };

  const stopAllSpeech = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setSpeechMessageId(null);
  };

  // Stop speech when component unmounts or page is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAllSpeech();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const extractCodeBlocks = (content: string): CodeBlock[] => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)\n```/g;
    const blocks: CodeBlock[] = [];
    let match;
    let lastIndex = 0;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        blocks.push({
          type: "text",
          content: content.substring(lastIndex, match.index),
        });
      }

      blocks.push({
        type: "code",
        language: match[1] || "plaintext",
        content: match[2],
      });

      lastIndex = codeBlockRegex.lastIndex;
    }

    if (lastIndex < content.length) {
      blocks.push({
        type: "text",
        content: content.substring(lastIndex),
      });
    }

    return blocks.length ? blocks : [{ type: "text", content }];
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Render the message content with proper formatting
  const renderMessageContent = (content: string) => {
    const blocks = extractCodeBlocks(content);

    return (
      <div className="prose dark:prose-invert max-w-full">
        {blocks.map((block, index) => {
          if (block.type === "code") {
            return (
              <div key={index} className="relative my-2">
                <div className="flex justify-between items-center bg-indigo-900/70 text-white px-3 py-1 text-xs rounded-t-lg backdrop-blur-md">
                  <span>{block.language || "code"}</span>
                  <button
                    onClick={() => copyToClipboard(block.content)}
                    className="flex items-center gap-1 hover:text-blue-200 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                </div>
                <pre className="m-0 p-3 bg-indigo-950/80 text-gray-200 rounded-b-lg overflow-x-auto backdrop-blur-md">
                  <code>{block.content}</code>
                </pre>
              </div>
            );
          }

          return (
            <div
              key={index}
              className="my-1 break-words whitespace-pre-wrap text-sm sm:text-base"
            >
              {block.content.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < block.content.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  // Chat header component
  const ChatHeader = () => (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/15 to-pink-500/20 backdrop-blur-lg border-b border-white/10">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 backdrop-blur-md shadow-lg border border-white/20">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
          AI Assistant
        </h2>
      </div>
      <button
        onClick={startNewConversation}
        className="p-2 rounded-xl flex items-center gap-2 bg-gradient-to-r from-indigo-500/80 to-purple-500/80 text-white text-sm hover:from-indigo-600/80 hover:to-purple-600/80 transition-all duration-300 backdrop-blur-md border border-white/10 shadow-md"
        title="New Conversation"
      >
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">New chat</span>
      </button>
    </div>
  );

  // Chat messages component
  const ChatMessages = () => (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-white/90 p-4">
          <div className="w-16 h-16 mb-4 flex items-center justify-center bg-white/10 rounded-full shadow-md backdrop-blur-sm border border-white/20">
            <Bot className="w-7 h-7 text-white/90" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-center text-white">
            How can I help you today?
          </h3>
          <p className="text-center max-w-md text-sm text-white/80 mb-6">
            Ask me anything about coding, algorithms, or tech. I can explain
            concepts, help debug code, or suggest solutions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
            {[
              "Explain React hooks with examples",
              "What's the best way to optimize images for web?",
              "How do I implement a search algorithm?",
              "Design patterns for scalable applications",
            ].map((prompt, i) => (
              <div
                key={i}
                className="p-3 rounded-lg cursor-pointer bg-white/10 hover:bg-white/15 transition-all duration-300 backdrop-blur-sm border border-white/15 shadow-sm"
                onClick={() => setInput(prompt)}
              >
                <p className="text-sm font-medium text-white/90">{prompt}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`w-full sm:max-w-[90%] rounded-xl p-4 backdrop-blur-sm transition-all duration-300 ${
                  message.role === "user"
                    ? "bg-indigo-600/20 text-white border border-indigo-500/30 shadow-sm"
                    : "bg-white/10 text-white border border-white/15 shadow-md"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center gap-2">
                    {message.role === "user" ? (
                      "You"
                    ) : (
                      <>
                        <Bot className="w-4 h-4" /> Gemini
                      </>
                    )}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs opacity-70">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.role === "assistant" && (
                      <button
                        onClick={() => toggleSpeech(message)}
                        className={`p-1 rounded-full ${
                          isSpeaking && speechMessageId === message.id
                            ? "text-pink-400 bg-pink-500/20"
                            : "text-white/70 hover:text-white/90 hover:bg-white/10"
                        } transition-all duration-300`}
                        title={
                          isSpeaking && speechMessageId === message.id
                            ? "Stop reading"
                            : "Read aloud"
                        }
                      >
                        {isSpeaking && speechMessageId === message.id ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                {renderMessageContent(message.content)}
              </div>
            </div>
          ))}
        </>
      )}
      {isLoading && (
        <div className="flex justify-start">
          <div className="w-full sm:max-w-[90%] rounded-xl p-4 bg-white/10 backdrop-blur-sm border border-white/15 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/10">
                <Bot className="w-3 h-3 text-white/80" />
              </div>
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="text-red-300 text-sm p-3 text-center rounded-lg bg-red-500/20 backdrop-blur-sm border border-red-500/30">
          {error}
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );

  // Chat input component
  const ChatInput = () => (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/15 to-pink-500/20 backdrop-blur-lg border-t border-white/10"
    >
      <div className="flex items-end gap-2">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full resize-none rounded-xl px-4 py-3 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 border border-white/20 backdrop-blur-md"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </div>
        <button
          type="button"
          onClick={toggleListening}
          className={`p-3 rounded-xl ${
            isListening
              ? "bg-pink-500/80 text-white"
              : "bg-white/10 text-white/80 hover:bg-white/15 hover:text-white"
          } transition-all duration-300 backdrop-blur-md border border-white/15 shadow-md`}
          title={isListening ? "Stop listening" : "Voice input"}
        >
          <Mic className="w-5 h-5" />
        </button>
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-3 rounded-xl bg-gradient-to-r from-indigo-500/90 to-purple-500/90 text-white hover:from-indigo-600/90 hover:to-purple-600/90 disabled:from-gray-500/50 disabled:to-gray-600/50 disabled:text-white/50 disabled:cursor-not-allowed transition-all duration-300 backdrop-blur-md border border-white/15 shadow-md"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
      <div className="flex justify-between items-center mt-2 px-1">
        <p className="text-xs text-white/60">
          Powered by <span className="text-indigo-300">Gemini</span>
        </p>
        {isSpeaking && (
          <button
            onClick={stopAllSpeech}
            className="text-xs flex items-center gap-1 text-pink-300 hover:text-pink-200 px-2 py-1 rounded-full transition-colors duration-300"
          >
            <VolumeX className="w-3 h-3" />
            Stop reading
          </button>
        )}
      </div>
    </form>
  );

  return (
    <div className="flex flex-col h-[90vh] w-full max-w-4xl bg-gradient-to-br from-white/10 to-white/5 dark:from-purple-900/10 dark:via-indigo-900/10 dark:to-blue-900/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default Chatbot;
