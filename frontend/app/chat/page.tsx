'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Brain, Send, User, Sparkles, Plus, ChevronDown } from 'lucide-react';

export default function AIChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your AI Study Buddy. Select a document and ask me anything about it.' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    // Mock response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Based on your lecture notes, Neural Networks are inspired by the biological brain's structure..."
      }]);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-10rem)] flex flex-col max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">AI Chat</h1>
            <div className="flex items-center bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-primary transition-all">
              <span className="text-sm font-medium mr-2">Deep_Learning_Lecture_01.pdf</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" /> New Chat
          </Button>
        </div>

        {/* Chat Container */}
        <Card className="flex-1 overflow-hidden flex flex-col p-0 border-0 shadow-2xl">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
                  <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${
                    msg.role === 'user' ? 'bg-primary text-white' : 'bg-secondary/10 text-secondary'
                  }`}>
                    {msg.role === 'user' ? <User className="w-6 h-6" /> : <Brain className="w-6 h-6" />}
                  </div>
                  <div className={`p-4 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-800 rounded-tl-none'
                  }`}>
                    <p className="leading-relaxed">{msg.content}</p>
                    {msg.role === 'assistant' && i > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-secondary" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Source: Page 4-5</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="relative">
              <textarea
                rows={1}
                placeholder="Ask a question about your notes..."
                className="w-full pl-6 pr-16 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-primary/20 resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              />
              <button
                onClick={handleSend}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary-dark transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-500 mt-3">
              StudyBuddy AI can make mistakes. Check important info.
            </p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
