import React, { useState, useRef, useEffect } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // Or choose a light theme
import {
  Copy,
  Send,
  User,
  Bot,
  Loader2,
  Volume2,
  VolumeX,
  Mic,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  // Glass morphism styles
  const glassStyle = {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
  };

  const darkGlassStyle = {
    background: "rgba(15, 15, 25, 0.7)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
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
    // Toast notification would be better here
    const toast = document.createElement("div");
    toast.textContent = "Copied to clipboard!";
    toast.className =
      "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out";
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
                <div className="flex justify-between items-center bg-gray-800/90 text-gray-300 px-3 py-1 text-xs rounded-t-lg">
                  <span>{block.language || "code"}</span>
                  <button
                    onClick={() => copyToClipboard(block.content)}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                </div>
                <pre className="m-0 rounded-b-lg rounded-t-none">
                  <code
                    className={`hljs language-${block.language}`}
                    dangerouslySetInnerHTML={{ __html: highlightedCode }}
                  />
                </pre>
              </div>
            );
          }

          const html = marked(block.content);
          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: html }}
              className="my-1"
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
    <div
      className="flex flex-col h-full rounded-2xl overflow-hidden relative"
      style={{
        background:
          "linear-gradient(135deg, rgba(200,210,255,0.2) 0%, rgba(220,230,255,0.1) 100%)",
        ...glassStyle,
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full text-gray-600 dark:text-gray-300"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-24 h-24 mb-6 flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "50%",
              }}
            >
              <Bot className="w-12 h-12 text-blue-500" />
            </motion.div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              How can I help you today?
            </h3>
            <p className="text-center max-w-md text-gray-600 dark:text-gray-300 mb-8">
              Ask me anything about coding, algorithms, or tech. I can explain
              concepts, help debug code, or suggest solutions.
            </p>
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              {[
                "What's the optimal solution for the 3Sum problem in Java?",
                "Explain React hooks with examples",
                "Python best practices for clean code",
                "How to optimize SQL queries?",
              ].map((prompt, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 rounded-xl cursor-pointer transition-all"
                  style={{
                    background: "rgba(255,255,255,0.25)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                  onClick={() => setInput(prompt)}
                >
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {prompt.split("?")[0].substring(0, 30)}...
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {/* REMOVED HOVER EFFECT */}
                <div
                  className={`max-w-3xl rounded-2xl px-5 py-4 relative group ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                  style={
                    message.role === "user"
                      ? {
                          boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)",
                        }
                      : {
                          ...darkGlassStyle,
                          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                        }
                  }
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {message.role === "user" ? (
                        <User className="w-5 h-5" />
                      ) : (
                        <Bot className="w-5 h-5 text-blue-400" />
                      )}
                      <span className="text-sm font-medium">
                        {message.role === "user" ? "You" : "Gemini"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs text-gray-300 dark:text-gray-400">
                        {formatTime(message.timestamp)}
                      </span>
                      {message.role === "assistant" && (
                        <button
                          onClick={() => toggleSpeech(message)}
                          className={`p-1 rounded-full ${
                            isSpeaking && speechMessageId === message.id
                              ? "bg-red-500/20 text-red-500"
                              : "bg-gray-200/30 hover:bg-gray-200/50 text-gray-700 dark:text-gray-300"
                          }`}
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
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div
              className="max-w-3xl rounded-2xl px-5 py-4"
              style={darkGlassStyle}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500/20">
                  <Bot className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 dark:text-red-400 text-sm p-3 px-4 text-center rounded-xl"
            style={{
              background: "rgba(239, 68, 68, 0.15)",
              backdropFilter: "blur(8px)",
            }}
          >
            {error}
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSubmit}
        className="p-5 relative z-10"
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message or click mic to speak..."
              className="w-full resize-none rounded-xl px-5 py-4 bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent transition-all duration-200 pr-12 border border-white/30 dark:border-gray-700/50 shadow-sm"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              style={{
                backdropFilter: "blur(8px)",
              }}
            />
            <button
              type="button"
              onClick={toggleListening}
              className={`absolute right-3 bottom-3 p-2 rounded-full transition-all ${
                isListening
                  ? "text-white bg-red-500 shadow-lg shadow-red-500/30"
                  : "text-gray-500 hover:text-blue-500 bg-white/80 hover:bg-white shadow-md dark:bg-gray-700/80 dark:hover:bg-gray-700"
              }`}
              title={isListening ? "Stop listening" : "Voice input"}
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>
          <motion.button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 dark:disabled:from-gray-600 dark:disabled:to-gray-700 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: !input.trim() || isLoading ? 1 : 1.05 }}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </motion.button>
        </div>
        <div className="flex justify-between items-center mt-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Gemini may produce inaccurate information. Double-check important
            facts.
          </p>
          {isSpeaking && (
            <motion.button
              onClick={stopAllSpeech}
              className="text-xs flex items-center gap-1 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 px-3 py-1 rounded-full bg-red-500/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <VolumeX className="w-3 h-3" />
              Stop reading
            </motion.button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
