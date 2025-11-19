import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from "../contexts/LanguageContext";

export default function ProjectCard({ project, index, totalProjects, getImagePath }) {
    const { language } = useLanguage();
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.15, once: true });
    const isEven = index % 2 === 0;

    return (
        <a
            href={project.link}
            key={project.image}
            target="_blank"
            rel="noopener noreferrer"
            className="block group relative mb-32 last:mb-0"
            ref={ref}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
            }}>
            
            {/* Croix de repérage techniques globales */}
            <div className="hidden md:block absolute -left-8 top-0 tech-cross opacity-20"></div>
            <div className="hidden md:block absolute -right-8 bottom-0 tech-cross opacity-20"></div>

            <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-20 items-center`}>
                
                {/* Zone Image Moodboard */}
                <div className="w-full md:w-7/12 relative group-hover:z-10">
                    {/* Éléments décoratifs techniques autour de l'image */}
                    <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-white opacity-10 hidden md:block transition-all duration-500 group-hover:w-32 group-hover:h-32"></div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-white opacity-10 hidden md:block transition-all duration-500 group-hover:w-32 group-hover:h-32"></div>

                    {/* Conteneur principal image */}
                    <div className="relative">
                         {/* Coins techniques */}
                        <div className="nothing-corner-bracket bracket-tl"></div>
                        <div className="nothing-corner-bracket bracket-tr"></div>
                        <div className="nothing-corner-bracket bracket-bl"></div>
                        <div className="nothing-corner-bracket bracket-br"></div>

                        {/* Image Principale */}
                        <div className="relative overflow-hidden aspect-[16/10] bg-[#0a0a0a] transition-all duration-500">
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300 z-10"></div>
                            <img
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
                                src={getImagePath(project.image)}
                                onError={(e) => {
                                    e.target.src = project.image;
                                }}
                            />
                            
                            {/* Overlay Technique sur l'image */}
                            <div className="absolute top-4 right-4 z-20 flex flex-col items-end opacity-60 mix-blend-difference">
                                <span className="text-[10px] font-mono tracking-widest text-white">IMG.0{index + 1}</span>
                                <span className="text-[10px] font-mono tracking-widest text-white">RAW_DATA</span>
                            </div>
                        </div>
                    </div>

                    {/* Image secondaire flottante (Moodboard effect) */}
                    <div className={`hidden md:block absolute -bottom-8 ${isEven ? '-right-8' : '-left-8'} w-40 aspect-square bg-[#0a0a0a] border border-white/10 z-20 overflow-hidden transition-transform duration-500 group-hover:translate-y-[-10px] shadow-2xl`}>
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                         <div className="w-full h-full flex flex-col items-center justify-center p-4">
                            <div className="text-[10px] font-mono text-white/40 mb-2">PROJECT_ID</div>
                            <div className="text-2xl font-mono text-white/80 tracking-tighter">0{index + 1}</div>
                            <div className="w-full h-[1px] bg-white/10 my-2"></div>
                            <span className="font-mono text-[8px] text-white/30 tracking-[0.2em] text-center">
                                {project.subtitle ? project.subtitle.split(' ')[0] : 'APP'}
                            </span>
                         </div>
                    </div>
                </div>

                {/* Zone Contenu */}
                <div className={`w-full md:w-5/12 flex flex-col ${isEven ? 'md:text-left items-start' : 'md:text-right items-end'} pt-4 md:pt-0 relative`}>
                    
                    {/* Ligne décorative reliée au contenu */}
                    <div className={`hidden md:block absolute top-0 ${isEven ? '-left-10' : '-right-10'} w-[1px] h-20 bg-gradient-to-b from-white/20 to-transparent`}></div>

                    {/* Header Technique */}
                    <div className={`flex items-center gap-4 mb-6 text-xs tracking-[0.2em] text-white/40 font-mono`}>
                        <span>N° {String(index + 1).padStart(2, '0')}</span>
                        <div className="w-12 h-[1px] bg-white/20"></div>
                        <span>{project.subtitle ? project.subtitle.toUpperCase() : 'PROJECT'}</span>
                    </div>

                    {/* Titre */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl mb-8 text-white font-normal leading-tight"
                        style={{ fontFamily: "'Nothing', sans-serif" }}>
                        {project.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm md:text-base text-white/60 leading-relaxed mb-10 max-w-md"
                       style={{ fontFamily: "'Emilio Thin', sans-serif" }}>
                        {project.description}
                    </p>

                    {/* Bouton custom Nothing OS */}
                    <div className={`flex items-center gap-3 group-hover:gap-6 transition-all duration-300`}>
                         <span className="text-xs tracking-[0.2em] text-white border border-white/20 px-6 py-3 bg-black hover:bg-white hover:text-black transition-colors duration-300 uppercase font-mono">
                            {language === 'fr' ? 'Voir le projet' : 'View Project'}
                         </span>
                         <div className="w-12 h-[1px] bg-white/40 group-hover:bg-white transition-colors duration-300"></div>
                    </div>

                </div>
            </div>
        </a>
    );
}
