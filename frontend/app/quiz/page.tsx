'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BookOpen, CheckCircle2, XCircle, Timer, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuizPage() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      q: "What is the primary function of a Convolutional Layer?",
      options: ["Feature Extraction", "Sequence Prediction", "Sorting Data", "Memory Storage"],
      correct: 0
    },
    {
      q: "True or False: Dropout helps prevent overfitting in Neural Networks.",
      options: ["True", "False"],
      correct: 0
    }
  ];

  const handleAnswer = (idx: number) => {
    if (idx === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {!quizStarted ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-8">
              <BookOpen className="w-12 h-12" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Ready for a Quiz?</h1>
            <p className="text-slate-500 mb-12 max-w-lg mx-auto">
              Test your knowledge on 'Deep Learning Lecture 01'. This quiz contains 10 questions and should take about 5 minutes.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <Timer className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-bold">10 Minutes</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <Award className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-bold">Medium Difficulty</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-bold">10 Questions</p>
              </div>
            </div>
            <Button size="lg" className="h-16 px-12 text-xl" onClick={() => setQuizStarted(true)}>
              Start Quiz
            </Button>
          </div>
        ) : showResults ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="p-12 text-center">
              <Award className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
              <p className="text-slate-500 mb-8">You've done a great job. Here's your score:</p>
              <div className="text-7xl font-black text-primary mb-8">{Math.round((score/questions.length)*100)}%</div>
              <p className="text-xl font-bold mb-12">{score} out of {questions.length} correct</p>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 h-14" onClick={() => setQuizStarted(false)}>Back to Dashboard</Button>
                <Button className="flex-1 h-14" onClick={() => {
                  setCurrentQuestion(0);
                  setScore(0);
                  setShowResults(false);
                }}>Try Again</Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold">
                  {currentQuestion + 1}
                </div>
                <div>
                  <h2 className="text-lg font-bold">Question {currentQuestion + 1} of {questions.length}</h2>
                  <div className="w-64 h-2 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center text-slate-500">
                <Timer className="w-5 h-5 mr-2" />
                <span className="font-mono font-bold">09:42</span>
              </div>
            </div>

            <Card className="p-10">
              <h3 className="text-2xl font-bold mb-10">{questions[currentQuestion].q}</h3>
              <div className="grid gap-4">
                {questions[currentQuestion].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="w-full text-left p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-primary hover:bg-primary/5 transition-all group flex items-center justify-between"
                  >
                    <span className="font-medium">{opt}</span>
                    <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-primary" />
                  </button>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
