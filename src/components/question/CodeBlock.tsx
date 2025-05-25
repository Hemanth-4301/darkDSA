import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-md overflow-hidden">
      <div className="flex justify-between items-center py-2 px-4 bg-gray-900 text-gray-200">
        <span className="text-xs font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center text-xs hover:text-white focus:outline-none"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 mr-1" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 mr-1" /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 bg-slate-800 dark:bg-black text-green-400 text-gray-200 overflow-x-auto">
        <p className={`language-${language}`}>{code}</p>
      </pre>
    </div>
  );
};

export default CodeBlock;
