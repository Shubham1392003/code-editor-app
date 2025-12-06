const helpDatabase = [
  {
    keywords: ["syntax", "error"],
    response:
      "A syntax error means something is wrong with brackets, commas, or structure. Try checking missing `}` or `)`, or click Auto-Fix.",
  },
  {
    keywords: ["run", "execute"],
    response: "Use the Run button to execute your code safely in the sandbox.",
  },
  {
    keywords: ["console", "log"],
    response: "Use console.log() to print outputs. Example: console.log('Hello');",
  },
  {
    keywords: ["variable", "let", "const"],
    response: "Variables are declared using let, const, or var. Example: let x = 10;",
  },
  {
    keywords: ["function"],
    response: "A function is defined like: function test() { console.log('Hi'); }",
  },
  {
    keywords: ["loop", "for", "while"],
    response:
      "Common loops: for(let i=0;i<5;i++){console.log(i);} or while(condition){...}",
  },
];

export default function getHelp(query) {
  const q = query.toLowerCase();
  let bestMatch = null;
  let maxScore = 0;

  helpDatabase.forEach((item) => {
    let score = item.keywords.filter((k) => q.includes(k)).length;
    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  });

  if (bestMatch) return bestMatch.response;

  return "No match found. Try asking about: function, variable, console, loop, error.";
}
