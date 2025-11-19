// src/components/Skills.js

import React from "react";
import { skills } from "../data";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import SkillCard from "./SkillCard";

export default function Skills() {
    const { language } = useLanguage();
    const t = translations[language];
    const [sectionRef, isSectionVisible] = useScrollAnimation({ threshold: 0.1, once: true });

    return (
        <section id="skills" className="nothing-section" ref={sectionRef}>
            <div className="nothing-container">
                <div 
                    className="text-center mb-16 nothing-fade-in"
                    style={{
                        opacity: isSectionVisible ? 1 : 0,
                        transform: isSectionVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s ease-out'
                    }}>
                    <h1 className="nothing-title mb-4 text-white">
                        {t.skills.title}
                    </h1>
                </div>
                
                {/* Design Nothing Essential Apps - Grille moderne */}
                <div className="max-w-6xl mx-auto">
                    {/* Mobile: Grille 2 colonnes compacte */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {skills.map((skill, index) => (
                            <SkillCard 
                                key={skill} 
                                skill={skill} 
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}