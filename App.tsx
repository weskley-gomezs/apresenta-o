
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SLIDES } from './constants.ts';
import Slide from './components/Slide.tsx';
import AIAssistant from './components/AIAssistant.tsx';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const nextSlide = useCallback(() => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  }, [currentSlideIndex]);

  const prevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  }, [currentSlideIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const progress = ((currentSlideIndex + 1) / SLIDES.length) * 100;

  // Parallax offsets based on current index
  const parallaxOffset = useMemo(() => currentSlideIndex * -30, [currentSlideIndex]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-950 flex flex-col">
      {/* Dynamic Animated Background with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Layer 1: Deep Slow Mesh (Slight movement) */}
        <div 
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[120px] rounded-full animate-drift transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(${parallaxOffset * 0.5}px)` }}
        ></div>
        
        {/* Layer 2: Opposite Movement Mesh (Medium movement) */}
        <div 
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-[120px] rounded-full animate-drift-reverse transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(${parallaxOffset * -0.8}px)` }}
        ></div>
        
        {/* Layer 3: Orbiting Light (Stronger movement) */}
        <div 
          className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[100px] rounded-full animate-orbit transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(${parallaxOffset * 1.2}px)` }}
        ></div>
        
        {/* Subtle texture overlay (Static) */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        {/* Moving highlights (Dynamic Parallax) */}
        <div 
          className="absolute top-1/4 left-1/3 w-px h-px shadow-[0_0_250px_100px_rgba(99,102,241,0.15)] animate-pulse-glow transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${parallaxOffset * 0.2}px, ${parallaxOffset * 0.1}px)` }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/3 w-px h-px shadow-[0_0_250px_100px_rgba(168,85,247,0.15)] animate-pulse-glow transition-transform duration-1000 ease-out" 
          style={{ animationDelay: '-5s', transform: `translate(${parallaxOffset * -0.3}px, ${parallaxOffset * -0.2}px)` }}
        ></div>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-800/30 z-50">
        <div 
          className="h-full bg-indigo-500 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) shadow-[0_0_15px_rgba(99,102,241,0.6)]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Main Slide Container */}
      <main className="flex-1 relative flex items-center justify-center overflow-hidden z-10">
        {SLIDES.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
              index === currentSlideIndex 
                ? 'opacity-100 translate-x-0 scale-100 z-10' 
                : index < currentSlideIndex 
                  ? 'opacity-0 -translate-x-20 scale-95 z-0 pointer-events-none' 
                  : 'opacity-0 translate-x-20 scale-95 z-0 pointer-events-none'
            }`}
          >
            <Slide data={slide} isActive={index === currentSlideIndex} />
          </div>
        ))}
      </main>

      {/* Footer Navigation */}
      <footer className="h-20 bg-slate-950/40 backdrop-blur-xl border-t border-white/5 flex items-center justify-between px-6 md:px-12 z-40 relative">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10">
             <span className="text-indigo-400 text-xs font-mono font-bold">
               {String(currentSlideIndex + 1).padStart(2, '0')}
             </span>
          </div>
          <span className="text-slate-500 text-xs font-mono uppercase tracking-[0.3em]">
            / {String(SLIDES.length).padStart(2, '0')}
          </span>
          <div className="hidden md:block h-4 w-px bg-slate-800 mx-2"></div>
          <h4 className="hidden md:block text-slate-400 text-[10px] uppercase tracking-[0.25em] font-bold">
            IA na Educação: Inovações Pedagógicas
          </h4>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-5 transition-all text-white group"
            aria-label="Slide anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentSlideIndex === SLIDES.length - 1}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-20 transition-all hover:scale-105 active:scale-95 text-white shadow-lg shadow-indigo-500/20 group"
            aria-label="Próximo slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </footer>

      <AIAssistant currentSlideTitle={SLIDES[currentSlideIndex].title} />
    </div>
  );
};

export default App;
