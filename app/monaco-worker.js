import * as monaco from "monaco-editor";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") return new Worker("/json.worker.js", { type: "module" });
    if (label === "css") return new Worker("/css.worker.js", { type: "module" });
    if (label === "html") return new Worker("/html.worker.js", { type: "module" });
    if (label === "typescript" || label === "javascript")
      return new Worker("/ts.worker.js", { type: "module" });

    return new Worker("/editor.worker.js", { type: "module" });
  }
};
