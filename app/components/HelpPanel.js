"use client";
import { useState } from "react";
import getHelp from "../lib/help";

export default function HelpPanel({ onClose }) {
  const [query, setQuery] = useState("");
  const [reply, setReply] = useState("");

  return (
    <div className="fixed right-0 top-0 w-80 h-full bg-[#2b2b2b] text-white p-4 border-l border-gray-700">
      <button className="text-red-400 mb-4" onClick={onClose}>
        Close ❌
      </button>

      <h2 className="text-lg font-bold mb-3">Help Panel</h2>

      <textarea
        className="w-full p-2 bg-[#1e1e1e] border border-gray-600 rounded"
        rows={4}
        placeholder="Ask something..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        className="w-full mt-2 bg-blue-600 p-2 rounded"
        onClick={() => setReply(getHelp(query))}
      >
        Get Help
      </button>

      <div className="mt-4 p-3 bg-[#111] rounded h-56 overflow-auto text-sm border border-gray-700">
        {reply || "Help response will appear here..."}
      </div>
    </div>
  );
}
