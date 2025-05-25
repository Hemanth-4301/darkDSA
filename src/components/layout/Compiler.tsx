import React from "react";
import { Card } from "antd";

interface CompilerProps {
  height?: string | number;
  width?: string | number;
}

const JavaCompiler: React.FC<CompilerProps> = ({
  height = "600px",
  width = "100%",
}) => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "10px",
        paddingBottom: "40px",
        boxSizing: "border-box",
      }}
    >
      <Card
        title="Java Compiler (Powered by JDoodle)"
        bodyStyle={{ padding: 0 }}
        style={{ borderRadius: "8px", overflow: "hidden" }}
      >
        <iframe
          src="https://www.jdoodle.com/online-java-compiler"
          title="Java Compiler"
          style={{
            width: "100%",
            height: typeof height === "string" ? height : `${height}px`,
            border: "none",
            borderRadius: "8px",
          }}
          allow="clipboard-write; clipboard-read"
          allowFullScreen
        ></iframe>
      </Card>
    </div>
  );
};

export default JavaCompiler;
