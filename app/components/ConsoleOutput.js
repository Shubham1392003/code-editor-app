export default function ConsoleOutput({ output }) {
  return (
    <div className="mt-4 p-4 bg-black text-green-400 rounded h-48 overflow-auto font-mono">
      {output || "Output will appear here..."}
    </div>
  );
}
