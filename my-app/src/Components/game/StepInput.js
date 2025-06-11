import React, {useState, useEffect, useRef} from "react";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {CheckCircle, XCircle} from "lucide-react";

const stepDescriptions = {
  divide: {
    title: "שלב החלוקה",
    emoji: "🤔",
    color: "from-blue-500 to-blue-600",
    question: "מה התוצאה של {workingNumber} ÷ {divisor}?",
  },
  multiply: {
    title: "שלב הכפל",
    emoji: "✖️",
    color: "from-orange-500 to-orange-600",
    question: "מה התוצאה של {quotientDigit} × {divisor}?",
  },
  subtract: {
    title: "שלב החיסור",
    emoji: "➖",
    color: "from-red-500 to-red-600",
    question: "מה התוצאה של {workingNumber} - {multiplyResult}?",
  },
  bring_down: {
    title: "שלב ההורדה",
    emoji: "⬇️",
    color: "from-green-500 to-green-600",
    question: "איזו ספרה מורידים עכשיו?",
  },
};

export default function StepInput({
  stepType,
  onSubmit,
  currentData,
  showFeedback,
  isCorrect,
  correctAnswer,
}) {
  const [answer, setAnswer] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setAnswer("");
    if (!showFeedback && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
        inputRef.current.select();
      }, 100);
    }
  }, [currentData, showFeedback]);

  const stepInfo = stepDescriptions[stepType];

  const formatQuestion = () => {
    let questionText = stepInfo.question;
    const expressionRegex = /\{(.+?)\}/g;
    let match;
    let finalExpression = questionText;

    while ((match = expressionRegex.exec(questionText)) !== null) {
      finalExpression = finalExpression.replace(
        match[0],
        currentData[match[1]]
      );
    }

    // For math operations, wrap in a LTR span
    const mathRegex = /(\d+\s*[-×÷]\s*\d+)/;
    if (mathRegex.test(finalExpression)) {
      return finalExpression.replace(
        mathRegex,
        `<span dir="ltr" class="font-mono text-xl bg-gray-100 p-2 rounded-lg">${"$&"}</span>`
      );
    }

    return finalExpression;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer.trim());
    }
  };

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      className="bg-white rounded-3xl shadow-xl p-8 border border-purple-100"
    >
      <div className="text-center mb-6">
        <div className="text-4xl mb-3 animate-bounce-gentle">
          {stepInfo.emoji}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {stepInfo.title}
        </h3>
        <div
          className={`w-20 h-1 bg-gradient-to-r ${stepInfo.color} rounded-full mx-auto`}
        ></div>
      </div>

      <div className="space-y-6">
        <div className="text-center min-h-[3rem] flex items-center justify-center">
          <p
            className="text-xl text-gray-700 leading-relaxed inline-flex items-center gap-2"
            dangerouslySetInnerHTML={{__html: formatQuestion()}}
          />
        </div>

        {!showFeedback && (
          <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto">
            <Input
              ref={inputRef}
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="הכנס תשובה..."
              className="text-center text-xl font-semibold border-2 border-purple-200 focus:border-purple-400 rounded-xl"
              disabled={showFeedback}
            />
            <Button
              type="submit"
              disabled={!answer.trim() || showFeedback}
              className={`bg-gradient-to-r ${stepInfo.color} text-white px-8 rounded-xl shadow-lg hover:shadow-xl transition-all`}
            >
              בדוק
            </Button>
          </form>
        )}

        {showFeedback && (
          <motion.div
            initial={{scale: 0.8, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            className={`text-center p-6 rounded-2xl ${
              isCorrect
                ? "bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200"
                : "bg-gradient-to-r from-red-100 to-pink-100 border border-red-200"
            }`}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              {isCorrect ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <XCircle className="w-8 h-8 text-red-600" />
              )}
              <span
                className={`text-2xl font-bold ${
                  isCorrect ? "text-green-700" : "text-red-700"
                }`}
              >
                {isCorrect ? "נכון מאוד! 🌟" : "לא נכון, נסה שוב"}
              </span>
            </div>

            {!isCorrect && (
              <div className="mb-4">
                <p className="text-red-600 font-medium">
                  התשובה הנכונה היא:{" "}
                  <span className="font-bold text-xl">{correctAnswer}</span>
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
