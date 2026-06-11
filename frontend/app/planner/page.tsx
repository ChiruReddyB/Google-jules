'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar as CalendarIcon, Clock, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PlannerPage() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Study Planner</h1>
            <p className="text-slate-500">Your personalized schedule to crush your goals.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline"><CalendarIcon className="w-5 h-5 mr-2" /> Sync Calendar</Button>
             <Button><Plus className="w-5 h-5 mr-2" /> New Task</Button>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold">October 16 - 22, 2023</h2>
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
              <button className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all"><ChevronLeft className="w-5 h-5" /></button>
              <button className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" className="font-bold">Day</Button>
            <Button size="sm" className="font-bold">Week</Button>
            <Button size="sm" variant="ghost" className="font-bold">Month</Button>
          </div>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="grid grid-cols-8 border-b border-slate-100 dark:border-slate-800">
            <div className="p-4 border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50"></div>
            {days.map(day => (
              <div key={day} className="p-4 text-center font-bold border-r border-slate-100 dark:border-slate-800 last:border-0">
                {day}
              </div>
            ))}
          </div>

          <div className="relative">
            {hours.map((hour, i) => (
              <div key={hour} className="grid grid-cols-8 border-b border-slate-100 dark:border-slate-800 last:border-0">
                <div className="p-4 text-xs font-bold text-slate-400 border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-center">
                  {hour}
                </div>
                {days.map((_, j) => (
                  <div key={j} className="p-2 border-r border-slate-100 dark:border-slate-800 last:border-0 min-h-[80px] relative">
                    {i === 1 && j === 0 && (
                      <div className="absolute inset-2 bg-primary/10 border-l-4 border-primary rounded-lg p-2 text-[10px]">
                        <p className="font-bold text-primary">Deep Learning</p>
                        <p className="text-slate-500">Review Lecture 1</p>
                      </div>
                    )}
                    {i === 3 && j === 2 && (
                      <div className="absolute inset-2 bg-secondary/10 border-l-4 border-secondary rounded-lg p-2 text-[10px]">
                        <p className="font-bold text-secondary">Mathematics</p>
                        <p className="text-slate-500">Practice Quiz</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
