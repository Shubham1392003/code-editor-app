export default function autoFix(code) {
  let lines = code.split("\n");
  let indentLevel = 0;
  let fixedLines = [];
  let declaredVars = new Set();

  const isVar = (v) => /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(v);

  for (let line of lines) {
    let original = line;
    line = line.trim();

    // =======================================================
    // 🔥  A — EXTRA SPACES CLEANUP
    // =======================================================
    line = line.replace(/\s+/g, " ").trim();

    // =======================================================
    // 🔥  B — COMMON FIXES (typos, var→let)
    // =======================================================
    line = line.replace(/consol\.log/g, "console.log"); // fix console
    line = line.replace(/^var\s+/, "let "); // var → let

    // =======================================================
    // 🔥  C — ASSIGNMENT FIX (missing '=')
    //
    //  x 10 → x = 10
    // =======================================================
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*\s+[a-zA-Z0-9"'[{]/.test(line)) {
      if (!line.includes("=") && !line.includes("function")) {
        const parts = line.split(" ");
        line = `${parts[0]} = ${parts.slice(1).join(" ")}`;
      }
    }

    // =======================================================
    // 🔥  D — ADD MISSING COMMAS IN OBJECT LITERALS
    // =======================================================
    line = line.replace(/(\w+:\s*[^,}\s]+)\s+(\w+:)/g, "$1, $2");

    // =======================================================
    // 🔥  E — FIX BROKEN ARRAYS
    // [1 2] → [1, 2]
    // =======================================================
    line = line.replace(/\[(\d+)\s+(\d+)\]/g, "[$1, $2]");

    // =======================================================
    // 🔥  F — ARROW FUNCTION FIX
    // foo => bar → foo => { bar; }
    // =======================================================
    if (/^\(?\w+\)?\s*=>/.test(line) && !line.includes("{")) {
      const [params, body] = line.split("=>");
      line = `${params.trim()} => { ${body.trim().replace(/;$/, "")}; }`;
    }

    // =======================================================
    // 🔥  G — MISSING “function” KEYWORD
    // foo() { … } → function foo() { … }
    // =======================================================
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*\([^)]*\)\s*\{/.test(line)) {
      if (!line.startsWith("function") && !line.includes("=>")) {
        line = "function " + line;
      }
    }

    // =======================================================
    // 🔥  H — ADD let automatically for undeclared variables
    // =======================================================
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*\s*=/.test(line)) {
      const name = line.split("=")[0].trim();
      if (!declaredVars.has(name)) {
        declaredVars.add(name);
        line = "let " + line;
      }
    }

    // =======================================================
    // 🔥  I — AUTO-ASYNC IF USING AWAIT
    // =======================================================
    if (line.includes("await ") && !line.startsWith("async ")) {
      line = "async " + line;
    }

    // =======================================================
    // 🔥  J — AUTO RETURN inside functions
    //
    // If inside a function block (indent > 0) and line looks like
    // an expression → return <expr>
    // =======================================================
    if (
      indentLevel > 0 &&
      /^[a-zA-Z0-9_$+\-*/"'`]/.test(line) &&
      !line.startsWith("let") &&
      !line.startsWith("const") &&
      !line.startsWith("return") &&
      !line.startsWith("async") &&
      !line.startsWith("function")
    ) {
      line = "return " + line;
    }

    // =======================================================
    // 🔥  K — REMOVE UNREACHABLE CODE (return ... return)
    // =======================================================
    if (/return/.test(line)) {
      line = line.replace(/return.*return.*/g, (m) => m.split("return")[1]);
    }

    // =======================================================
    // 🔥  L — Missing Quotes in key/value
    // =======================================================
    if (/^[^"'`]+\s*:\s*[^"'`]+$/.test(line)) {
      line = line.replace(/:\s*([a-zA-Z0-9]+)/, ':"$1"');
    }

    // =======================================================
    // 🔥  M — FIX TEMPLATE LITERAL ERROR
    // =======================================================
    if (line.includes("${") && !line.includes("`")) {
      line = "`" + line + "`";
    }

    // =======================================================
    // 🔥  N — BALANCE BRACKETS
    // =======================================================
    const openP = (line.match(/\(/g) || []).length;
    const closeP = (line.match(/\)/g) || []).length;
    if (openP > closeP) line += ")".repeat(openP - closeP);

    const openC = (line.match(/\{/g) || []).length;
    const closeC = (line.match(/\}/g) || []).length;
    if (openC > closeC) line += "}".repeat(openC - closeC);

    const openB = (line.match(/\[/g) || []).length;
    const closeB = (line.match(/\]/g) || []).length;
    if (openB > closeB) line += "]".repeat(openB - closeB);

    // =======================================================
    // 🔥  O — ADD MISSING SEMICOLON
    // =======================================================
    if (
      line &&
      !line.endsWith(";") &&
      !line.endsWith("{") &&
      !line.endsWith("}") &&
      !line.startsWith("//")
    ) {
      line += ";";
    }

    // =======================================================
    // 🔥  P — SMART INDENTATION
    // =======================================================
    if (line.startsWith("}")) indentLevel = Math.max(0, indentLevel - 1);

    fixedLines.push("  ".repeat(indentLevel) + line);

    if (line.endsWith("{")) indentLevel++;
  }

  // =======================================================
  // 🔥 FINAL CLEANUP PASS
  // =======================================================
  return fixedLines
    .join("\n")
    .replace(/;;+/g, ";")
    .replace(/\s+$/, "");
}
