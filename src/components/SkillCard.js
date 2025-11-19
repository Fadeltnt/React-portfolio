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
            className="group"
            style={{
                opacity: isCardVisible ? 1 : 0,
                transform: isCardVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`
            }}>
            <div 
                className="relative h-24 sm:h-28 flex flex-col items-center justify-center transition-all duration-300 group-active:bg-[#2C2C2E] md:group-hover:bg-[#2C2C2E]"
                style={{
                    background: '#1C1C1E',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    fontFamily: "'Emilio Thin', sans-serif"
                }}>
                {/* Indicateur gauche au hover/active */}
                <div 
                    className="absolute left-0 top-0 bottom-0 bg-white opacity-0 group-active:opacity-100 md:group-hover:opacity-100 transition-opacity duration-300"
                    style={{width: '2px'}}
                ></div>
                
                {/* Contenu */}
                <div className="text-center px-3 sm:px-4 w-full">
                    <div 
                        className="text-[8px] sm:text-xs mb-2 sm:mb-3 text-white opacity-30 group-active:opacity-70 md:group-hover:opacity-70 transition-opacity duration-300"
                        style={{
                            fontFamily: "'Nothing', monospace",
                            letterSpacing: '0.15em',
                            fontWeight: 'normal'
                        }}>
                        {String(index + 1).padStart(2, '0')}
                    </div>
                    <div 
                        className="text-xs sm:text-sm text-white opacity-80 group-active:opacity-100 md:group-hover:opacity-100 transition-all duration-300 leading-tight sm:leading-normal"
                        style={{
                            fontFamily: "'Emilio Thin', sans-serif",
                            fontWeight: 100,
                            letterSpacing: '0.03em',
                            lineHeight: '1.4'
                        }}>
                        {skill}
                    </div>
                </div>
            </div>
        </div>
    );
}

