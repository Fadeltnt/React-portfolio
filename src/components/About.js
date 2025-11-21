import React, { useState, useEffect } from 'react';
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function About() {
    const { language } = useLanguage();
    const t = translations[language];
    const [displayedText, setDisplayedText] = useState('');
    const [showSubtitle, setShowSubtitle] = useState(false);
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.2, once: true });

    const fullText = language === 'fr'
        ? 'SALUT, JE SUIS FADEL'
        : 'HI, I\'M FADEL';

    const subtitle = language === 'fr'
        ? `${t.about.subtitle}.`
        : `${t.about.subtitle}.`;

    useEffect(() => {
        setDisplayedText('');
        setShowSubtitle(false);

        let currentIndex = 0;
        const randomChars = '!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        const getRandomChar = () => randomChars[Math.floor(Math.random() * randomChars.length)];

        const typeNextChar = () => {
            if (currentIndex < fullText.length) {
                const isLastWord = currentIndex > fullText.lastIndexOf(' ');

                if (isLastWord) {
                    let scrambleCount = 0;
                    const maxScrambles = 3;

                    const scrambleInterval = setInterval(() => {
                        const scrambled = fullText.substring(0, currentIndex) + getRandomChar();
                        setDisplayedText(scrambled);
                        scrambleCount++;

                        if (scrambleCount >= maxScrambles) {
                            clearInterval(scrambleInterval);
                            setDisplayedText(fullText.substring(0, currentIndex + 1));
                            currentIndex++;
                            setTimeout(typeNextChar, 50);
                        }
                    }, 40);
                } else {
                    setDisplayedText(fullText.substring(0, currentIndex + 1));
                    currentIndex++;

                    const char = fullText[currentIndex - 1];
                    let speed = 80;
                    if (/[aeiouAEIOU]/.test(char)) speed = 50;
                    if (char === ' ' || char === ',') speed = 30;

                    setTimeout(typeNextChar, speed);
                }
            } else {
                setTimeout(() => {
                    setShowSubtitle(true);
                }, 300);
            }
        };

        const startTimeout = setTimeout(() => {
            typeNextChar();
        }, 500);

        return () => clearTimeout(startTimeout);
    }, [language, fullText]);

    return (
        <section id="about" className="nothing-section min-h-screen flex items-center pt-20" ref={ref}>
            <div className="nothing-container flex flex-col items-center justify-center w-full">
                <div
                    className="w-full max-w-5xl flex flex-col items-center text-center transition-all duration-1000"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
                    }}>

                    {/* Profile Image with Technical Frame */}
                    <div className="relative mb-12 group">
                        <div className="absolute inset-0 border border-white/20 rounded-full scale-110 animate-pulse-slow"></div>
                        <div className="absolute -inset-4 border border-dashed border-white/10 rounded-full animate-spin-slow"></div>
                        <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white/30 transition-colors bg-[#111]">
                            <img
                                className="object-cover object-center w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                                alt="Fadel Tinto"
                                src="/IMG_9182.jpg"
                            />
                        </div>
                        {/* Decorative Red Dot */}
                        <div className="absolute bottom-2 right-2 w-4 h-4 bg-[#D71921] rounded-full shadow-[0_0_15px_rgba(215,25,33,0.6)]"></div>
                    </div>

                    {/* Text Content */}
                    <div className="w-full max-w-3xl mx-auto">
                        <h1 className="font-display text-4xl md:text-6xl mb-6 tracking-wider">
                            <span className="block min-h-[1.2em]">
                                {displayedText}
                                <span className="animate-pulse text-[#D71921]">_</span>
                            </span>
                        </h1>

                        <div className={`transition-all duration-1000 delay-300 ${showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <p className="font-body text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed opacity-90">
                                {subtitle}
                                <br />
                                <span className="text-sm text-zinc-400 mt-6 block font-body uppercase tracking-widest leading-loose">
                                    {t.about.description}
                                </span>
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <a
                                    href="/Fadel_Tinto_CV.pdf"
                                    download="Fadel_Tinto_CV.pdf"
                                    className="nothing-button nothing-button-accent group font-mono">
                                    <span className="relative z-10">{t.about.myCV}</span>
                                </a>
                                <a
                                    href="#projects"
                                    className="nothing-button group font-mono">
                                    <span className="relative z-10">{t.about.seePastWork}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute top-1/4 left-10 w-24 h-24 border-t border-l border-white/10 opacity-50 hidden md:block"></div>
                <div className="absolute bottom-1/4 right-10 w-24 h-24 border-b border-r border-white/10 opacity-50 hidden md:block"></div>
            </div>
        </section>
    );
}
