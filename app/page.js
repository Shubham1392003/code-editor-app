"use client";
import { useState } from "react";

import CodeEditor from "./components/CodeEditor";
import HelpPanel from "./components/HelpPanel";
import ConsoleOutput from "./components/ConsoleOutput";

import runCodeSafely from "./lib/runCode";
import autoFix from "./lib/autofix";
// import autoFixAI from "./lib/autofixAI";



export default function Home() {
  const [code, setCode] = useState(`console.log("Hello from Monaco!")`);
  const [output, setOutput] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  const run = () => {
    const result = runCodeSafely(code);
    setOutput(result);
  };

  const fix = () => {
    setCode(autoFix(code));
  };




  return (
    <div className="p-6 bg-[#1e1e1e] min-h-screen text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Upgraded Code Runner</h1>
        <button
          className="px-4 py-2 bg-blue-600 rounded"
          onClick={() => setShowHelp(true)}
        >
          Help
        </button>
      </div>

      <CodeEditor value={code} onChange={setCode} />

      <div className="flex gap-4 mt-4">
        <button onClick={run} className="px-4 py-2 bg-green-600 rounded">
          Run
        </button>

        <button onClick={fix} className="px-4 py-2 bg-orange-500 rounded">
          Auto Fix
        </button>

      </div>

      <ConsoleOutput output={output} />

      {showHelp && <HelpPanel onClose={() => setShowHelp(false)} />}
    </div>
    

    
  );
}
