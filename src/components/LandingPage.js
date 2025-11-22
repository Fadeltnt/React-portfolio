import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    React.useLayoutEffect(() => {
        document.body.style.backgroundColor = '#000000';
    }, []);

    return (
        <div className="flex flex-col md:flex-row h-screen w-full">
            {/* Software Engineer Side */}
            <Link
                to="/software"
                className="group relative flex-1 w-full md:w-auto h-1/2 md:h-full bg-black flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/20"
            >
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:30px_30px] opacity-50"></div>
                <div className="relative z-10 text-center transition-transform duration-500 group-hover:scale-105">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-['Space_Grotesk']">
                        SOFTWARE<br />ENGINEER
                    </h2>
                    <div className="w-2 h-2 bg-[#D71921] rounded-full mx-auto mt-4 shadow-[0_0_10px_rgba(215,25,33,0.8)]"></div>
                    <p className="mt-6 text-zinc-400 font-['Space_Grotesk'] tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                        NOTHING INSPIRED
                    </p>
                </div>
            </Link>

            {/* Photographer Side */}
            <Link
                to="/photography"
                className="group relative flex-1 w-full md:w-auto h-1/2 md:h-full bg-white flex items-center justify-center overflow-hidden"
            >
                <div className="relative z-10 text-center transition-transform duration-500 group-hover:scale-105">
                    <h2 className="text-4xl md:text-6xl font-bold text-black mb-4 font-['Space_Grotesk']">
                        PHOTOGRAPHER
                    </h2>
                    <div className="w-16 h-1 bg-black mx-auto mt-4"></div>
                    <p className="mt-6 text-zinc-600 font-['Space_Grotesk'] tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                        EDITORIAL & ART
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default LandingPage;
