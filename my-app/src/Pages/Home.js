import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";

import DivisionGrid from "../Components/division/DivisionGrid";
import StepController from "../Components/division/StepController";
import ProgressTracker from "../Components/division/ProgressTracker";

export default function Home() {
  const [currentProblem, setCurrentProblem] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [quotientDigits, setQuotientDigits] = useState([]);
  const [workingSteps, setWorkingSteps] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [score, setScore] = useState(0);
  const [finalQuotient, setFinalQuotient] = useState("");
  const [finalRemainder, setFinalRemainder] = useState("");

  useEffect(() => {
    generateNewProblem();
  }, []);

  const generateNewProblem = () => {
    // Generate problems with 3-4 digits for 4th graders
    const divisor = Math.floor(Math.random() * 8) + 2; // 2-9
    let dividend;
    do {
        const quotient = Math.floor(Math.random() * 900) + 100; // 100-999 to ensure larger dividends
        dividend = divisor * quotient + Math.floor(Math.random() * divisor); // Allow remainder
    } while (dividend < 100 || dividend > 9999); // 3-4 digit dividend

    const steps = generateDivisionSteps(dividend, divisor);
    
    const newProblem = {
      dividend,
      divisor,
      steps
    };
    
    setCurrentProblem(newProblem);
    setCurrentStepIndex(0);
    setQuotientDigits([]);
    setWorkingSteps([]);
    setShowFeedback(false);
    setCompletedSteps([]);
    setFinalQuotient("");
    setFinalRemainder("");
  };

  const generateDivisionSteps = (dividend, divisor) => {
    const steps = [];
    const dividendStr = dividend.toString();
    let workingNumberStr = "";

    for (let i = 0; i < dividendStr.length; i++) {
        workingNumberStr += dividendStr[i];
        let workingNumber = parseInt(workingNumberStr);
        
        const quotientDigit = Math.floor(workingNumber / divisor);
        const multiplyResult = quotientDigit * divisor;
        const remainder = workingNumber - multiplyResult;

        steps.push({
          type: "divide",
          workingNumber: workingNumber,
          divisor: divisor,
          answer: quotientDigit.toString(),
          position: i 
        });
        
        steps.push({
          type: "multiply",
          quotientDigit: quotientDigit,
          divisor: divisor,
          answer: multiplyResult.toString(),
          position: i
        });
        
        steps.push({
          type: "subtract",
          workingNumber: workingNumber,
          multiplyResult: multiplyResult,
          answer: remainder.toString(),
          position: i 
        });
        
        workingNumberStr = remainder.toString();
        if (workingNumberStr === "0" && i < dividendStr.length -1) {
            workingNumberStr = "";
        }
        
        if (i < dividendStr.length - 1) {
           steps.push({
             type: "bring_down",
             nextDigit: dividendStr[i + 1],
             answer: dividendStr[i + 1],
             position: i + 1
           });
        }
    }
    
    return steps.filter(step => step.type !== 'bring_down' || step.answer !== undefined);
  };

  const handleStepSubmit = (answer) => {
    if (!currentProblem || currentStepIndex >= currentProblem.steps.length) return;
    
    const currentStep = currentProblem.steps[currentStepIndex];
    const isAnswerCorrect = answer === currentStep.answer;
    
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
    
    if (isAnswerCorrect) {
      setScore(prev => prev + 10);
      
      let newCompletedSteps = [...completedSteps, currentStep.type];
      if (currentStep.type === 'bring_down') {
        // Reset for the next cycle
        newCompletedSteps = [];
      }
      setCompletedSteps(newCompletedSteps);
      
      let newWorkingSteps = [...workingSteps];
      let newQuotientDigits = [...quotientDigits];

      if (currentStep.type === 'divide') {
        newQuotientDigits.push(currentStep.answer);
        setQuotientDigits(newQuotientDigits);
      } else if (currentStep.type === 'multiply') {
        newWorkingSteps.push({
          type: 'multiply_result',
          value: currentStep.answer,
          position: currentStep.position 
        });
      } else if (currentStep.type === 'subtract') {
         newWorkingSteps.push({
          type: 'remainder',
          value: currentStep.answer,
          position: currentStep.position 
        });
      } else if (currentStep.type === 'bring_down') {
        newWorkingSteps.push({
          type: 'bring_down',
          nextDigit: currentStep.nextDigit,
          position: currentStep.position
        });
      }
      setWorkingSteps(newWorkingSteps);
      
      setTimeout(() => {
        if (currentStepIndex + 1 >= currentProblem.steps.length) {
          handleProblemCompleted();
          setCurrentStepIndex(currentStepIndex + 1);
        } else {
          setCurrentStepIndex(currentStepIndex + 1);
          setShowFeedback(false);
        }
      }, 1500);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
      }, 2500);
    }
  };

  const handleProblemCompleted = () => {
    setScore(prev => prev + 50); // Bonus for completing problem
    const quotient = Math.floor(currentProblem.dividend / currentProblem.divisor);
    const remainder = currentProblem.dividend % currentProblem.divisor;
    setFinalQuotient(quotient.toString());
    setFinalRemainder(remainder.toString());
  };

  if (!currentProblem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce-gentle">🧮</div>
          <p className="text-xl text-gray-600">טוען משחק...</p>
        </div>
      </div>
    );
  }

  const currentStep = currentProblem.steps[currentStepIndex];

  return (
    <div dir="rtl" className="h-screen flex flex-col p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col flex-grow">
        {/* Score and new problem button */}
        <div className="flex justify-end items-center mb-4 gap-3">
          <div className="bg-white rounded-2xl px-4 py-2 shadow-lg border border-purple-100">
            <span className="text-purple-600 font-bold">ניקוד: {score}</span>
          </div>
          <Button
            onClick={generateNewProblem}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            תרגיל חדש
          </Button>
        </div>

        {/* Display Current Problem */}
        <div className="text-center mb-4">
          <h2 dir="ltr" className="text-3xl md:text-4xl font-mono text-gray-700 bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-gray-200 inline-block">
            {currentProblem.dividend} : {currentProblem.divisor}
          </h2>
        </div>

        {/* Game Content */}
        <div className="flex flex-col lg:flex-row gap-8 flex-grow overflow-hidden">
          {/* Division grid */}
          <div className="lg:w-1/2 flex flex-col gap-8 h-full overflow-auto">
            {currentProblem && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-purple-100 flex-grow">
                <DivisionGrid
                  dividend={currentProblem.dividend}
                  divisor={currentProblem.divisor}
                  quotientDigits={quotientDigits}
                  workingSteps={workingSteps}
                />
              </div>
            )}
          </div>

          {/* Step controller */}
          <div className="lg:w-1/3 flex flex-col items-start justify-start gap-8 overflow-auto">
            {currentStep && currentStepIndex < currentProblem?.steps?.length && (
              <StepController
                currentStep={currentStep.type}
                stepData={currentStep}
                onSubmitAnswer={handleStepSubmit}
                showFeedback={showFeedback}
                isCorrect={isCorrect}
                correctAnswer={currentStep.answer}
              />
            )}

            {currentProblem && currentStepIndex >= currentProblem.steps.length && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center p-8 bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl border border-green-200"
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                >
                  🎉
                </motion.div>
                <h3 className="text-3xl font-bold text-green-700 mb-2">כל הכבוד! 🌟</h3>
                <p className="text-green-600 text-xl mb-4">סיימת את התרגיל בהצלחה רבה!</p>

                <div dir="ltr" className="text-2xl font-mono text-green-800 bg-green-200/50 p-3 rounded-lg inline-block mb-6">
                  {currentProblem.dividend} : {currentProblem.divisor} = {finalQuotient}
                  {finalRemainder > 0 && ` (שארית ${finalRemainder})`}
                </div>

                <div className="flex justify-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-2xl"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>
                <p className="text-green-500 text-lg font-semibold mb-6">הניקוד שלך: {score} נקודות</p>
                <Button
                  onClick={generateNewProblem}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-2xl text-lg font-semibold shadow-lg"
                >
                  לעוד תרגיל! 🚀
                </Button>
              </motion.div>
            )}
          </div>

          {/* Progress tracker */}
          <div className="lg:w-1/6 overflow-auto">
            {currentStep && (
              <ProgressTracker
                currentStep={currentStep.type}
                completedSteps={completedSteps}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}