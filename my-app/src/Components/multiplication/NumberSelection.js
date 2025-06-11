import React from 'react';
import { Button } from '../../ui/button';
import { ArrowRight } from 'lucide-react';

export default function NumberSelection({ onSelect, onBack }) {
  const numbers = Array.from({ length: 9 }, (_, i) => i + 2); // 2-10

  return (
    <div className="p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-lg text-center">
        <div className="flex justify-start w-full mb-8">
            <Button variant="ghost" onClick={onBack}>
              <ArrowRight className="ml-2 w-4 h-4" /> חזור
            </Button>
        </div>
        <h2 className="text-3xl font-bold mb-2">תרגול לפי מספר</h2>
        <p className="text-gray-600 mb-8">בחר איזה מספר תרצה לתרגל מלוח הכפל</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {numbers.map(num => (
            <Button
              key={num}
              onClick={() => onSelect(num)}
              className="h-24 text-4xl font-bold bg-orange-200 text-orange-800 hover:bg-orange-300"
            >
              {num}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}