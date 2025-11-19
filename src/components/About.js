import React, { useState, useEffect } from 'react';
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function About() {
    const { language } = useLanguage();
    const t = translations[language];
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.2, once: true });
    
    const fullText = language === 'fr' 
        ? 'SALUT, JE SUIS FADEL'
        : 'HI, I\'M FADEL';
    
    const subtitle = language === 'fr'
        ? `${t.about.subtitle}.`
        : `${t.about.subtitle}.`;

    useEffect(() => {
        setDisplayedText('');
        setIsTyping(true);
        let currentIndex = 0;
        
        // Vitesse variable pour effet gaming plus réaliste
        const getTypingSpeed = (char) => {
            // Espaces et virgules plus rapides
            if (char === ' ' || char === ',') return 30;
            // Voyelles plus rapides
            if (/[aeiouAEIOU]/.test(char)) return 60;
            // Consonnes normales
            return 90;
        };
        
        const typeNextChar = () => {
            if (currentIndex < fullText.length) {
                const char = fullText[currentIndex];
                setDisplayedText(fullText.substring(0, currentIndex + 1));
                currentIndex++;
                
                const speed = getTypingSpeed(char);
                setTimeout(typeNextChar, speed);
            } else {
                // Petit délai avant d'afficher le sous-titre
                setTimeout(() => {
                    setIsTyping(false);
                }, 300);
            }
        };
        
        typeNextChar();
    }, [language, fullText]);

    return (
        <section id="about" className="nothing-section min-h-screen flex items-center py-12 sm:py-16 md:py-0" ref={ref}>
            <div className="nothing-container flex flex-col items-center">
                <div 
                    className="w-full max-w-4xl flex flex-col items-center text-center nothing-fade-in px-4 sm:px-0"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s ease-out'
                    }}>
                    {/* Photo de profil */}
                    <div 
                        className="mb-8 sm:mb-10 nothing-fade-in hover-lift"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                            transition: 'all 0.8s ease-out 0.2s'
                        }}>
                        <div 
                            className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden"
                            style={{
                                border: '2px solid rgba(255, 255, 255, 0.12)',
                                background: '#1C1C1E'
                            }}>
                            <img
                                className="object-cover object-center w-full h-full"
                                alt="Fadel Tinto"
                                src="/IMG_9182.jpg"
                            />
                        </div>
                    </div>

                    {/* Contenu */}
                    <div className="w-full">
                        <h1 className="typing-title mb-6 sm:mb-8 text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
                            <span className={isTyping ? 'typing-animation' : ''} style={{fontFamily: "'Nothing', monospace"}}>
                                {displayedText}
                            </span>
                            {!isTyping && (
                                <>
                                    <br className="hidden lg:inline-block"/> 
                                    <span className="text-white text-opacity-90 block sm:inline" style={{fontFamily: "'Nothing', monospace", letterSpacing: '0.08em'}}>{subtitle}</span>
                                </>
                            )}
                        </h1>
                        <p className="nothing-subtitle mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto text-sm sm:text-base">
                            {t.about.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <a
                                href="/Fadel_Tinto_CV.pdf"
                                download="Fadel_Tinto_CV.pdf"
                                className="nothing-button nothing-button-accent text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3">
                                {t.about.myCV}
                            </a>
                            <a
                                href="#projects"
                                className="nothing-button text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3">
                                {t.about.seePastWork}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}