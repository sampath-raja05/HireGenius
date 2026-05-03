'use client';

import {
  Code,
  CodeBlock,
  CodeHeader,
} from '@/components/animate-ui/components/animate/code';

import { Code2 } from 'lucide-react';


export const CodeDemo = ({
  duration,
  delay,
  writing,
  cursor,
}) => {
  return (
    <Code
      key={`${duration}-${delay}-${writing}-${cursor}`}
      className="w-[420px] h-[372px]"
      code={`import React, { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Simple Counter</h1>
      <p style={styles.count}>{count}</p>

      <div style={styles.buttonGroup}>
        <button onClick={increase} style={styles.btn}>+</button>
        <button onClick={decrease} style={styles.btn}>-</button>
        <button onClick={reset} style={styles.btn}>Reset</button>
      </div>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  title: { fontSize: "28px" },
  count: { fontSize: "40px", margin: "20px" },
  buttonGroup: { display: "flex", justifyContent: "center", gap: "10px" },
  btn: { padding: "10px 20px", fontSize: "18px", cursor: "pointer" }
};`}
    >
      <CodeHeader icon={Code2} copyButton>
        react.jsx
      </CodeHeader>

      <CodeBlock
        cursor={cursor}
        lang="jsx"
        writing={writing}
        duration={duration}
        delay={delay}
      />
    </Code>
  );
};