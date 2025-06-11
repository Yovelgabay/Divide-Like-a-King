import React from "react";
import { motion } from "framer-motion";

export default function ProgressTracker({ currentStep, completedSteps = [] }) {
  const steps = [
    { key: "divide", name: "חילוק", emoji: "🤔", color: "blue" },
    { key: "multiply", name: "כפל", emoji: "✖️", color: "orange" },
    { key: "subtract", name: "חיסור", emoji: "➖", color: "red" },
    { key: "bring_down", name: "הורדה", emoji: "⬇️", color: "green" }
  ];

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-center mb-4">שלבי הפתרון</h3>
      <div className="flex justify-between gap-3">
        {steps.map((step) => {
          const isActive = currentStep === step.key;
          const isCompleted = completedSteps.includes(step.key);

          return (
            <motion.div
              key={step.key}
              className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                isActive
                  ? `bg-${step.color}-100 border-2 border-${step.color}-300`
                  : isCompleted
                    ? 'bg-green-100 border border-green-300'
                    : 'bg-gray-50 border border-gray-200'
              }`}
              animate={isActive ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <div className="text-2xl mb-1">{step.emoji}</div>
              <span
                className={`text-sm font-medium ${
                  isActive ? `text-${step.color}-700` : isCompleted ? 'text-green-700' : 'text-gray-600'
                }`}
              >
                {step.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}