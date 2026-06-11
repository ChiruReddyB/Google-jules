import { motion } from 'framer-motion';
import { Brain, LayoutDashboard, FileText, MessageSquare, GraduationCap, Settings, Bell, Search, LogOut } from 'lucide-react';
import Link from 'next/link';

export function Sidebar() {
  const menuItems = [
    { icon: <LayoutDashboard />, label: 'Dashboard', href: '/dashboard' },
    { icon: <FileText />, label: 'Documents', href: '/documents' },
    { icon: <MessageSquare />, label: 'AI Chat', href: '/chat' },
    { icon: <GraduationCap />, label: 'Quizzes', href: '/quiz' },
    { icon: <GraduationCap />, label: 'Flashcards', href: '/flashcards' },
  ];

  return (
    <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
      <div className="p-6 flex items-center space-x-2">
        <Brain className="w-8 h-8 text-primary" />
        <span className="text-xl font-bold">StudyBuddy</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <div className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-all">
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all">
          <LogOut />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}

export function TopNav() {
  return (
    <div className="h-20 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
      <div className="relative w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          placeholder="Search your notes..."
          className="w-full pl-12 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full outline-none focus:ring-2 ring-primary/20"
        />
      </div>

      <div className="flex items-center space-x-6">
        <Bell className="w-6 h-6 text-slate-400 cursor-pointer hover:text-primary transition-all" />
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5 cursor-pointer">
          <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center font-bold">
            JS
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
