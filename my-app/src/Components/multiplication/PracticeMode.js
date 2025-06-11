import React, {useState, useEffect, useRef} from "react";
import {Button} from "../../components/ui/button";
import {Input} from "../../components/ui/input";
import {motion, AnimatePresence} from "framer-motion";
import {Timer, Check, X, ArrowRight} from "lucide-react";

const FAST_PRACTICE_DURATION = 60; // 60 seconds

export default function PracticeMode({selectedNumber, onBack}) {
  const [problem, setProblem] = useState(null);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(FAST_PRACTICE_DURATION);
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'correct' or 'incorrect'
  const inputRef = useRef(null);

  const isFastMode = selectedNumber === null;
  const problemsForByNumber = useRef(Array.from({length: 10}, (_, i) => i + 1));
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

  useEffect(() => {
    if (isFastMode) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isFastMode]);

  useEffect(() => {
    generateProblem();
  }, [currentProblemIndex]);

  // Auto-focus input when problem changes
  useEffect(() => {
    if (inputRef.current && !feedback) {
      setTimeout(() => {
        inputRef.current.focus();
        inputRef.current.select();
      }, 100);
    }
  }, [problem, feedback]);

  const generateProblem = () => {
    let num1, num2;
    if (isFastMode) {
      num1 = Math.floor(Math.random() * 9) + 2; // 2-10
      num2 = Math.floor(Math.random() * 9) + 2; // 2-10
    } else {
      num1 = selectedNumber;
      num2 = problemsForByNumber.current[currentProblemIndex];
    }
    setProblem({num1, num2, correctAnswer: num1 * num2});
    setAnswer("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer) return;

    const isCorrect = parseInt(answer) === problem.correctAnswer;
    setFeedback(isCorrect ? "correct" : "incorrect");

    setTimeout(() => {
      setFeedback(null);
      if (isCorrect) {
        setScore((prev) => prev + 10); // 10 points per correct answer
        if (!isFastMode) {
          if (currentProblemIndex < problemsForByNumber.current.length - 1) {
            setCurrentProblemIndex((prev) => prev + 1);
          } else {
            setIsFinished(true);
          }
        } else {
          generateProblem();
        }
      } else {
        if (isFastMode) generateProblem();
      }
    }, 1000);
  };

  if (isFinished) {
    return (
      <div className="text-center p-8">
        <h2 className="text-3xl font-bold mb-4">
          {isFastMode ? "הזמן נגמר!" : "כל הכבוד! סיימת!"}
        </h2>
        <p className="text-xl mb-6">פתרת נכון {score / 10} תרגילים!</p>
        <p className="text-lg mb-6">הניקוד שלך: {score} נקודות</p>
        <Button onClick={onBack}>חזרה לבחירת מצב</Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowRight className="ml-2 w-4 h-4" /> חזור
          </Button>
          <div className="text-lg font-bold">ניקוד: {score}</div>
          {isFastMode && (
            <div className="flex items-center gap-2 text-lg font-bold text-red-500">
              <Timer />
              <span>{timeLeft}</span>
            </div>
          )}
        </div>

        {problem && (
          <form onSubmit={handleSubmit}>
            <AnimatePresence>
              <motion.div
                key={problem.num1 * 100 + problem.num2}
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 20}}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <div dir="ltr" className="text-5xl font-bold mb-6 font-mono">
                  {problem.num1} × {problem.num2}
                </div>
                <Input
                  ref={inputRef}
                  type="number"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="text-center text-3xl h-16 mb-6"
                  disabled={feedback !== null}
                  autoFocus
                />
                <Button
                  type="submit"
                  className="w-full h-12 text-xl"
                  disabled={feedback !== null}
                >
                  בדיקה
                </Button>
              </motion.div>
            </AnimatePresence>
          </form>
        )}

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{scale: 0.5, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              exit={{scale: 0.5, opacity: 0}}
              className={`mt-6 p-4 rounded-lg flex items-center justify-center gap-2 text-white font-bold ${
                feedback === "correct" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {feedback === "correct" ? <Check /> : <X />}
              <span>
                {feedback === "correct"
                  ? "נכון מאוד! +10 נקודות"
                  : `טעות! התשובה היא ${problem.correctAnswer}`}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
