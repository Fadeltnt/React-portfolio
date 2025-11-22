import React from 'react';
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Stats from "./components/Stats";
import CustomCursor from "./components/CustomCursor";
import Education from "./components/Education";

export default function SoftwarePortfolio() {
    React.useLayoutEffect(() => {
        document.body.style.backgroundColor = '#000000';
    }, []);

    return (
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
    );
}
