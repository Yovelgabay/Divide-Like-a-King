import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Circle, Clock } from "lucide-react";

export default function ProgressTracker({ currentStepType }) {
    const stepNames = {
        divide: "חילוק",
        multiply: "כפל",
        subtract: "חיסור",
        bring_down: "הורדה"
    };

    const stepsOrder = ["divide", "multiply", "subtract", "bring_down"];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border border-purple-100">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">שלבי הפתרון</h3>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto"></div>
      </div>
      
      <div className="space-y-4">
        {stepsOrder.map((stepType) => {
          const isCurrent = stepType === currentStepType;
          
          return (
            <motion.div
              key={stepType}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                isCurrent 
                  ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300 step-highlight' 
                  : 'bg-gray-50 border border-gray-200 opacity-60'
              }`}
              animate={isCurrent ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex-shrink-0">
                {isCurrent ? (
                  <Clock className="w-8 h-8 text-blue-500 animate-pulse" />
                ) : (
                  <Circle className="w-8 h-8 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1">
                <h4 className={`font-semibold text-lg ${
                  isCurrent ? 'text-blue-700' : 'text-gray-500'
                }`}>
                  {stepNames[stepType]}
                </h4>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}