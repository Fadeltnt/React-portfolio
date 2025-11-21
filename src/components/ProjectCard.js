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
            target="_blank"
            rel="noopener noreferrer"
            className="block group relative mb-32 last:mb-0"
            ref={ref}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
            }}>

            <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}>

                {/* Image Section */}
                <div className="w-full md:w-7/12 relative">
                    {/* Wireframe Box */}
                    <div className="relative border border-white/20 bg-black/50 p-2 group-hover:border-white/50 transition-colors duration-500">
                        {/* Corner Accents */}
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-white/50"></div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-white/50"></div>
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-white/50"></div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-white/50"></div>

                        {/* Main Image */}
                        <div className="relative overflow-hidden aspect-[16/10] bg-[#111]">
                            <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay"></div>
                            <img
                                alt={project.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                src={getImagePath(project.image)}
                                onError={(e) => {
                                    e.target.src = project.image;
                                }}
                            />

                            {/* Technical Overlay */}
                            <div className="absolute top-4 right-4 z-20 flex flex-col items-end">
                                <span className="text-[10px] font-mono tracking-widest text-white bg-black/50 px-2 py-1 backdrop-blur-sm border border-white/10">
                                    IMG.0{index + 1}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className={`w-full md:w-5/12 flex flex-col ${isEven ? 'md:text-left items-start' : 'md:text-right items-end'}`}>

                    {/* Project Number */}
                    <div className="flex items-center gap-3 mb-4 text-xs tracking-[0.2em] text-[#D71921] font-mono">
                        <span>N° {String(index + 1).padStart(2, '0')}</span>
                        <div className="w-8 h-[1px] bg-[#D71921]"></div>
                    </div>

                    {/* Title - MHTIROGLA */}
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6 text-white group-hover:text-white/90 transition-colors tracking-wide">
                        {project.title}
                    </h2>

                    {/* Description - Emilio Thin */}
                    <p className="font-body text-sm md:text-base mb-8 max-w-md leading-relaxed opacity-80">
                        {project.description}
                    </p>

                    {/* Tags/Subtitle */}
                    <div className="flex flex-wrap gap-2 mb-8 justify-end">
                        {project.subtitle && project.subtitle.split(',').map((tag, i) => (
                            <span key={i} className="text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 text-zinc-400 font-mono">
                                {tag.trim()}
                            </span>
                        ))}
                    </div>

                    {/* Button */}
                    <div className="nothing-button group-hover:bg-white group-hover:text-black font-mono">
                        {language === 'fr' ? 'Voir le projet' : 'View Project'}
                    </div>

                </div>
            </div>
        </a>
    );
}
