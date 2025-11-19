// src/components/Navbar.js

import { ArrowRightIcon, MenuIcon, XIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";

export default function Navbar() {
    const { language, toggleLanguage } = useLanguage();
    const t = translations[language];
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-black/80 backdrop-blur-md md:sticky top-0 z-50 sharp transition-all duration-300" style={{borderBottom: '1px solid rgba(255, 255, 255, 0.08)'}}>
            <div className="container mx-auto flex flex-wrap p-4 sm:p-6 flex-col md:flex-row items-center justify-between">
                {/* Logo */}
                <a 
                    href="#about" 
                    className="title-font font-medium text-white mb-0 text-lg sm:text-xl tracking-widest hover:text-opacity-70 transition-all duration-200 md:mb-0" 
                    style={{fontFamily: "'Nothing', monospace"}}
                    onClick={closeMenu}>
                    FADEL TINTO
                </a>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex md:mr-auto md:ml-8 md:py-1 md:pl-8 items-center text-sm justify-center tracking-widest" style={{borderLeft: '1px solid rgba(255, 255, 255, 0.12)', fontFamily: "'Nothing', monospace"}}>
                    <a href="#projects" className="mr-8 text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-all duration-200">
                        {t.nav.pastWork}
                    </a>
                    <a href="#skills" className="mr-8 text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-all duration-200">
                        {t.nav.skills}
                    </a>
                </nav>
                
                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={toggleLanguage}
                        className="text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-all duration-200 text-sm tracking-widest"
                        style={{fontFamily: "'Nothing', monospace"}}>
                        {language === 'fr' ? 'EN' : 'FR'}
                    </button>
                    <a
                        href="#contact"
                        className="inline-flex items-center nothing-button text-sm"
                        style={{fontFamily: "'Nothing', monospace"}}>
                        {t.nav.contactMe}
                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-white text-opacity-70 hover:text-white transition-all duration-200 p-2"
                    aria-label="Toggle menu">
                    {isMenuOpen ? (
                        <XIcon className="w-6 h-6" />
                    ) : (
                        <MenuIcon className="w-6 h-6" />
                    )}
                </button>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div 
                        className="md:hidden w-full mt-4 pb-4 space-y-4"
                        style={{
                            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                            paddingTop: '1rem'
                        }}>
                        <nav className="flex flex-col space-y-3" style={{fontFamily: "'Nothing', monospace"}}>
                            <a 
                                href="#projects" 
                                className="text-sm text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-all duration-200 tracking-widest py-2"
                                onClick={closeMenu}>
                                {t.nav.pastWork}
                            </a>
                            <a 
                                href="#skills" 
                                className="text-sm text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-all duration-200 tracking-widest py-2"
                                onClick={closeMenu}>
                                {t.nav.skills}
                            </a>
                        </nav>
                        <div className="flex items-center justify-between pt-2" style={{borderTop: '1px solid rgba(255, 255, 255, 0.08)'}}>
                            <button
                                onClick={() => {
                                    toggleLanguage();
                                    closeMenu();
                                }}
                                className="text-sm text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-all duration-200 tracking-widest"
                                style={{fontFamily: "'Nothing', monospace"}}>
                                {language === 'fr' ? 'EN' : 'FR'}
                            </button>
                            <a
                                href="#contact"
                                className="inline-flex items-center nothing-button text-xs sm:text-sm px-4 py-2"
                                style={{fontFamily: "'Nothing', monospace"}}
                                onClick={closeMenu}>
                                {t.nav.contactMe}
                                <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}