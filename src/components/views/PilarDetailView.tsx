import React, { useState } from 'react';
import { ChevronLeft, Trophy } from 'lucide-react';
import { Button, Card } from '../ui/Base';
import { Pillar } from '../../types';

interface PilarDetailViewProps {
  pilar: Pillar;
  onBack: () => void;
  onComplete?: () => void;
}

export const PilarDetailView = ({ pilar, onBack, onComplete }: PilarDetailViewProps) => {
  const [level, setLevel] = useState(1);
  const [completed, setCompleted] = useState(false);

  const handleNextLevel = () => {
    if (level < pilar.levels) {
      setLevel(level + 1);
    } else {
      setCompleted(true);
      if (onComplete) onComplete();
    }
  };

  if (completed) return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-160px)] text-center p-6 space-y-6 animate-in zoom-in duration-500">
      <div className="bg-amber-100 p-8 rounded-full border-4 border-amber-200">
        <Trophy size={80} className="text-amber-500 animate-bounce" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">¡Pilar Completado!</h2>
        <p className="text-slate-500">Has demostrado sabiduría en {pilar.name}.</p>
      </div>
      <Button onClick={onBack} className="w-full py-4 text-lg" id="celebration-back-button">Volver al Mapa</Button>
    </div>
  );

  return (
    <div className="space-y-6 pb-24 animate-in slide-in-from-right-8 duration-500">
      {/* ... header ... */}
      <div className="flex items-center gap-4 pt-4">
        <button 
          onClick={onBack} 
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          id="detail-back-button"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Pilar: {pilar.name}</span>
      </div>

      <div className="px-2">
        <h2 className="text-2xl font-bold text-slate-800">{pilar.name}</h2>
        <p className="text-slate-500 text-sm mt-1">{pilar.description}</p>
      </div>

      <Card className="min-h-[350px] flex flex-col justify-between border-rose-100 shadow-lg p-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">Nivel {level} de {pilar.levels}</span>
            <div className="flex gap-1 text-amber-400">
              {Array.from({ length: pilar.levels }).map((_, i) => (
                <div key={i} className={`w-4 h-4 rounded-full border-2 ${level > i ? 'bg-amber-400 border-amber-500' : 'border-amber-200'}`} />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 leading-tight">Reto de Aprendizaje</h3>
            <p className="text-slate-600 text-lg italic leading-relaxed">
              {pilar.challenges[level - 1] || "Reto de profundización: Reflexiona sobre la alteridad en este pilar."}
            </p>
          </div>
        </div>

        <Button 
          onClick={handleNextLevel} 
          className="w-full py-4 text-lg"
          id="next-level-button"
        >
          Responder y Continuar
        </Button>
      </Card>
      {/* ... progress bar ... */}
      <div className="px-2 pt-4">
         <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-rose-500 h-full transition-all duration-500 ease-out" 
              style={{ width: `${(level / pilar.levels) * 100}%` }}
            />
         </div>
      </div>
    </div>
  );
};
