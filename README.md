# Code Editor App — Next.js

This is a simple web-based code editor built with **Next.js**, featuring:

- A JavaScript code editor (Monaco Editor)
- A console section to run and display output
- A local auto-fix system that cleans and corrects code
- A help panel that shows predefined tips based on keywords

This project was created as part of an internship assignment.

---

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
Then run the development server:

bash

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open http://localhost:3000 in your browser to view the app.
```
### 📂 Project Structure

```
 app/
  page.js              → main UI (editor + buttons + console)
  components/
    CodeEditor.js      → Monaco code editor
    ConsoleOutput.js   → Output / error display
    HelpPanel.js       → Help popup with keyword-based tips
  lib/
    runCode.js         → Safe JS execution sandbox
    autoFix.js         → Local rule-based code auto-fix system
    helpData.js        → Predefined help responses
public/
  favicon.ico
```
## README.md
✨ Auto-Fix Rules
When the Auto Fix button is clicked, the app runs a custom rule-based formatter that:

Adds missing semicolons
Fixes indentation
Removes extra spaces
Corrects unbalanced brackets (), {}, []
Fixes simple JavaScript mistakes (e.g., consol.log → console.log)
Adds let for undeclared variables
Converts var → let
Normalizes spacing around operators
Fixes arrow function shorthand
Cleans double semicolons
Repairs broken object and array formatting
Ensures parentheses and braces are balanced
This system runs entirely locally — no AI or API required.

### 💬 Help Panel
Clicking the Help button opens a small side panel.
Users can type questions such as:
"semicolon"
"brackets"
"how to run code"
"common errors"
The panel matches keywords and displays predefined tips to assist beginners.

### ▶️ Running Code
The Run button executes the code inside a safe sandbox environment using a restricted JS evaluator. Output and errors appear in the bottom console section.

📦 Deliverables Included
Full Next.js project with clean state management

Local auto-fix engine with readable code

Keyword-based help panel

📚 Learn More
To learn more about the technologies used:

Next.js Documentation
Monaco Editor
JavaScript Basics
🛠 Deployment
You can deploy this project easily using Vercel, the creators of Next.js:

https://vercel.com/new

Follow the official Next.js deployment guide for details.
