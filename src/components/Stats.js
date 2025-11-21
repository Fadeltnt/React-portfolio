import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCounter } from '../hooks/useCounter';
import { useLanguage } from "../contexts/LanguageContext";

export default function Stats() {
    const { language } = useLanguage();
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.3, once: true });

    const [projectsCount, startProjects] = useCounter(3, 1500, 0, false);
    const [skillsCount, startSkills] = useCounter(8, 1500, 0, false);
    const [yearsCount, startYears] = useCounter(3, 1500, 0, false);

    React.useEffect(() => {
        if (isVisible) {
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
        <section className="nothing-section py-24 border-b border-white/10">
            <div className="nothing-container">
                <div
                    ref={ref}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 max-w-6xl mx-auto divide-y md:divide-y-0 md:divide-x divide-white/10">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center py-8 md:py-0 px-4"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                transition: `all 0.6s ease-out ${stat.delay}`
                            }}>
                            <div className="mb-2 text-6xl md:text-8xl text-white font-medium font-display tracking-widest">
                                {stat.number}<span className="text-[#D71921] text-4xl md:text-6xl align-top">{stat.suffix}</span>
                            </div>
                            <div className="text-xs md:text-sm text-zinc-500 uppercase tracking-[0.2em] font-mono">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
