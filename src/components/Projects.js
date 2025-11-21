import React from "react";
import { projects } from "../data";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import ProjectCard from "./ProjectCard";

export default function Projects() {
    const { language } = useLanguage();
    const t = translations[language];
    const [sectionRef, isSectionVisible] = useScrollAnimation({ threshold: 0.1, once: true });

    const getImagePath = (gifPath) => {
        return gifPath.replace('.gif', '.png').replace('./', '/');
    };

    return (
        <section id="projects" className="nothing-section" ref={sectionRef}>
            <div className="nothing-container">
                <div
                    className="text-center mb-24"
                    style={{
                        opacity: isSectionVisible ? 1 : 0,
                        transform: isSectionVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s ease-out'
                    }}>
                    <h1 className="font-display text-4xl md:text-6xl text-white mb-6 tracking-wider">
                        {t.projects.title}<span className="text-[#D71921]">.</span>
                    </h1>
                    <p className="font-body text-lg lg:w-2/3 mx-auto leading-relaxed max-w-2xl opacity-80">
                        {t.projects.description}
                    </p>
                </div>

                <div className="max-w-7xl mx-auto">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.image}
                            project={project}
                            index={index}
                            totalProjects={projects.length}
                            getImagePath={getImagePath}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}