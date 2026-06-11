'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Brain, Mail, Lock, Github } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <Card className="w-full max-w-md p-10">
        <div className="text-center mb-10">
          <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Log in to your StudyBuddy account</p>
        </div>

        <div className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="jules@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button className="w-full h-12 text-lg">
            Login
          </Button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-sm uppercase">
              <span className="bg-white dark:bg-slate-900 px-2 text-slate-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12">
              <Github className="w-5 h-5 mr-2" /> Google
            </Button>
            <Button variant="outline" className="h-12">
              <Github className="w-5 h-5 mr-2" /> Github
            </Button>
          </div>
        </div>

        <p className="text-center mt-10 text-slate-500">
          Don't have an account?{' '}
          <Link href="/register" className="text-primary font-bold hover:underline">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}
