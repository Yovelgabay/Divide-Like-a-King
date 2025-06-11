import React from "react";
import {Link, useLocation} from "react-router-dom";
import {createPageUrl} from "./utils";
import {Button} from "./ui/button";
import {Calculator, Crown} from "lucide-react";

export default function Layout({children, currentPageName}) {
  const location = useLocation();
  const isMultiplicationPage = location.pathname.includes(
    createPageUrl("MultiplicationKing")
  );

  const renderHeaderButton = () => {
    if (isMultiplicationPage) {
      return (
        <Link to={createPageUrl("Home")}>
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold shadow-lg flex items-center gap-2 transform hover:scale-105 transition-all duration-300 rounded-xl px-6 py-3">
            <Calculator className="w-5 h-5" />
            מלך החילוק הארוך
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
          </Button>
        </Link>
      );
    }
    return (
      <Link to={createPageUrl("MultiplicationKing")}>
        <Button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold shadow-lg flex items-center gap-2 transform hover:scale-105 transition-all duration-300 rounded-xl px-6 py-3 relative overflow-hidden">
          <Crown className="w-5 h-5" />
          מלך לוח הכפל
          <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-orange-400 rounded-xl opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
        </Button>
      </Link>
    );
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap');
        
        :root {
          --cell-size: 35px; /* Updated from 40px to 35px for consistency */
          --primary-blue: #4F46E5;
          --primary-green: #10B981;
          --primary-yellow: #F59E0B;
          --primary-purple: #8B5CF6;
        }
        
        * {
          font-family: 'Rubik', sans-serif;
        }
        
        .division-grid-container {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .cell {
          width: 35px; /* Changed from var(--cell-size) to 35px */
          height: 35px; /* Changed from var(--cell-size) to 35px */
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .cell.empty {
          visibility: hidden;
        }
        
        .cell.divisor {
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
          /* Removed border-left: 3px solid #374151 !important; */
          font-weight: bold;
          color: #1f2937;
        }
        
        .cell.quotient {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          /* Removed border-bottom: 3px solid #374151 !important; */
          font-weight: bold;
          color: #92400e;
        }
        
        .cell.dividend {
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          font-weight: bold;
          color: #1e40af;
        }
        
        .cell.multiply-result {
          background: linear-gradient(135deg, #fed7d7, #fbb6ce);
          font-weight: bold;
          color: #be185d;
          border-bottom: 2px solid #374151;
        }
        
        .cell.remainder {
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          font-weight: bold;
          color: #065f46;
        }
        
        .cell.bring-down {
          background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
          font-weight: bold;
          color: #3730a3;
        }

        .cell.minus-sign {
          background: transparent;
          font-weight: bold;
          color: #dc2626;
        }
        
        .cell.subtract-line {
          background: transparent !important;
          border-bottom: 2px solid #374151 !important;
          height: 8px !important; /* Changed from 10px to 8px */
          align-items: flex-end;
        }
        
        .cell.highlight {
          background: linear-gradient(135deg, #fbbf24, #f59e0b) !important;
          animation: pulse 1s infinite;
          transform: scale(1.05);
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-bounce-gentle {
          animation: bounceGentle 2s infinite;
        }
        
        @keyframes bounceGentle {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0,-8px,0);
          }
          70% {
            transform: translate3d(0,-4px,0);
          }
          90% {
            transform: translate3d(0,-2px,0);
          }
        }
        
        .star-sparkle {
          animation: sparkle 1.5s ease-in-out infinite;
        }
        
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
        }
        
        .step-highlight {
          animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
          from { box-shadow: 0 0 20px rgba(79, 70, 229, 0.4); }
          to { box-shadow: 0 0 30px rgba(79, 70, 229, 0.8); }
        }
      `}</style>

      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">
                  {isMultiplicationPage ? "👑" : "🧮"}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {isMultiplicationPage ? "מלך לוח הכפל" : "מלך החילוק הארוך"}
                </h1>
                <p className="text-sm text-gray-500">
                  {isMultiplicationPage
                    ? "למד כפולות בקלות ובכיף!"
                    : "למד חילוק ארוך בקלות ובכיף!"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {renderHeaderButton()}
            </div>
          </div>
        </div>
      </header>

      <main className="relative">{children}</main>

      <footer className="bg-white/60 backdrop-blur-sm border-t border-purple-100 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="text-2xl">🎓</span>
              <span className="text-lg font-semibold text-gray-700">
                {isMultiplicationPage
                  ? "מלך לוח הכפל - למידה בכיף!"
                  : "מלך החילוק הארוך - למידה בכיף!"}
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              {isMultiplicationPage
                ? "משחק חינוכי לתרגול לוח הכפל"
                : "משחק חינוכי ללימוד חילוק ארוך"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
