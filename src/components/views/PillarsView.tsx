import React from 'react';
import { PILARES } from '../../constants';
import { IconMap } from '../icons';
import { Pillar } from '../../types';
import { CheckCircle2 } from 'lucide-react';

interface PillarsViewProps {
  onSelectPilar: (pilar: Pillar) => void;
  completedPillars?: string[];
}

export const PillarsView = ({ onSelectPilar, completedPillars = [] }: PillarsViewProps) => (
  <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-right-4 duration-500">
    <header className="pt-4 px-2">
      <h2 className="text-2xl font-bold text-slate-800">Academia de Amor</h2>
      <p className="text-slate-500 text-sm">Fortalece tu relación nivel a nivel.</p>
    </header>
    <div className="flex flex-col items-center gap-12 py-8 relative">
      {/* Decorative connecting line */}
      <div className="absolute top-24 bottom-24 w-1 bg-slate-200 left-1/2 -translate-x-1/2 -z-10" />
      
      {PILARES.map((p) => {
        const Icon = IconMap[p.icon] || IconMap.Heart;
        const isCompleted = completedPillars.includes(p.id);
        return (
          <div key={p.id} className="flex flex-col items-center w-full max-sm">
            <button 
              onClick={() => onSelectPilar(p)} 
              className="group relative flex flex-col items-center"
              id={`pilar-${p.id}`}
            >
              <div className={`${isCompleted ? 'bg-amber-400' : p.color} w-20 h-20 rounded-full border-b-8 border-black/20 flex items-center justify-center text-white shadow-xl group-active:translate-y-1 group-active:border-b-4 transition-all group-hover:scale-105 relative`}>
                <Icon size={32} />
                {isCompleted && (
                  <div className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-md animate-in zoom-in duration-300">
                    <CheckCircle2 size={24} className="text-amber-500" />
                  </div>
                )}
              </div>
              <div className="mt-4 text-center">
                <h3 className={`font-black uppercase tracking-tight text-sm ${isCompleted ? 'text-amber-600' : 'text-slate-700'}`}>
                  {p.name}
                  {isCompleted && <span className="block text-[10px] text-amber-500">¡Completado!</span>}
                </h3>
                <div className="mt-1 flex gap-1 justify-center">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-amber-300' : 'bg-slate-300'}`} />
                  ))}
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  </div>
);
