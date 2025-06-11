import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Rows } from 'lucide-react';
import PracticeMode from '../components/multiplication/PracticeMode';
import NumberSelection from '../components/multiplication/NumberSelection';

export default function MultiplicationKing() {
  const [mode, setMode] = useState(null); // 'fast', 'byNumber', or 'practice'
  const [selectedNumber, setSelectedNumber] = useState(null);

  const handleModeSelect = (selectedMode) => {
    if (selectedMode === 'byNumber') {
      setMode('byNumber');
    } else {
      setMode('practice');
      setSelectedNumber(null); // For fast practice, selectedNumber is null
    }
  };

  const handleNumberSelect = (number) => {
    setSelectedNumber(number);
    setMode('practice');
  };

  const resetSelection = () => {
    setMode(null);
    setSelectedNumber(null);
  };

  if (mode === 'practice') {
    return <PracticeMode selectedNumber={selectedNumber} onBack={resetSelection} />;
  }
  
  if (mode === 'byNumber') {
    return <NumberSelection onSelect={handleNumberSelect} onBack={resetSelection} />;
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-4">
          מלך לוח הכפל
        </h1>
        <p className="text-gray-600 text-lg mb-12">בחר את התרגול שלך</p>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="hover:shadow-xl hover:border-amber-400 transition-all cursor-pointer" onClick={() => handleModeSelect('fast')}>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-amber-500" />
                </div>
              </div>
              <CardTitle className="text-2xl">תרגול כפולות מהיר</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-6">תרגול אקראי של כל לוח הכפל. כמה תרגילים תצליח לפתור בדקה?</p>
              <Button className="bg-amber-500 hover:bg-amber-600 w-full">התחל תרגול מהיר</Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-xl hover:border-orange-400 transition-all cursor-pointer" onClick={() => handleModeSelect('byNumber')}>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Rows className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              <CardTitle className="text-2xl">תרגול לפי מספר</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-6">בחר מספר ותרגל את הכפולות שלו לפי הסדר, מ-1 עד 10.</p>
              <Button className="bg-orange-500 hover:bg-orange-600 w-full">בחר מספר</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}