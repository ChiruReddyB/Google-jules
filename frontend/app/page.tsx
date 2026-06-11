'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BookOpen, Zap, Brain, Shield, Sparkles, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Brain className="w-10 h-10 text-primary" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            StudyBuddy AI
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 pt-20 pb-32 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            Study <span className="text-primary">Smarter</span>,<br />
            Not Harder.
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12">
            The ultimate AI-powered study assistant. Upload your notes, generate summaries,
            create quizzes, and ace your exams with StudyBuddy AI.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="w-full md:w-auto h-14 px-10 text-xl">
                Start Studying Free
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full md:w-auto h-14 px-10 text-xl">
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="px-8 py-32 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Everything you need to succeed</h2>
            <p className="text-slate-600">Powerful AI tools designed for students.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sparkles />}
              title="AI Summaries"
              desc="Convert massive textbooks into concise, digestible summaries in seconds."
            />
            <FeatureCard
              icon={<MessageCircle />}
              title="Chat with Notes"
              desc="Ask questions about your documents and get instant, accurate answers."
            />
            <FeatureCard
              icon={<Zap />}
              title="Smart Quizzes"
              desc="Automatically generate practice tests based on your specific study materials."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <Card className="flex flex-col items-center text-center p-8">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
    </Card>
  );
}
