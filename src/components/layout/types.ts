export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface CodeBlock {
  type: "code" | "text";
  language?: string;
  content: string;
}
