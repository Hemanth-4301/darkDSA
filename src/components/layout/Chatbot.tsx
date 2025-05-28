import React, { useState, useRef, useEffect } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
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

// Configure marked to use highlight.js for code blocks
marked.setOptions({
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-",
});

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

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
      "fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50";
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

  const extractCodeBlocks = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)\n```/g;
    const blocks = [];
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

  const renderMessageContent = (content: string) => {
    const blocks = extractCodeBlocks(content);

    return (
      <div className="prose dark:prose-invert max-w-full">
        {blocks.map((block, index) => {
          if (block.type === "code") {
            const highlightedCode = hljs.highlight(block.content, {
              language: block.language,
            }).value;

            return (
              <div key={index} className="relative my-2">
                <div className="flex justify-between items-center bg-gray-800 text-gray-300 px-3 py-1 text-xs rounded-t-lg">
                  <span>{block.language || "code"}</span>
                  <button
                    onClick={() => copyToClipboard(block.content)}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                </div>
                <pre className="m-0 p-2 bg-gray-900 rounded-b-lg overflow-x-auto">
                  <code
                    className={`hljs language-${block.language}`}
                    dangerouslySetInnerHTML={{ __html: highlightedCode }}
                  />
                </pre>
              </div>
            );
          }

          // Process markdown and bold important text (between **)
          const html = marked(
            block.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          );
          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: html }}
              className="my-1 break-words"
            />
          );
        })}
      </div>
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-white/20 to-white/10 dark:from-gray-900/20 dark:to-gray-900/10 backdrop-blur-2xl rounded-xl overflow-hidden border border-white/30 dark:border-gray-700/30 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg border-b border-white/30 dark:border-gray-700/30">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-500/20 backdrop-blur-sm">
            <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Gemini Chat
          </h2>
        </div>
        <button
          onClick={startNewConversation}
          className="p-2 rounded-lg flex items-center gap-1 bg-gradient-to-r from-blue-500/90 to-blue-600/90 text-white text-sm hover:from-blue-600/90 hover:to-blue-700/90 transition-all backdrop-blur-sm shadow-sm"
          title="New Conversation"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New chat</span>
        </button>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-gray-400/20 scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-600 dark:text-gray-300 p-4">
            <div className="w-16 h-16 mb-4 flex items-center justify-center bg-white/30 dark:bg-gray-800/50 rounded-full shadow-md backdrop-blur-sm border border-white/30">
              <Bot className="w-7 h-7 text-gray-600 dark:text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 text-center">
              How can I help you today?
            </h3>
            <p className="text-center max-w-md text-sm text-gray-600 dark:text-gray-300 mb-6">
              Ask me anything about coding, algorithms, or tech. I can explain
              concepts, help debug code, or suggest solutions.
            </p>
            <div className="grid grid-cols-1 gap-2 w-full max-w-md">
              {[
                "What's the optimal solution for the 3Sum problem in Java?",
                "Explain React hooks with examples",
                "Python best practices for clean code",
                "How to optimize SQL queries?",
              ].map((prompt, i) => (
                <div
                  key={i}
                  className="p-2 rounded-lg cursor-pointer bg-white/40 dark:bg-gray-800/50 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all backdrop-blur-sm border border-white/30 dark:border-gray-700/30 shadow-sm"
                  onClick={() => setInput(prompt)}
                >
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {prompt.split("?")[0].substring(0, 30)}...
                  </p>
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
                  className={`max-w-[90%] rounded-xl p-3 backdrop-blur-sm ${
                    message.role === "user"
                      ? "bg-blue-500/10 text-gray-800 dark:text-white border border-blue-500/30 shadow-sm"
                      : "bg-white/30 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 border border-white/30 dark:border-gray-700/30 shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">
                      {message.role === "user" ? "You" : "Gemini"}
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
                              ? "text-red-500"
                              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                          }`}
                          title={
                            isSpeaking && speechMessageId === message.id
                              ? "Stop reading"
                              : "Read aloud"
                          }
                        >
                          {isSpeaking && speechMessageId === message.id ? (
                            <VolumeX className="w-3 h-3" />
                          ) : (
                            <Volume2 className="w-3 h-3" />
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
            <div className="max-w-[90%] rounded-xl p-3 bg-white/30 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/30 dark:bg-gray-700/50">
                  <Bot className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="text-red-500 dark:text-red-400 text-sm p-3 text-center rounded-lg bg-red-50/50 dark:bg-red-900/20 backdrop-blur-sm border border-red-200 dark:border-red-900/30">
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSubmit}
        className="p-3 bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg border-t border-white/30 dark:border-gray-700/30"
      >
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message or click mic to speak..."
              className="w-full resize-none rounded-xl px-4 py-3 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 border border-white/40 dark:border-gray-600/50 backdrop-blur-sm"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button
              type="button"
              onClick={toggleListening}
              className={`absolute right-2 bottom-2 p-1 rounded-full ${
                isListening
                  ? "text-white bg-red-500"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 bg-white/70 dark:bg-gray-600/70 backdrop-blur-sm"
              }`}
              title={isListening ? "Stop listening" : "Voice input"}
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 rounded-xl bg-gradient-to-r from-blue-500/90 to-blue-600/90 text-white hover:from-blue-600/90 hover:to-blue-700/90 disabled:from-gray-400/50 disabled:to-gray-500/50 dark:disabled:from-gray-600/50 dark:disabled:to-gray-700/50 disabled:cursor-not-allowed transition-all backdrop-blur-sm shadow-sm"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        <div className="flex justify-between items-center mt-2 px-1">
          <p className="text-xs text-gray-500/80 dark:text-gray-400/80">
            Powered by <span className="text-blue-400">Gemini</span>
          </p>
          {isSpeaking && (
            <button
              onClick={stopAllSpeech}
              className="text-xs flex items-center gap-1 text-red-500 hover:text-red-600 dark:text-red-400 px-2 py-1 rounded-full"
            >
              <VolumeX className="w-3 h-3" />
              Stop reading
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
