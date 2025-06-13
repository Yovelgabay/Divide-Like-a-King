import React from "react";
import {motion} from "framer-motion";

const colorMap = {
  blue: {
    bg: "bg-blue-100",
    border: "border-blue-300",
    text: "text-blue-700",
  },
  orange: {
    bg: "bg-orange-100",
    border: "border-orange-300",
    text: "text-orange-700",
  },
  red: {
    bg: "bg-red-100",
    border: "border-red-300",
    text: "text-red-700",
  },
  green: {
    bg: "bg-green-100",
    border: "border-green-300",
    text: "text-green-700",
  },
};

export default function ProgressTracker({currentStep, completedSteps = []}) {
  const steps = [
    {key: "divide", name: "חילוק", emoji: "🤔", color: "blue"},
    {key: "multiply", name: "כפל", emoji: "✖️", color: "orange"},
    {key: "subtract", name: "חיסור", emoji: "➖", color: "red"},
    {key: "bring_down", name: "הורדה", emoji: "⬇️", color: "green"},
  ];

  return (
    <>
      {/* --- דסקטופ: תצוגה מלאה --- */}
      <div className="w-full bg-white rounded-2xl shadow-lg px-6 py-4 border border-gray-200 hidden md:block">
        <h3 className="text-lg font-bold text-center mb-4">{"שלבי הפתרון"}</h3>
        <div className="flex flex-col md:flex-row justify-between gap-3">
          {steps.map((step) => {
            const isActive = currentStep === step.key;
            const isCompleted = completedSteps.includes(step.key);

            return (
              <motion.div
                key={step.key}
                className={`flex items-center py-1 px-8 rounded-lg transition-all
                  ${
                    isActive
                      ? `${colorMap[step.color].bg} border-2 ${
                          colorMap[step.color].border
                        }`
                      : isCompleted
                      ? "bg-green-100 border border-green-300"
                      : "bg-gray-50 border border-gray-200"
                  }`}
                animate={isActive ? {scale: [1, 1.05, 1]} : {}}
                transition={{duration: 1, repeat: Infinity}}
              >
                <div className="text-xl mb-1">{step.emoji}</div>
                <span
                  className={`text-sm font-medium ${
                    isActive
                      ? colorMap[step.color].text
                      : isCompleted
                      ? "text-green-700"
                      : "text-gray-600"
                  }`}
                >
                  {step.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* --- מובייל: sticky, כותרת ואימוג'ים קומפקטיים עם תוויות --- */}
      <div className="w-full sticky top-0 z-20 bg-white bg-opacity-95 border-b px-2 py-1 flex flex-col items-center md:hidden">
        <span className="text-sm font-bold mb-1">{"שלבי הפתרון"}</span>
        <div className="flex flex-row justify-center gap-2 w-full">
          {steps.map((step) => {
            const isActive = currentStep === step.key;
            const isCompleted = completedSteps.includes(step.key);

            return (
              <motion.div
                key={step.key}
                className={`flex flex-col items-center justify-center rounded-lg w-12 h-12
            transition-all
            ${
              isActive
                ? `${colorMap[step.color].bg} border-2 ${
                    colorMap[step.color].border
                  } ${colorMap[step.color].text}`
                : isCompleted
                ? "bg-green-100 border border-green-300 text-green-700"
                : "bg-gray-50 border border-gray-200 text-gray-600"
            }`}
                animate={isActive ? {scale: [1, 1.12, 1]} : {}}
                transition={{duration: 0.9, repeat: Infinity}}
                title={step.name}
              >
                <span className="text-lg leading-none">{step.emoji}</span>
                <span className="text-xs mt-1">{step.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}
