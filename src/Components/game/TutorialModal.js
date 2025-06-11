import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../ui/button";
import { X } from "lucide-react";

export default function TutorialModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">איך משחקים?</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🧮</div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    בואו נלמד יחד את סודות החילוק הארוך! זה קל וכיף!
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                    <div className="text-3xl mb-3">🤔</div>
                    <h3 className="text-xl font-bold text-blue-700 mb-2">שלב 1: חלוקה</h3>
                    <p className="text-blue-600">
                      בודקים כמה פעמים המחלק נכנס לתוך המספר או החלק שלו משמאל
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                    <div className="text-3xl mb-3">✖️</div>
                    <h3 className="text-xl font-bold text-green-700 mb-2">שלב 2: כפל</h3>
                    <p className="text-green-600">
                      כופלים את המחלק במספר שמצאנו בשלב החלוקה
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
                    <div className="text-3xl mb-3">➖</div>
                    <h3 className="text-xl font-bold text-orange-700 mb-2">שלב 3: חיסור</h3>
                    <p className="text-orange-600">
                      מחסרים את התוצאה מהמספר המקורי או מהחלק הנוכחי
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                    <div className="text-3xl mb-3">⬇️</div>
                    <h3 className="text-xl font-bold text-purple-700 mb-2">שלב 4: הורדה</h3>
                    <p className="text-purple-600">
                      מורידים את הספרה הבאה במספר המחולק וממשיכים בתהליך
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 border border-yellow-200">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🌟</div>
                    <h3 className="text-xl font-bold text-yellow-700 mb-2">איך זוכים בכוכבים?</h3>
                    <ul className="text-yellow-700 space-y-2">
                      <li>✅ תשובה נכונה בניסיון הראשון = 2 נקודות</li>
                      <li>⭐ השלמת תרגיל מלא = כוכב זהב!</li>
                      <li>🔥 רצף תשובות נכונות = בונוס מיוחד!</li>
                    </ul>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button
                    onClick={onClose}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-2xl text-lg font-semibold shadow-lg"
                  >
                    בואו נתחיל לשחק! 🚀
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}