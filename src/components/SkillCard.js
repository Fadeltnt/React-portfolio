import React from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function SkillCard({ skill, index }) {
    const [cardRef, isCardVisible] = useScrollAnimation({ 
        threshold: 0.1, 
        once: true,
        rootMargin: '0px 0px -50px 0px'
    });

    return (
        <div 
            ref={cardRef}
            className="group relative"
            style={{
                opacity: isCardVisible ? 1 : 0,
                transform: isCardVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`
            }}>
            {/* Croix de grille aux coins */}
            <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-white/10 z-10"></div>
            <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-white/10 z-10"></div>
            <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-white/10 z-10"></div>
            <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-white/10 z-10"></div>

            <div 
                className="relative h-32 flex flex-col justify-between p-4 transition-all duration-300 hover:bg-white/5 overflow-hidden"
                style={{
                    background: 'rgba(10, 10, 10, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                }}>
                
                {/* Effet de scan au survol */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out"></div>

                {/* Header Tech */}
                <div className="flex justify-between items-start w-full relative z-10">
                    <span className="text-[9px] font-mono text-white/20 tracking-widest group-hover:text-white/40 transition-colors">
                        SYS.{String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex gap-1">
                         <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                         <div className="w-1 h-1 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                </div>

                {/* Contenu */}
                <div className="flex flex-col gap-2 relative z-10">
                    <div className="w-2 h-[1px] bg-white/20 group-hover:w-12 transition-all duration-500"></div>
                    <span 
                        className="text-sm sm:text-base text-white opacity-60 group-hover:opacity-100 transition-opacity duration-300 tracking-wide uppercase"
                        style={{
                            fontFamily: "'Nothing', sans-serif",
                            letterSpacing: '0.05em'
                        }}>
                        {skill}
                    </span>
                </div>
            </div>
        </div>
    );
}
