import React from "react";
import { motion } from "framer-motion";

export default function DivisionDisplay({ 
  dividend, 
  divisor, 
  quotient = "",
  workingSteps = []
}) {
  const dividendStr = dividend.toString();
  const maxChars = dividendStr.length;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-purple-100">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">תרגיל החילוק שלנו</h3>
        <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mx-auto"></div>
      </div>
      
      <div className="flex justify-center mb-4">
        <div dir="ltr" className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-dashed border-blue-200 font-mono text-3xl" style={{ fontFamily: 'Courier New, monospace' }}>
          
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${maxChars + 3}, 1ch)`, gridAutoRows: 'auto' }}>
            
            {/* Quotient */}
            <div 
              className="text-left tracking-[1em]" 
              style={{
                gridColumn: `1 / span ${maxChars}`,
                gridRow: 1
              }}
            >
              {quotient}
            </div>

            {/* Top line under quotient */}
            <div 
              className="border-b-2 border-black" 
              style={{
                gridColumn: `1 / span ${maxChars}`,
                gridRow: 2
              }}
            ></div>

            {/* Dividend */}
            <div 
              className="tracking-[1em]" 
              style={{
                gridColumn: `1 / span ${maxChars}`,
                gridRow: 3
              }}
            >
              {dividend}
            </div>
            
            {/* Vertical line */}
            <div 
              className="border-l-2 border-black h-16" 
              style={{
                gridColumn: maxChars + 1,
                gridRow: '2 / span 2'
              }}
            ></div>
            
            {/* Divisor - positioned to the right of the dividend */}
            <div 
              className="text-left pl-2" 
              style={{
                gridColumn: maxChars + 2,
                gridRow: 3
              }}
            >
              {divisor}
            </div>

            {/* Working Steps */}
            {workingSteps.map((step, index) => (
              <React.Fragment key={index}>
                {step.type === 'multiply_result' && (
                   <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-left tracking-[1em]"
                    style={{
                      gridRow: 4 + index,
                      gridColumn: `${step.indent + 1} / span ${step.value.length}`,
                    }}
                  >
                   -{step.value}
                  </motion.div>
                )}
                {step.type === 'subtraction_line' && (
                  <div
                    className="border-b-2 border-black"
                    style={{
                      gridRow: 4 + index,
                      gridColumn: `${step.indent + 1} / span ${step.width}`,
                    }}
                  ></div>
                )}
                {step.type === 'remainder_and_bring_down' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-left tracking-[1em]"
                    style={{
                      gridRow: 4 + index,
                      gridColumn: `${step.indent + 1} / span ${step.value.length}`,
                    }}
                  >
                    {step.value}
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}