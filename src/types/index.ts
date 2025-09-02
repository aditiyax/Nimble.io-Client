export enum StepType {
  CreateFile,
  CreateFolder,
  EditFile,
  DeleteFile,
  RunScript,
}

export interface Step {
  id: number;
  title: string;
  description: string;
  type: StepType;
  // A comprehensive status list for your UI
  status: "pending" | "in-progress" | "completed" | "running" | "error";
  code?: string;
  path?: string;
}

export interface FileItem {
  name: string;
  type: "file" | "folder";
  path: string; // Path is required
  children?: FileItem[];
  content?: string;
}
