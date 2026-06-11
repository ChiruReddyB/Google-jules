'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Zap, ChevronLeft, ChevronRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const flashcards = [
    { front: "What is Backpropagation?", back: "An algorithm used to calculate the gradient of the loss function with respect to the weights in a neural network." },
    { front: "Activation Function", back: "A function added to an artificial neural network in order to help the network learn complex patterns in the data." },
    { front: "Overfitting", back: "When a model learns the training data too well, including its noise, making it perform poorly on new data." },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Flashcards</h1>
            <p className="text-slate-500">Master concepts through spaced repetition.</p>
          </div>
          <div className="flex items-center bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <Zap className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="font-bold">{currentIndex + 1} / {flashcards.length}</span>
          </div>
        </div>

        {/* Flashcard Component */}
        <div className="relative h-[400px] w-full perspective-1000">
          <motion.div
            className="w-full h-full relative preserve-3d cursor-pointer"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front */}
            <Card className="absolute inset-0 backface-hidden flex items-center justify-center p-12 text-center">
              <h2 className="text-3xl font-bold leading-tight">{flashcards[currentIndex].front}</h2>
              <p className="absolute bottom-8 text-slate-400 text-sm font-medium">Click to flip</p>
            </Card>

            {/* Back */}
            <Card className="absolute inset-0 backface-hidden flex items-center justify-center p-12 text-center bg-primary text-white border-0" style={{ transform: 'rotateY(180deg)' }}>
              <h2 className="text-2xl font-medium leading-relaxed">{flashcards[currentIndex].back}</h2>
              <p className="absolute bottom-8 text-white/60 text-sm font-medium">Click to flip back</p>
            </Card>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          <Button
            variant="outline"
            size="lg"
            className="h-16 w-16 rounded-full"
            onClick={() => {
              setIsFlipped(false);
              setCurrentIndex((prev) => (prev > 0 ? prev - 1 : flashcards.length - 1));
            }}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <Button
            className="h-16 px-10 text-xl rounded-2xl"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <RotateCcw className="w-6 h-6 mr-2" /> Flip Card
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-16 w-16 rounded-full"
            onClick={() => {
              setIsFlipped(false);
              setCurrentIndex((prev) => (prev < flashcards.length - 1 ? prev + 1 : 0));
            }}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </div>

        <div className="flex justify-center pt-8">
           <Button variant="ghost" className="text-emerald-500 hover:bg-emerald-50">
             <CheckCircle2 className="w-6 h-6 mr-2" /> Mark as Learned
           </Button>
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </DashboardLayout>
  );
}
