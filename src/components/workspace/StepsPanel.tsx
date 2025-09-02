import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Circle, RotateCw, Clock } from "lucide-react";
import { Step } from "../../types";

interface StepsPanelProps {
  steps: Step[];
}

export const StepsPanel: React.FC<StepsPanelProps> = ({ steps }) => {
  const getStepIcon = (status: Step["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "running": // Now valid because of the type update
      case "in-progress": // You can treat 'running' and 'in-progress' the same
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <RotateCw className="w-5 h-5 text-blue-500" />
          </motion.div>
        );
      case "error": // Now valid
        return <Circle className="w-5 h-5 text-red-500" />;
      default: // This will catch 'pending'
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStepColor = (status: Step["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-700 dark:text-green-400";
      case "running":
      case "in-progress":
        return "text-blue-700 dark:text-blue-400";
      case "error":
        return "text-red-700 dark:text-red-400";
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Build Steps
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3" />
            <span>...</span>
          </div>
        </div>
      </div>

      {/* Steps List */}
      <div className="p-3 space-y-2 overflow-y-auto flex-1">
        {steps.map((step, index) => (
          <motion.div
            key={step.id || index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex items-start gap-2 p-2.5 rounded-lg border transition-colors ${
              step.status === "running" || step.status === "in-progress"
                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                : step.status === "completed"
                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getStepIcon(step.status)}
            </div>
            <div className="flex-1 min-w-0">
              <h4
                className={`font-medium text-xs ${getStepColor(step.status)}`}
              >
                {step.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">
                {step.description}
              </p>
            </div>
            {(step.status === "running" || step.status === "in-progress") && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-shrink-0"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
