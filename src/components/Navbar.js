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
        <header className="fixed w-full top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md transition-all duration-300">
            <div className="container mx-auto flex flex-wrap p-4 sm:p-6 flex-col md:flex-row items-center justify-between">
                {/* Logo */}
                <a
                    href="#about"
                    className="font-display text-2xl md:text-3xl text-white tracking-widest hover:opacity-80 transition-opacity"
                    onClick={closeMenu}>
                    FADEL TINTO<span className="nothing-red-dot"></span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex md:mr-auto md:ml-8 md:py-1 md:pl-8 items-center text-sm justify-center tracking-widest border-l border-white/10 nothing-font">
                    <a href="#projects" className="mr-8 text-zinc-400 hover:text-white transition-colors duration-200">
                        {t.nav.pastWork}
                    </a>
                    <a href="#skills" className="mr-8 text-zinc-400 hover:text-white transition-colors duration-200">
                        {t.nav.skills}
                    </a>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-6">
                    <button
                        onClick={toggleLanguage}
                        className="text-zinc-400 hover:text-white transition-colors duration-200 text-sm tracking-widest nothing-font">
                        {language === 'fr' ? 'EN' : 'FR'}
                    </button>
                    <a
                        href="#contact"
                        className="nothing-button text-xs">
                        {t.nav.contactMe}
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-white hover:text-zinc-300 transition-colors p-2"
                    aria-label="Toggle menu">
                    {isMenuOpen ? (
                        <XIcon className="w-6 h-6" />
                    ) : (
                        <MenuIcon className="w-6 h-6" />
                    )}
                </button>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden w-full mt-4 pb-4 border-t border-white/10 pt-4 animate-fade-in">
                        <nav className="flex flex-col space-y-4 nothing-font">
                            <a
                                href="#projects"
                                className="text-sm text-zinc-400 hover:text-white tracking-widest"
                                onClick={closeMenu}>
                                {t.nav.pastWork}
                            </a>
                            <a
                                href="#skills"
                                className="text-sm text-zinc-400 hover:text-white tracking-widest"
                                onClick={closeMenu}>
                                {t.nav.skills}
                            </a>
                        </nav>
                        <div className="flex items-center justify-between pt-6 mt-2 border-t border-white/5">
                            <button
                                onClick={() => {
                                    toggleLanguage();
                                    closeMenu();
                                }}
                                className="text-sm text-zinc-400 hover:text-white tracking-widest nothing-font">
                                {language === 'fr' ? 'EN' : 'FR'}
                            </button>
                            <a
                                href="#contact"
                                className="nothing-button text-xs px-4 py-2"
                                onClick={closeMenu}>
                                {t.nav.contactMe}
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}