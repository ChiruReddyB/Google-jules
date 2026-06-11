'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, Award, Clock, BookOpen } from 'lucide-react';

export default function AnalyticsPage() {
  const studyData = [
    { day: 'Mon', hours: 4 },
    { day: 'Tue', hours: 6 },
    { day: 'Wed', hours: 3 },
    { day: 'Thu', hours: 8 },
    { day: 'Fri', hours: 5 },
    { day: 'Sat', hours: 2 },
    { day: 'Sun', hours: 4 },
  ];

  const scoreData = [
    { subject: 'Math', score: 85 },
    { subject: 'CS', score: 92 },
    { subject: 'Bio', score: 78 },
    { subject: 'Phys', score: 88 },
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981'];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Learning Analytics</h1>
            <p className="text-slate-500">Track your progress and identify areas for improvement.</p>
          </div>
          <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg font-bold text-sm">Last 7 Days</button>
            <button className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-bold text-sm text-slate-500">Last 30 Days</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Accuracy" value="88%" icon={<Award />} trend="+4.2%" color="text-emerald-500" />
          <StatCard title="Study Hours" value="32.5h" icon={<Clock />} trend="+12%" color="text-primary" />
          <StatCard title="Courses" value="4" icon={<BookOpen />} trend="0%" color="text-secondary" />
          <StatCard title="Improvement" value="15%" icon={<TrendingUp />} trend="+2.1%" color="text-accent-cyan" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="h-[400px] flex flex-col">
            <h3 className="text-lg font-bold mb-6">Study Activity (Hours)</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={studyData}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="h-[400px] flex flex-col">
            <h3 className="text-lg font-bold mb-6">Subject Proficiency</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="subject" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                    {scoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, icon, trend, color }: any) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-600`}>
          {trend}
        </span>
      </div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </Card>
  );
}
