import { motion } from 'framer-motion';
import { cn } from './Button';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({ children, className, hover = true }: CardProps) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5 } : {}}
      className={cn(
        'bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl shadow-black/5 border border-slate-100 dark:border-slate-800',
        className
      )}
    >
      {children}
    </motion.div>
  );
};
