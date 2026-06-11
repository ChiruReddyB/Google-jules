'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Brain, User, Mail, Lock } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <Card className="w-full max-w-md p-10">
        <div className="text-center mb-10">
          <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-slate-500 mt-2">Join thousands of students studying smarter</p>
        </div>

        <div className="space-y-6">
          <Input
            label="Full Name"
            placeholder="Jules Software"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            Create Account
          </Button>
        </div>

        <p className="text-center mt-10 text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}
