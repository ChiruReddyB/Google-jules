'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { FileText, Zap, BookOpen, Clock, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const stats = [
    { label: 'Total Documents', value: '12', icon: <FileText />, color: 'bg-blue-500' },
    { label: 'Total Flashcards', value: '156', icon: <Zap />, color: 'bg-yellow-500' },
    { label: 'Total Quizzes', value: '24', icon: <BookOpen />, color: 'bg-green-500' },
    { label: 'Study Time', value: '42h', icon: <Clock />, color: 'bg-purple-500' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, Jules! 👋</h1>
          <p className="text-slate-500">Ready to ace your exams? Here's your study overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="flex items-center space-x-4 p-6">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-white`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Recent Uploads</h2>
              <button className="text-primary font-medium hover:underline flex items-center">
                View all <ArrowUpRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      <FileText />
                    </div>
                    <div>
                      <p className="font-bold">Neural_Networks_Intro.pdf</p>
                      <p className="text-xs text-slate-500">Uploaded 2 hours ago • 4.2 MB</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-primary">•••</button>
                </div>
              ))}
            </div>
          </Card>

          {/* Study Streak */}
          <Card className="bg-gradient-to-br from-primary to-secondary text-white border-0">
            <h2 className="text-xl font-bold mb-4">Study Streak 🔥</h2>
            <div className="text-5xl font-black mb-4">7 Days</div>
            <p className="text-white/80 text-sm mb-6">
              You're on a roll! Keep it up to reach your weekly goal of 10 days.
            </p>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                  S
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
