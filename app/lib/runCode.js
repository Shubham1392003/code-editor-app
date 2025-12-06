export default function runCodeSafely(code) {
  try {
    const sandboxConsole = {
      logs: [],
      log: function (...args) {
        this.logs.push(args.join(" "));
      },
    };

    const fn = new Function("console", code);
    fn(sandboxConsole);

    return sandboxConsole.logs.join("\n") || "Code executed!";
  } catch (err) {
    return "❌ Error: " + err.message;
  }
}
