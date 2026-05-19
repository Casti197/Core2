import React, { PropsWithChildren } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
}

export const Button = ({ children, variant = 'primary', className, ...props }: PropsWithChildren<ButtonProps>) => {
  const variants = {
    primary: 'bg-rose-500 text-white hover:bg-rose-600 shadow-md',
    secondary: 'bg-white text-rose-500 border border-rose-100 hover:bg-rose-50',
    ghost: 'hover:bg-rose-50 text-slate-600',
    outline: 'border-2 border-rose-200 text-rose-600 hover:bg-rose-50'
  };

  return (
    <button 
      className={cn(
        'px-4 py-2 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card = ({ children, className, ...props }: PropsWithChildren<{ className?: string }>) => (
  <div className={cn('bg-white rounded-2xl shadow-sm border border-slate-100 p-6', className)} {...props}>
    {children}
  </div>
);

export const Textarea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={cn(
        'bg-slate-50 border-slate-200 placeholder:text-slate-400 focus:border-rose-400 focus:ring-rose-400/20 flex min-h-16 w-full rounded-xl border px-3 py-2 text-base shadow-sm transition-all outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none',
        className
      )}
      {...props}
    />
  );
};
