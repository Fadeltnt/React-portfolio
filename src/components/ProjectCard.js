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
            className="block group"
            ref={ref}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`
            }}>
            
            {/* Carte principale avec layout moodboard */}
            <div 
                className="relative transition-all duration-300 group-active:bg-[#2C2C2E] md:group-hover:bg-[#2C2C2E] hover-lift"
                style={{
                    background: '#1C1C1E',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                {/* Indicateur gauche */}
                <div 
                    className="absolute left-0 top-0 bottom-0 bg-white opacity-0 group-active:opacity-100 md:group-hover:opacity-100 transition-opacity duration-300"
                    style={{width: '2px'}}
                ></div>

                {/* Mobile: Layout vertical empilé */}
                <div className="flex flex-col md:hidden">
                    {/* Header mobile avec numéro et tech */}
                    <div className="flex items-center justify-between p-4 border-b"
                        style={{borderColor: 'rgba(255, 255, 255, 0.08)'}}>
                        <div 
                            className="text-xs text-white opacity-40"
                            style={{
                                fontFamily: "'Nothing', monospace",
                                letterSpacing: '0.15em'
                            }}>
                            {String(index + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
                        </div>
                        <div 
                            className="text-xs text-white opacity-50 uppercase"
                            style={{
                                fontFamily: "'Nothing', monospace",
                                letterSpacing: '0.12em'
                            }}>
                            {project.subtitle}
                        </div>
                    </div>

                    {/* Image principale mobile - pleine largeur */}
                    <div 
                        className="relative w-full overflow-hidden"
                        style={{
                            height: '280px',
                            background: '#000000'
                        }}>
                        <img
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-active:scale-105"
                            src={getImagePath(project.image)}
                            onError={(e) => {
                                e.target.src = project.image;
                            }}
                        />
                    </div>

                    {/* Contenu mobile */}
                    <div className="p-6 space-y-4">
                        <h2 
                            className="text-2xl text-white"
                            style={{
                                fontFamily: "'Nothing', monospace",
                                letterSpacing: '0.05em',
                                lineHeight: '1.2'
                            }}>
                            {project.title}
                        </h2>
                        
                        <p 
                            className="text-sm text-white opacity-70 leading-relaxed"
                            style={{
                                fontFamily: "'Emilio Thin', sans-serif",
                                fontWeight: 100,
                                letterSpacing: '0.02em'
                            }}>
                            {project.description}
                        </p>

                        {/* Lien mobile */}
                        <div className="flex items-center gap-3 pt-4"
                            style={{
                                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                            }}>
                            <span 
                                className="text-xs text-white opacity-60"
                                style={{
                                    fontFamily: "'Nothing', monospace",
                                    letterSpacing: '0.1em'
                                }}>
                                {language === 'fr' ? 'VOIR LE PROJET' : 'VIEW PROJECT'}
                            </span>
                            <svg 
                                className="w-4 h-4 text-white opacity-60" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Desktop: Layout horizontal asymétrique */}
                <div className={`hidden md:flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 p-8 lg:p-12`}>
                    {/* Section images - Moodboard */}
                    <div className={`flex-1 ${isEven ? 'lg:pr-8' : 'lg:pl-8'}`}>
                        <div className="grid grid-cols-2 gap-3 h-full">
                            {/* Image principale - grande */}
                            <div 
                                className="col-span-2 row-span-2 relative overflow-hidden"
                                style={{
                                    minHeight: '400px',
                                    background: '#000000',
                                    border: '1px solid rgba(255, 255, 255, 0.08)'
                                }}>
                                <img
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    src={getImagePath(project.image)}
                                    onError={(e) => {
                                        e.target.src = project.image;
                                    }}
                                />
                            </div>
                            
                            {/* Images secondaires - petites */}
                            <div 
                                className="relative overflow-hidden"
                                style={{
                                    minHeight: '180px',
                                    background: '#000000',
                                    border: '1px solid rgba(255, 255, 255, 0.08)'
                                }}>
                                <div className="w-full h-full bg-gradient-to-br from-[#1C1C1E] to-[#000000] flex items-center justify-center">
                                    <div 
                                        className="text-xs text-white opacity-30"
                                        style={{
                                            fontFamily: "'Nothing', monospace",
                                            letterSpacing: '0.15em'
                                        }}>
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                </div>
                            </div>
                            
                            <div 
                                className="relative overflow-hidden"
                                style={{
                                    minHeight: '180px',
                                    background: '#000000',
                                    border: '1px solid rgba(255, 255, 255, 0.08)'
                                }}>
                                <div className="w-full h-full bg-gradient-to-br from-[#000000] to-[#1C1C1E] flex items-center justify-center">
                                    <div 
                                        className="text-xs text-white opacity-20"
                                        style={{
                                            fontFamily: "'Nothing', monospace",
                                            letterSpacing: '0.15em'
                                        }}>
                                        {project.subtitle.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section contenu - Informations */}
                    <div className={`flex-1 flex flex-col justify-between ${isEven ? 'lg:pl-8 lg:border-l' : 'lg:pr-8 lg:border-r'}`}
                        style={{borderColor: 'rgba(255, 255, 255, 0.08)'}}>
                        <div>
                            <div 
                                className="text-xs mb-4 text-white opacity-40"
                                style={{
                                    fontFamily: "'Nothing', monospace",
                                    letterSpacing: '0.15em'
                                }}>
                                {String(index + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
                            </div>
                            
                            <div 
                                className="text-xs mb-3 text-white opacity-50 uppercase"
                                style={{
                                    fontFamily: "'Nothing', monospace",
                                    letterSpacing: '0.12em'
                                }}>
                                {project.subtitle}
                            </div>
                            
                            <h2 
                                className="text-3xl mb-6 text-white group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    fontFamily: "'Nothing', monospace",
                                    letterSpacing: '0.05em',
                                    opacity: 0.9,
                                    lineHeight: '1.2'
                                }}>
                                {project.title}
                            </h2>
                            
                            <p 
                                className="text-base mb-8 text-white opacity-70 leading-relaxed"
                                style={{
                                    fontFamily: "'Emilio Thin', sans-serif",
                                    fontWeight: 100,
                                    letterSpacing: '0.02em'
                                }}>
                                {project.description}
                            </p>
                        </div>

                        {/* Lien vers le projet */}
                        <div className="flex items-center gap-3 pt-6"
                            style={{
                                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                            }}>
                            <span 
                                className="text-sm text-white opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    fontFamily: "'Nothing', monospace",
                                    letterSpacing: '0.1em'
                                }}>
                                {language === 'fr' ? 'VOIR LE PROJET' : 'VIEW PROJECT'}
                            </span>
                            <svg 
                                className="w-5 h-5 text-white opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}

