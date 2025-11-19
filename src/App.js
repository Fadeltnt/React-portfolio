// src/App.js
import React from 'react';
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Stats from "./components/Stats";
import CustomCursor from "./components/CustomCursor";
import "./App.css"
import Education from "./components/Education";
import { LanguageProvider } from "./contexts/LanguageContext";

export default function App() {
    return (
        <LanguageProvider>
            <main className="bg-black text-white">
                <CustomCursor />
                <Navbar />
                <About />
                <Stats />
                <Projects />
                <Skills />
                <Education />
                <Contact />
            </main>
        </LanguageProvider>
    );
}