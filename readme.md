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
## 📖 Usage Flow

1. User visits **nimble.io** and logs in/signup through the **frontend auth UI**.  
2. The app fetches and displays user details via the **User Service** backend.  
3. In the **Chat IDE**, users interact with Gemini:
   - Type prompts or code-related queries  
   - Get enhanced/generated code from backend  
   - Run/compile in a **StackBlitz container** embedded in the UI  
   - Continue editing and iterating directly in the browser  

---

## 🌐 Vision

The frontend of nimble.io makes the **AI + Cloud IDE** experience accessible to anyone, anywhere:

- A clean, intuitive UI built with React + Vite  
- Seamless integration with backend services  
- Real-time AI-assisted coding in your browser  

---

## 📜 License

MIT License — free to use, modify, and distribute.

---
