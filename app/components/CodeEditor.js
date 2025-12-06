"use client";

import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

export default function CodeEditor({ value, onChange }) {
  const monaco = useMonaco();

  useEffect(() => {
    if (!monaco) return;

    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      allowJs: true,
      checkJs: true,
      noLib: true,
      target: monaco.languages.typescript.ScriptTarget.ESNext
    });

  }, [monaco]);

  return (
    <Editor
      height="350px"
      defaultLanguage="javascript"
      theme="vs-dark"
      value={value}
      onChange={(v) => onChange(v)}
      options={{
        fontSize: 16,
        minimap: { enabled: false },
        automaticLayout: true
      }}
    />
  );
}
