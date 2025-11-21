import React from 'react';
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Education() {
    const { language } = useLanguage();
    const t = translations[language];
    const [sectionRef, isSectionVisible] = useScrollAnimation({ threshold: 0.1, once: true });

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

    const icons = [
        <img src="/RevenuQuebec.png" alt="Revenu Québec" className="w-8 h-8 object-contain grayscale group-hover:grayscale-0 transition-all" />,
        <img src="/RevenuQuebec.png" alt="Revenu Québec" className="w-8 h-8 object-contain grayscale group-hover:grayscale-0 transition-all" />,
        <img src="UL.png" alt="Universite Laval" className="w-8 h-8 object-contain grayscale group-hover:grayscale-0 transition-all" />,
        <img src="img_1.png" alt="Bell" className="w-8 h-8 object-contain grayscale group-hover:grayscale-0 transition-all" />,
        <img src="img_2.png" alt="IMACA" className="w-8 h-8 object-contain grayscale group-hover:grayscale-0 transition-all" />,
        <img src="img_2.png" alt="IMACA" className="w-8 h-8 object-contain grayscale group-hover:grayscale-0 transition-all" />,
    ];

    return (
        <section className="nothing-section" ref={sectionRef}>
            <div className="nothing-container">
                <div
                    className="text-center mb-24"
                    style={{
                        opacity: isSectionVisible ? 1 : 0,
                        transform: isSectionVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s ease-out'
                    }}>
                    <h1 className="font-display text-4xl md:text-6xl text-white mb-6 tracking-wider">
                        {t.education.title}<span className="text-[#D71921]">.</span>
                    </h1>
                </div>

                <div className="max-w-5xl mx-auto relative">
                    {/* Dotted Line */}
                    <div className="absolute left-[35px] top-0 bottom-0 w-[1px] border-l border-dotted border-white/20 hidden md:block"></div>

                    <div className="space-y-12">
                        {timelineItems.map((item, index) => (
                            <div
                                key={index}
                                className="group relative md:pl-24 transition-all duration-500"
                                style={{
                                    opacity: isSectionVisible ? 1 : 0,
                                    transform: isSectionVisible ? 'translateY(0)' : 'translateY(20px)',
                                    transitionDelay: `${index * 0.1}s`
                                }}>

                                {/* Connector Dot */}
                                <div className="absolute left-[31px] top-8 w-[9px] h-[9px] bg-black border border-white/40 hidden md:block z-10 group-hover:bg-[#D71921] group-hover:border-[#D71921] transition-all duration-300 rounded-full"></div>

                                <div className="relative bg-black/40 border border-white/10 p-6 md:p-8 backdrop-blur-sm hover:border-white/30 transition-all duration-300">
                                    {/* Corner Accents */}
                                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20"></div>
                                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20"></div>

                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
                                        {/* Date & Icon */}
                                        <div className="flex items-center gap-5 w-full md:w-auto md:min-w-[240px]">
                                            <div className="w-16 h-16 flex items-center justify-center bg-white/5 border border-white/10 rounded-full group-hover:border-white/30 transition-colors">
                                                {icons[index]}
                                            </div>
                                            <div className="flex-1 md:flex-none">
                                                <div className="text-xs font-mono text-[#D71921] tracking-widest mb-1">
                                                    {item.date}
                                                </div>
                                                <div className="w-12 h-[1px] bg-white/10"></div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <h3 className="text-xl md:text-2xl text-white mb-2 font-display tracking-wide">
                                                {item.title.split('\n').map((line, i) => (
                                                    <React.Fragment key={i}>
                                                        {line}
                                                        {i < item.title.split('\n').length - 1 && <br />}
                                                    </React.Fragment>
                                                ))}
                                            </h3>
                                            <p className="text-sm text-zinc-400 font-mono uppercase tracking-wide mb-4">
                                                {item.location}
                                            </p>
                                            {item.certificate && (
                                                <button
                                                    onClick={() => window.open(item.certificate)}
                                                    className="inline-flex items-center gap-2 text-xs tracking-widest border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all duration-300 uppercase font-mono">
                                                    {language === 'fr' ? 'Certificat' : 'Certificate'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
