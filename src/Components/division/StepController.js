import React, {useState, useRef, useEffect} from "react";
import {motion} from "framer-motion";
import {Button} from "../../ui/button";
import {Input} from "../../ui/input";
import {CheckCircle, XCircle, Lightbulb} from "lucide-react";

const stepInstructions = {
  divide: {
    title: "שלב החילוק",
    emoji: "🤔",
    color: "blue",
    getQuestion: (data) =>
      `כמה פעמים ${data.divisor} נכנס ב-${data.workingNumber}?`,
    getHint: (data) =>
      `חפש את המספר הגדול ביותר שכאשר תכפיל אותו ב-${data.divisor} תקבל ${data.workingNumber} או פחות`,
  },
  multiply: {
    title: "שלב הכפל",
    emoji: "✖️",
    color: "orange",
    getQuestion: (data) =>
      `מה התוצאה של ${data.quotientDigit} × ${data.divisor}?`,
    getHint: (data) => `כפל את ${data.quotientDigit} ב-${data.divisor}`,
  },
  subtract: {
    title: "שלב החיסור",
    emoji: "➖",
    color: "red",
    getQuestion: (data) =>
      `מה התוצאה של <span dir="ltr" class="font-mono text-xl bg-gray-100 p-2 rounded-lg inline-block">${data.workingNumber} - ${data.multiplyResult}</span>?`,
    getHint: (data) => `חסר ${data.multiplyResult} מ-${data.workingNumber}`,
  },
  bring_down: {
    title: "שלב ההורדה",
    emoji: "⬇️",
    color: "green",
    getQuestion: (data) => "איזו ספרה נוריד עכשיו?",
    getHint: (data) => "קח את הספרה הבאה מהמספר המקורי",
  },
};

export default function StepController({
  currentStep,
  stepData,
  onSubmitAnswer,
  showFeedback,
  isCorrect,
  correctAnswer,
  onCorrectAnswerScrollTo,
}) {
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef(null);

  const stepInfo = stepInstructions[currentStep];
  useEffect(() => {
    if (isCorrect && showFeedback && onCorrectAnswerScrollTo) {
      // בדיקת מובייל בלבד
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        setTimeout(() => {
          onCorrectAnswerScrollTo();
        }, 1200);
      }
    }
  }, [isCorrect, showFeedback]);

  useEffect(() => {
    setAnswer("");
    setShowHint(false);
    if (inputRef.current && !showFeedback) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [stepData, showFeedback]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmitAnswer(answer.trim());
    }
  };

  if (!stepInfo || !stepData) return null;

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      className="bg-white rounded-2xl shadow-xl p-4 md:p-8 border border-gray-200 w-full max-w-sm mx-auto lg:w-96"
    >
      <div className="text-center md:mb-6 flex md:flex-col justify-center">
        <div className="text-3xl md:text-4xl md:mb-3">{stepInfo.emoji}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {stepInfo.title}
        </h3>
        <div
          className={`w-16 h-1 bg-${stepInfo.color}-400 rounded-full mx-auto hidden md:block`}
        ></div>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <p
            className="text-lg text-gray-700 mb-4"
            dangerouslySetInnerHTML={{__html: stepInfo.getQuestion(stepData)}}
          />

          {showHint && (
            <motion.div
              initial={{opacity: 0, height: 0}}
              animate={{opacity: 1, height: "auto"}}
              className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4"
            >
              <div className="flex items-center gap-2 text-yellow-700">
                <Lightbulb className="w-4 h-4" />
                <span className="text-sm font-medium">רמז:</span>
              </div>
              <p className="text-sm text-yellow-600 mt-1">
                {stepInfo.getHint(stepData)}
              </p>
            </motion.div>
          )}
        </div>

        {!showFeedback && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 max-w-sm mx-auto"
          >
            <Input
              ref={inputRef}
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="תשובה..."
              dir="rtl"
              className="text-center md:text-lg font-semibold border-2 focus:border-blue-400"
              autoFocus
            />
            <div className="flex flex-row w-full gap-2 justify-center md:flex-col">
              <Button
                type="submit"
                disabled={!answer.trim()}
                className={`bg-${stepInfo.color}-500 hover:bg-${stepInfo.color}-600 text-white px-6 flex-1 basis-4/6 md:basis-auto md:w-full`}
                style={{minWidth: 0}}
              >
                בדוק
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowHint(!showHint)}
                className="px-3 flex-1 basis-2/6 md:basis-auto md:w-full"
                style={{minWidth: 0}}
              >
                <Lightbulb className="w-4 h-4 mx-auto" />
              </Button>
            </div>
          </form>
        )}

        {showFeedback && (
          <motion.div
            initial={{scale: 0.9, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            className={`text-center p-4 rounded-lg ${
              isCorrect
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600" />
              )}
              <span
                className={`font-bold ${
                  isCorrect ? "text-green-700" : "text-red-700"
                }`}
              >
                {isCorrect ? "נכון מאוד! 🌟" : "לא נכון"}
              </span>
            </div>

            {!isCorrect && (
              <p className="text-red-600">
                התשובה הנכונה:{" "}
                <span className="font-bold">{correctAnswer}</span>
              </p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
