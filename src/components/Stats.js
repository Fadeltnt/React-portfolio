import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCounter } from '../hooks/useCounter';
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";

export default function Stats() {
    const { language } = useLanguage();
    const t = translations[language];
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.3, once: true });
    
    const [projectsCount, startProjects] = useCounter(3, 1500, 0, false);
    const [skillsCount, startSkills] = useCounter(8, 1500, 0, false);
    const [yearsCount, startYears] = useCounter(3, 1500, 0, false);

    React.useEffect(() => {
        if (isVisible) {
            // Petit délai pour un effet plus fluide
            const timer = setTimeout(() => {
                startProjects();
                startSkills();
                startYears();
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [isVisible, startProjects, startSkills, startYears]);

    const stats = [
        {
            number: projectsCount,
            suffix: '+',
            label: language === 'fr' ? 'PROJETS' : 'PROJECTS',
            delay: '0s'
        },
        {
            number: skillsCount,
            suffix: '+',
            label: language === 'fr' ? 'TECHNOLOGIES' : 'TECHNOLOGIES',
            delay: '0.2s'
        },
        {
            number: yearsCount,
            suffix: '+',
            label: language === 'fr' ? 'ANNÉES D\'ÉTUDES' : 'YEARS STUDYING',
            delay: '0.4s'
        }
    ];

    return (
        <section className="nothing-section py-16 sm:py-20">
            <div className="nothing-container">
                <div 
                    ref={ref}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center nothing-fade-in"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                transition: `all 0.6s ease-out ${stat.delay}`
                            }}>
                            <div 
                                className="mb-4 text-5xl sm:text-6xl md:text-7xl text-white"
                                style={{
                                    fontFamily: "'Nothing', monospace",
                                    letterSpacing: '0.05em',
                                    lineHeight: '1'
                                }}>
                                {stat.number}{stat.suffix}
                            </div>
                            <div 
                                className="text-sm sm:text-base text-white opacity-60 uppercase tracking-widest"
                                style={{
                                    fontFamily: "'Nothing', monospace",
                                    letterSpacing: '0.15em'
                                }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

