# Nimble.io — Frontend

This is the **frontend of nimble.io**, a browser-based IDE with **AI-assisted coding**.  
Built with **React** and **Vite**, the frontend provides a seamless interface where users can authenticate, manage profiles, and interact with AI-powered coding sessions.

---

## ✨ Features

### 🔑 Authentication UI
- Login, signup, and session management screens.
- Works with the backend **Auth Service**.

### 👤 User Dashboard
- Profile management and settings.
- User details CRUD operations via the backend.

### 💬 AI Chat IDE
- Rich chat interface to interact with the **Gemini LLM**.
- Displays generated and enhanced code.
- Provides an in-browser **IDE-like experience**:
  - Code editor
  - Live preview
  - Interactive Q&A with AI
  - Integration with **StackBlitz containers** for compilation and execution.

---

## 🛠️ Tech Stack
- **React** (UI library)
- **Vite** (fast build tool + dev server)
- **TypeScript** (type safety)
- **TailwindCSS / CSS Modules** (styling, if applicable)
- **Axios / Fetch** (API communication with backend)

---
## ⚙️ Setup & Installation

  1. Clone the repository:
   ```bash
   git clone https://github.com/aditiyax/Nimble.io-Client.git.git
   cd nimble.io-client
   ```


 2. Install dependencies::
 ```bash
  npm install
 ```


 3. Setup environment variables (.env):
 ```env
VITE_API_URL=http://localhost:3000   # Backend server URL

 ```

4. Start the server:
   ```bash
   npm run dev
   ```

5.Build for production:
```bash
npm run build
```
---
