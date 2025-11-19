import React from 'react';
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Education() {
    const { language } = useLanguage();
    const t = translations[language];
    const [sectionRef, isSectionVisible] = useScrollAnimation({ threshold: 0.1, once: true });
    
    // Timeline items data
    const timelineItems = [
        {
            date: language === 'fr' ? "Mai 2025 - Aujourd'hui" : "May 2025 - Present",
            title: language === 'fr' ? "Analyste programmeur\nEmploi étudiant" : "Programmer Analyst\nStudent Job",
            location: language === 'fr' ? "Revenu Québec, Québec" : "Revenu Québec, Quebec",
        },
        {
            date: language === 'fr' ? "Jan 2025 - Avr 2025" : "Jan 2025 - Apr 2025",
            title: language === 'fr' ? "Analyste programmeur\nStage" : "Programmer Analyst\nInternship",
            location: language === 'fr' ? "Revenu Québec, Québec" : "Revenu Québec, Quebec",
        },
        {
            date: "Jan 2022 - Present",
            title: language === 'fr' ? "Baccalauréat en génie logiciel" : "Bachelor of Software Engineer",
            location: "Universite Laval, Quebec",
        },
        {
            date: "July 2024",
            title: language === 'fr' ? "Ambassadeur de marque" : "Brand ambassador",
            location: "Bell, Quebec",
        },
        {
            date: "Jun 2024",
            title: "MICRO-WIL\nAWS Introduction",
            location: "Canadian Mobility and Aerospace Institute",
            certificate: "Attestation micro stage Aws.pdf",
        },
        {
            date: "July 2024",
            title: "MICRO-WIL\nIntroduction to Artificial Intelligence",
            location: "Canadian Mobility and Aerospace Institute",
            certificate: "Attestation IA.pdf",
        },
    ];

    // Icons corresponding to each timeline item
    const icons = [
        <img src="/RevenuQuebec.png" alt="Revenu Québec" className="w-8 h-8 object-contain"/>,
        <img src="/RevenuQuebec.png" alt="Revenu Québec" className="w-8 h-8 object-contain"/>,
        <img src="UL.png" alt="Universite Laval" className="w-8 h-8 object-contain"/>,
        <img src="img_1.png" alt="Bell" className="w-8 h-8 object-contain"/>,
        <img src="img_2.png" alt="IMACA" className="w-8 h-8 object-contain"/>,
        <img src="img_2.png" alt="IMACA" className="w-8 h-8 object-contain"/>,
    ];

    return (
        <section className="nothing-section" ref={sectionRef}>
            <div className="nothing-container">
                <div 
                    className="text-center mb-16 nothing-fade-in"
                    style={{
                        opacity: isSectionVisible ? 1 : 0,
                        transform: isSectionVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s ease-out'
                    }}>
                    <h1 className="nothing-title mb-4 text-white">
                        {t.education.title}
                    </h1>
                </div>
                
                {/* Design Nothing Essential Apps - Cartes modernes */}
                <div className="max-w-5xl mx-auto space-y-3 sm:space-y-4">
                    {timelineItems.map((item, index) => (
                        <div
                            key={index}
                            className="group nothing-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}>
                            <div
                                className="relative transition-all duration-300 group-active:bg-[#2C2C2E] md:group-hover:bg-[#2C2C2E]"
                                style={{
                                    background: '#1C1C1E',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                }}>
                                {/* Indicateur gauche */}
                                <div 
                                    className="absolute left-0 top-0 bottom-0 bg-white opacity-0 group-active:opacity-100 md:group-hover:opacity-100 transition-opacity duration-300"
                                    style={{width: '2px'}}
                                ></div>
                                
                                {/* Mobile: Layout vertical compact */}
                                <div className="flex flex-col md:flex-row items-start md:items-center p-5 sm:p-8 gap-5 sm:gap-8">
                                    {/* Date et icône */}
                                    <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto md:min-w-[220px]">
                                        <div 
                                            className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center flex-shrink-0 p-2"
                                            style={{
                                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                                background: '#000000'
                                            }}>
                                            {icons[index]}
                                        </div>
                                        <div className="flex-1 md:flex-none">
                                            <div 
                                                className="text-[10px] sm:text-xs text-white opacity-50"
                                                style={{
                                                    fontFamily: "'Nothing', monospace",
                                                    letterSpacing: '0.12em',
                                                    lineHeight: '1.5'
                                                }}>
                                                {item.date}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Contenu principal */}
                                    <div className="flex-1 w-full md:w-auto">
                                        <h3 
                                            className="text-base sm:text-lg mb-2 text-white group-active:opacity-100 md:group-hover:opacity-100 transition-opacity duration-300"
                                            style={{
                                                fontFamily: "'Nothing', monospace",
                                                letterSpacing: '0.05em',
                                                opacity: 0.9,
                                                lineHeight: '1.3'
                                            }}>
                                            {item.title.split('\n').map((line, i) => (
                                                <React.Fragment key={i}>
                                                    {line}
                                                    {i < item.title.split('\n').length - 1 && <br />}
                                                </React.Fragment>
                                            ))}
                                        </h3>
                                        <p 
                                            className="text-xs sm:text-sm text-white opacity-60 mb-3"
                                            style={{
                                                fontFamily: "'Emilio Thin', sans-serif",
                                                fontWeight: 100
                                            }}>
                                            {item.location}
                                        </p>
                                        {item.certificate && (
                                            <button
                                                onClick={() => window.open(item.certificate)}
                                                className="mt-2 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs transition-all duration-300"
                                                style={{
                                                    background: 'transparent',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    color: 'white',
                                                    fontFamily: "'Nothing', monospace",
                                                    letterSpacing: '0.05em'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.background = 'transparent';
                                                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                                }}
                                                onTouchStart={(e) => {
                                                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                                                }}
                                                onTouchEnd={(e) => {
                                                    e.target.style.background = 'transparent';
                                                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                                }}>
                                                {language === 'fr' ? 'TÉLÉCHARGER LE CERTIFICAT' : 'DOWNLOAD CERTIFICATE'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}