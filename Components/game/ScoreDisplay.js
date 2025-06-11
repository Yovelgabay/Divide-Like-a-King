import React from "react";
import { motion } from "framer-motion";
import { Star, Trophy, Target } from "lucide-react";

export default function ScoreDisplay({ score, stars, problemsSolved }) {
  return (
    <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-3xl shadow-xl p-6 border border-yellow-200">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">הציון שלך</h3>
        <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          className="text-center p-4 bg-white/70 rounded-2xl border border-yellow-100"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex justify-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < stars 
                    ? 'text-yellow-400 fill-yellow-400 star-sparkle' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm font-medium text-gray-600">כוכבים</p>
          <p className="text-2xl font-bold text-yellow-600">{stars}/5</p>
        </motion.div>
        
        <motion.div 
          className="text-center p-4 bg-white/70 rounded-2xl border border-green-100"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex justify-center mb-2">
            <Trophy className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-sm font-medium text-gray-600">תרגילים פתורים</p>
          <p className="text-2xl font-bold text-green-600">{problemsSolved}</p>
        </motion.div>
        
        <motion.div 
          className="text-center p-4 bg-white/70 rounded-2xl border border-purple-100"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex justify-center mb-2">
            <Target className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-sm font-medium text-gray-600">ניקוד</p>
          <p className="text-2xl font-bold text-purple-600">{score}</p>
        </motion.div>
      </div>
    </div>
  );
}