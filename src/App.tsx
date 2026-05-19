import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { 
  Heart, 
  Home, 
  Trophy, 
  BrainCircuit, 
  BookOpen, 
  Menu,
  RotateCcw,
  X
} from 'lucide-react';
import { HomeView } from './components/views/HomeView';
import { ChatView } from './components/views/ChatView';
import { PillarsView } from './components/views/PillarsView';
import { BlogView } from './components/views/BlogView';
import { PilarDetailView } from './components/views/PilarDetailView';
import { Pillar } from './types';

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [selectedPilar, setSelectedPilar] = useState<Pillar | null>(null);
  const [completedPillars, setCompletedPillars] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePilarSelect = (pilar: Pillar) => {
    setSelectedPilar(pilar);
  };

  const handlePilarComplete = (pilarId: string) => {
    if (!completedPillars.includes(pilarId)) {
      setCompletedPillars(prev => [...prev, pilarId]);
    }
  };

  const navigateTo = (view: string) => {
    setActiveView(view);
    setSelectedPilar(null);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 font-sans text-slate-900 relative flex flex-col shadow-2xl">
      {/* Header */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
          <div className="bg-rose-500 p-1.5 rounded-lg text-white shadow-sm shadow-rose-200">
            <Heart size={18} fill="currentColor" />
          </div>
          <span className="text-sm font-black tracking-tighter text-slate-800 italic uppercase">Persona & Afectividad</span>
        </div>
        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <>
                {/* Backdrop to close menu */}
                <div 
                  className="fixed inset-0 z-[-1]" 
                  onClick={() => setIsMenuOpen(false)} 
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setCompletedPillars([]);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition-colors text-left"
                  >
                    <RotateCcw size={18} />
                    Reiniciar Progreso
                  </button>
                  <div className="px-4 py-2 border-t border-slate-50">
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Acompañamiento v1.0</p>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 px-6 overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          {selectedPilar ? (
            <motion.div
              key={`pilar-${selectedPilar.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PilarDetailView 
                pilar={selectedPilar} 
                onBack={() => setSelectedPilar(null)} 
                onComplete={() => handlePilarComplete(selectedPilar.id)}
              />
            </motion.div>
          ) : (
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeView === 'home' && (
                <HomeView 
                  setView={navigateTo} 
                  completedPillars={completedPillars} 
                />
              )}
              {activeView === 'chat' && <ChatView />}
              {activeView === 'pillars' && (
                <PillarsView 
                  onSelectPilar={handlePilarSelect} 
                  completedPillars={completedPillars}
                />
              )}
              {activeView === 'blog' && <BlogView />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-xl border-t border-slate-100 px-8 py-3 z-50 rounded-t-3xl shadow-[0_-8px_30px_rgb(0,0,0,0.08)]">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => navigateTo('home')} 
            className={`flex flex-col items-center gap-1 transition-all ${activeView === 'home' ? 'text-rose-500 scale-110' : 'text-slate-400 hover:text-slate-500'}`}
            id="nav-home"
          >
            <Home size={22} fill={activeView === 'home' ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-black uppercase tracking-tight">Inicio</span>
          </button>
          <button 
            onClick={() => navigateTo('pillars')} 
            className={`flex flex-col items-center gap-1 transition-all ${activeView === 'pillars' ? 'text-rose-500 scale-110' : 'text-slate-400 hover:text-slate-500'}`}
            id="nav-pillars"
          >
            <Trophy size={22} fill={activeView === 'pillars' ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-black uppercase tracking-tight">Pilares</span>
          </button>
          <button 
            onClick={() => navigateTo('chat')} 
            className={`flex flex-col items-center gap-1 transition-all ${activeView === 'chat' ? 'text-rose-500 scale-110' : 'text-slate-400 hover:text-slate-500'}`}
            id="nav-chat"
          >
            <BrainCircuit size={22} />
            <span className="text-[10px] font-black uppercase tracking-tight">IA Mentor</span>
          </button>
          <button 
            onClick={() => navigateTo('blog')} 
            className={`flex flex-col items-center gap-1 transition-all ${activeView === 'blog' ? 'text-rose-500 scale-110' : 'text-slate-400 hover:text-slate-500'}`}
            id="nav-blog"
          >
            <BookOpen size={22} fill={activeView === 'blog' ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-black uppercase tracking-tight">Blog</span>
          </button>
        </div>
      </div>
    </div>
  );
}
