
import React from "react";
import { motion } from "framer-motion";

export default function DivisionGrid({ 
  dividend, 
  divisor, 
  quotientDigits = [], 
  workingSteps = []
}) {
  const dividendStr = dividend.toString();
  const divisorStr = divisor.toString();
  const gridCols = dividendStr.length + divisorStr.length;
  const gridRows = (dividendStr.length * 2) + 2;

  const minusSigns = []; 

  const createGridData = () => {
    const grid = Array(gridRows).fill(null).map(() => Array(gridCols).fill(null));
    
    // Row 0: Quotient
    quotientDigits.forEach((digit, index) => {
      grid[0][index] = { value: digit, type: 'quotient', animate: true };
    });
    
    // Row 1: Dividend
    dividendStr.split("").forEach((digit, index) => {
      grid[1][index] = { value: digit, type: 'dividend', animate: false };
    });
    
    // Divisor immediately after dividend
    divisorStr.split("").forEach((digit, index) => {
        grid[1][dividendStr.length + index] = { value: digit, type: 'divisor', animate: false };
    });
    
    let currentRow = 2;
    
    workingSteps.forEach((step) => {
      if (step.type === 'multiply_result' && currentRow < gridRows) {
        const resultStr = step.value.toString();
        const startCol = step.position - resultStr.length + 1;
        
        resultStr.split("").forEach((digit, digitIndex) => {
          if (startCol + digitIndex < gridCols) {
            grid[currentRow][startCol + digitIndex] = { value: digit, type: 'multiply-result', animate: true };
          }
        });
        
        minusSigns.push({ row: currentRow, col: startCol });
        currentRow++;
        
      } else if (step.type === 'remainder' && currentRow < gridRows) {
        const remainderStr = step.value.toString();
        const startCol = step.position - remainderStr.length + 1;
        
        remainderStr.split("").forEach((digit, digitIndex) => {
          if (startCol + digitIndex < gridCols) {
            grid[currentRow][startCol + digitIndex] = { value: digit, type: 'remainder', animate: true };
          }
        });
        // Don't increment currentRow here - need to find where remainder ends for bring_down
        
      } else if (step.type === 'bring_down' && currentRow < gridRows) {
        // Find the rightmost digit of the remainder in the current row
        let lastRemainderCol = -1;
        for (let c = gridCols - 1; c >= 0; c--) {
          if (grid[currentRow][c] && grid[currentRow][c].type === 'remainder') {
            lastRemainderCol = c;
            break;
          }
        }
        
        // Place the brought down digit to the right of where the remainder ended
        const bringDownCol = lastRemainderCol !== -1 ? lastRemainderCol + 1 : step.position;

        if (bringDownCol < gridCols) {
          grid[currentRow][bringDownCol] = { value: step.nextDigit, type: 'bring-down', animate: true };
        }
        
        // NOW increment currentRow after bring_down is placed
        currentRow++;
      }
    });
    
    return grid;
  };
  
  const gridData = createGridData();
  
  const getCellClass = (cellData) => {
    if (!cellData) return "cell empty";
    return `cell ${cellData.type || ""}`;
  };
  
  const getCellStyle = (rowIndex, colIndex, cellData) => {
    const style = {
      gridColumn: `${colIndex + 1} / span 1`,
      gridRow: `${rowIndex + 1} / span 1`
    };
    
    if (cellData?.type === 'dividend') {
      style.borderTop = '3px solid #374151';
    }
    
    if (cellData?.type === 'multiply-result') {
      style.borderBottom = '2px solid #374151';
    }
    
    return style;
  };

  return (
    <div className="flex justify-center mb-4">
      <div 
        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200 relative"
        style={{ direction: 'ltr' }}
      >
        <div className="relative">
          {minusSigns.map((sign, index) => (
            <motion.div
              key={`minus-${index}`}
              className="absolute text-red-600 font-bold text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: sign.row * 0.3 }}
              style={{
                top: `calc(${sign.row * 35}px + 5px)`,
                left: `calc(${(sign.col) * 35}px - 15px)`,
                zIndex: 10
              }}
            >
              −
            </motion.div>
          ))}
          
          <div 
            className="division-grid-container"
            style={{ 
              display: 'grid',
              gridTemplateColumns: `repeat(${gridCols}, 35px)`,
              gridTemplateRows: `repeat(${gridRows}, 35px)`,
              gap: '1px',
              justifyContent: 'center',
              fontFamily: 'Courier New, monospace',
              fontSize: '1.1rem',
              fontWeight: 'bold',
            }}
          >
            {gridData.map((row, rowIndex) =>
              row.map((cellData, colIndex) => (
                <motion.div
                  key={`${rowIndex}-${colIndex}`}
                  className={getCellClass(cellData)}
                  style={getCellStyle(rowIndex, colIndex, cellData)}
                  initial={cellData?.animate ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: cellData?.animate ? (rowIndex + colIndex) * 0.1 : 0,
                    duration: 0.3 
                  }}
                >
                  {cellData?.value}
                </motion.div>
              ))
            )}
            {/* Division Bar */}
            <div className="absolute top-0 left-0 h-full w-full pointer-events-none">
                 <div
                    className="border-r-2 border-black"
                    style={{
                        position: 'absolute',
                        left: `${dividendStr.length * 35}px`,
                        top: '35px',
                        height: '35px'
                    }}
                 ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
