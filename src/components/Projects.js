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

    // Convertir les GIF en images statiques (remplacer .gif par .png ou .jpg)
    const getImagePath = (gifPath) => {
        return gifPath.replace('.gif', '.png').replace('./', '/');
    };

    return(
        <section id="projects" className="nothing-section" ref={sectionRef}>
            <div className="nothing-container">
                <div 
                    className="text-center mb-20 nothing-fade-in"
                    style={{
                        opacity: isSectionVisible ? 1 : 0,
                        transform: isSectionVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s ease-out'
                    }}>
                    <h1 className="nothing-title mb-6 text-white">
                        {t.projects.title}
                    </h1>
                    <p className="nothing-subtitle lg:w-2/3 mx-auto leading-relaxed">
                        {t.projects.description}
                    </p>
                </div>

                {/* Design Moodboard Architectural - Layout asymétrique */}
                <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
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