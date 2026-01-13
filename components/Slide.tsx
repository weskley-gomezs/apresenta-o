
import React from 'react';
import { SlideData } from '../types';

interface SlideProps {
  data: SlideData;
  isActive: boolean;
}

const Slide: React.FC<SlideProps> = ({ data, isActive }) => {
  if (!isActive) return null;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-8 md:p-20 max-w-7xl mx-auto">
      {data.isTitleSlide ? (
        <div className="text-center space-y-8 md:space-y-12">
          <div className="space-y-6">
            <span className="inline-block px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-2 animate-content-in">
              Formação Docente
            </span>
            <h1 className="font-display text-5xl md:text-8xl font-extrabold tracking-tightest leading-[1.1] md:leading-[1.0] bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-100 to-indigo-300 animate-content-in delay-200">
              {data.title}
            </h1>
          </div>
          
          <div className="space-y-4">
            {data.subtitle && (
              <p className="text-xl md:text-4xl text-slate-400 font-light max-w-4xl mx-auto leading-relaxed tracking-tight animate-content-in delay-400">
                {data.subtitle}
              </p>
            )}
            
            {data.author && (
              <div className="pt-4 animate-content-in delay-600">
                <p className="text-indigo-400/80 font-display text-lg md:text-2xl font-medium tracking-wide">
                  por <span className="text-indigo-300 font-bold">{data.author}</span>
                </p>
              </div>
            )}
          </div>
          
          <div className="pt-8 flex justify-center items-center gap-6 animate-content-in delay-800">
             <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-indigo-500/60 rounded-full"></div>
             <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,1)] animate-pulse"></div>
             <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-indigo-500/60 rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="w-full space-y-12">
          <header className="space-y-4 animate-content-in">
            <h2 className="font-display text-4xl md:text-7xl font-bold text-white tracking-tightest leading-none">
              {data.title.replace(/^Slide \d+ – /, '')}
            </h2>
            <div className="h-2 w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-transparent rounded-full opacity-80"></div>
          </header>
          
          {data.subtitle && (
            <h3 className="font-display text-2xl md:text-4xl text-indigo-300 font-semibold tracking-tight leading-snug animate-content-in delay-200">
              {data.subtitle}
            </h3>
          )}

          <div className="relative">
            {data.quote ? (
              <div className="relative group overflow-hidden animate-content-in delay-400">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative py-12 px-10 md:px-16 bg-slate-900/60 border border-white/5 rounded-3xl backdrop-blur-xl">
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
                  <svg className="absolute top-8 left-8 w-16 h-16 text-indigo-500/10 pointer-events-none" fill="currentColor" viewBox="0 0 32 32"><path d="M10 8v8H6c0 2.2 1.8 4 4 4v4c-4.4 0-8-3.6-8-8V8h8zm14 0v8h-4c0 2.2 1.8 4 4 4v4c-4.4 0-8-3.6-8-8V8h8z"></path></svg>
                  <blockquote className="relative font-display text-3xl md:text-5xl font-medium text-slate-50 leading-[1.2] italic tracking-tight">
                    {data.quote}
                  </blockquote>
                </div>
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-8 md:gap-10">
                {data.content.map((item, idx) => (
                  <li 
                    key={idx} 
                    className={`flex items-start gap-6 group animate-content-in`}
                    style={{ animationDelay: `${400 + (idx * 150)}ms` }}
                  >
                    <div className="mt-3 flex-shrink-0">
                       <div className="w-3 h-3 rounded-full bg-indigo-500 group-hover:bg-white group-hover:scale-125 transition-all duration-300 shadow-[0_0_12px_rgba(99,102,241,0.6)]"></div>
                    </div>
                    <span className="text-xl md:text-3xl text-slate-300 group-hover:text-white transition-colors leading-[1.4] font-normal tracking-tight">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {data.highlight && (
            <div className="mt-12 p-10 bg-gradient-to-br from-indigo-900/20 via-slate-800/40 to-purple-900/20 rounded-[2rem] border border-white/10 relative overflow-hidden text-center group animate-content-in delay-800">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <p className="font-display relative text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white tracking-tight leading-tight">
                {data.highlight}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Slide;