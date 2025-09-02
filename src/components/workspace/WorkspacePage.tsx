import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FileExplorer } from "./FileExplorer";
import { CodeEditor } from "./CodeEditor";
import { StepsPanel } from "./StepsPanel";
import { Terminal } from "./Terminal";
import { useTheme } from "../../contexts/ThemeContext";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { Step, FileItem, StepType } from "../../types";
import { parseXml } from "../steps"; // Ensure this path is correct

export const WorkspacePage: React.FC = () => {
  // Your UI State
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const prompt = (location.state as { prompt?: string })?.prompt || "";

  // --- MENTOR'S CORE LOGIC & STATE ---
  const [steps, setSteps] = useState<Step[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [llmMessages, setLlmMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [userPrompt, setUserPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  // --- MENTOR'S "WORKER" useEffect ---
  // This hook watches the 'steps' array. When new pending steps appear,
  // it processes them to create/update the file structure.
  useEffect(() => {
    if (steps.length === 0) return;

    // Deep copy to avoid direct state mutation issues
    const newFiles = JSON.parse(JSON.stringify(files));
    let updateHappened = false;

    const pendingSteps = steps.filter((step) => step.status === "pending");

    if (pendingSteps.length > 0) {
      updateHappened = true;
      pendingSteps.forEach((step) => {
        if (step.type === StepType.CreateFile && step.path) {
          let currentLevel = newFiles;
          const pathParts = step.path.split("/").filter((p) => p);
          let currentPath = "";

          pathParts.forEach((part, index) => {
            currentPath = currentPath ? `${currentPath}/${part}` : part;
            const isLastPart = index === pathParts.length - 1;

            let node = currentLevel.find((f) => f.path === currentPath);

            if (isLastPart) {
              // It's a file
              if (!node) {
                currentLevel.push({
                  name: part,
                  type: "file",
                  path: currentPath,
                  content: step.code || "",
                });
              } else {
                node.content = step.code || "";
              }
            } else {
              // It's a folder
              if (!node) {
                node = {
                  name: part,
                  type: "folder",
                  path: currentPath,
                  children: [],
                };
                currentLevel.push(node);
              }
              if (!node.children) node.children = [];
              currentLevel = node.children;
            }
          });
        }
      });

      setFiles(newFiles);
      // Mark the processed steps as "completed" so they aren't processed again
      setSteps((prevSteps) =>
        prevSteps.map((s) =>
          s.status === "pending" ? { ...s, status: "completed" } : s
        )
      );
    }
  }, [steps]);

  // --- MENTOR'S API LOGIC ---
  const init = async (p: string) => {
    // if (!p) {
    //   navigate("/", { replace: true });
    //   return;
    // }
    setLoading(true);
    try {
      const templateResponse = await axios.post(
        `${BACKEND_URL}/chats/template`,
        { prompt: p.trim() }
      );
      const { template } = templateResponse.data;
      const initialMessages = [...template.prompts, { content: p }].map(
        (msg: any) => ({
          role: "user" as const,
          content: String(msg.content || msg.text || ""),
        })
      );
      setLlmMessages(initialMessages);

      const chatResponse = await axios.post(`${BACKEND_URL}/chats/chat`, {
        messages: initialMessages.map((m) => ({
          role: m.role,
          parts: [{ text: m.content }],
        })),
      });
      const newSteps = parseXml(chatResponse.data.response);

      // This adds tasks to the "to-do list", which triggers the useEffect worker
      setSteps(newSteps.map((step) => ({ ...step, status: "pending" })));

      setLlmMessages((prev) => [
        ...prev,
        { role: "assistant", content: chatResponse.data.response },
      ]);
    } catch (err) {
      console.error("Initialization failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init(prompt);
  }, [prompt]);

  const handleSendPrompt = async () => {
    if (!userPrompt.trim()) return;
    const newMessage = { role: "user" as const, content: userPrompt.trim() };
    const updatedMessages = [...llmMessages, newMessage];
    setLlmMessages(updatedMessages);
    setUserPrompt("");
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/chats/chat`, {
        messages: updatedMessages.map((m) => ({
          role: m.role,
          parts: [{ text: m.content }],
        })),
      });
      const newSteps = parseXml(response.data.response);

      // Appends new tasks to the "to-do list", which again triggers the worker
      setSteps((prevSteps) => [
        ...prevSteps,
        ...newSteps.map((step) => ({
          ...step,
          status: "pending" as "pending",
        })),
      ]);

      setLlmMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.response },
      ]);
    } catch (error) {
      console.error("Failed to send prompt:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- YOUR UI/UX RENDER ---
  return (
    <div className="h-screen bg-white dark:bg-gray-900 flex flex-col overflow-hidden">
      <header className="h-12 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center gap-4 min-w-0">
          <h1 className="text-base font-semibold text-gray-900 dark:text-white">
            WebCraft AI
          </h1>
          <div className="text-xs text-gray-500 dark:text-gray-400 max-w-sm truncate">
            {prompt || "No prompt"}
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <AnimatePresence>
          {!isCodeExpanded && (
            <>
              <motion.div
                initial={{ width: "25%" }}
                animate={{ width: "25%" }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden flex flex-col"
              >
                <StepsPanel steps={steps} />
                <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  {loading ? (
                    <div className="text-center text-sm text-gray-500 py-2">
                      Generating...
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={userPrompt}
                        onChange={(e) => setUserPrompt(e.target.value)}
                        placeholder="Ask for changes..."
                        className="flex-1 p-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 dark:text-white"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSendPrompt();
                        }}
                      />
                      <button
                        onClick={handleSendPrompt}
                        className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Send
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ width: "15%" }}
                animate={{ width: "15%" }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <FileExplorer onFileSelect={setSelectedFile} files={files} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ width: "60%" }}
          animate={{ width: isCodeExpanded ? "100%" : "60%" }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-hidden"
        >
          <CodeEditor
            selectedFile={selectedFile}
            isExpanded={isCodeExpanded}
            onToggleExpand={() => setIsCodeExpanded(!isCodeExpanded)}
          />
        </motion.div>
      </main>

      <Terminal />
    </div>
  );
};
