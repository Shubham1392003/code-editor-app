"use client";

import Editor from "@monaco-editor/react";

export default function CodeEditor({ value, onChange }) {
  return (
    <Editor
      height="350px"
      language="javascript"
      theme="vs-dark"
      value={value}
      onChange={(v) => onChange(v)}
      options={{
        fontSize: 16,
        minimap: { enabled: false },
        automaticLayout: true,
        suggestOnTriggerCharacters: true,
        quickSuggestions: true,
        wordBasedSuggestions: true,
        tabCompletion: "on",
        inlineSuggest: { enabled: true },
      }}
    />
  );
}
