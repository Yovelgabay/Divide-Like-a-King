import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Crown, Calculator } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const isMultiplicationPage = location.pathname.includes("/MultiplicationKing");

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 shadow-sm md:sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">{isMultiplicationPage ? '👑' : '🧮'}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {isMultiplicationPage ? 'מלך לוח הכפל' : 'מלך החילוק הארוך'}
              </h1>
              <p className="text-sm text-gray-500">
                {isMultiplicationPage ? 'למד כפולות בקלות ובכיף!' : 'למד חילוק ארוך בקלות ובכיף!'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isMultiplicationPage ? (
              <Link to="/">
                <button className="justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 h-10 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold shadow-lg flex items-center gap-2 transform hover:scale-105 transition-all duration-300 rounded-xl px-6 py-3">
                  <Calculator className="w-5 h-5" />
                  מלך החילוק הארוך
                </button>
              </Link>
            ) : (
              <Link to="/MultiplicationKing">
                <button className="justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 h-10 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold shadow-lg flex items-center gap-2 transform hover:scale-105 transition-all duration-300 rounded-xl px-6 py-3 relative overflow-hidden">
                  <Crown className="w-5 h-5" />
                  מלך לוח הכפל
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-orange-400 rounded-xl opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
