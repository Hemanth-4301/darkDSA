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
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <Card
        title="Java Compiler (Powered by JDoodle)"
        bodyStyle={{ padding: 0 }}
        style={{ borderRadius: "8px", overflow: "hidden" }}
      >
        <div
          style={{
            position: "relative",
            paddingTop: "56.25%", // 16:9 aspect ratio
            height: 0,
            overflow: "hidden",
          }}
        >
          <iframe
            src="https://www.jdoodle.com/online-java-compiler"
            title="Java Compiler"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            allowFullScreen
          ></iframe>
        </div>
      </Card>
    </div>
  );
};

export default JavaCompiler;
