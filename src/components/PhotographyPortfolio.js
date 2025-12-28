import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

import twisty1 from '../Assets/Image Portfolio/Twisty/1.JPG';
import twisty2 from '../Assets/Image Portfolio/Twisty/2.JPG';
import twisty3 from '../Assets/Image Portfolio/Twisty/3.JPG';
import twisty4 from '../Assets/Image Portfolio/Twisty/4.jpg';
import twisty5 from '../Assets/Image Portfolio/Twisty/5.JPG';

import agadir1 from '../Assets/Image Portfolio/Agadir/1.JPG';
import agadir2 from '../Assets/Image Portfolio/Agadir/2.jpg';
import agadir3 from '../Assets/Image Portfolio/Agadir/3.JPG';

const projects = [
    {
        id: 1,
        title: "TWISTY",
        subtitle: "Streetwear Burkinabè : La Nouvelle Vague.",
        description: "Collaboration avec une marque jeune et émergente, capturant l'essence urbaine et l'audace de la jeunesse burkinabè.",
        images: [
            { src: twisty1, span: "col-span-2 md:col-span-2" }, // Landscape
            { src: twisty2, span: "" },
            { src: twisty3, span: "" },
            { src: twisty4, span: "" },
            { src: twisty5, span: "" }
        ],
        layout: "grid-cols-2 md:grid-cols-2 lg:grid-cols-3",
        colors: ["#000000", "#FFFFFF", "#FF4500"] // Black, White, Orange-Red
    },
    {
        id: 2,
        title: "AGADIR",
        subtitle: "Lumières et textures du Maroc.",
        description: "Une exploration visuelle entre terre et mer, capturant l'atmosphère unique de la côte marocaine.",
        images: [
            { src: agadir1, span: "col-span-2 md:col-span-2" },
            { src: agadir2, span: "" },
            { src: agadir3, span: "col-span-1 md:col-span-3" }
        ],
        layout: "grid-cols-2 md:grid-cols-2 lg:grid-cols-3",
        colors: ["#C2B280", "#006994", "#E09540"] // Sand, Sea Blue, Terracotta
    }
];

const PhotographyPortfolio = () => {
    const { theme, toggleTheme } = useTheme();

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [activeProject, setActiveProject] = React.useState(null);
    const [activeIndex, setActiveIndex] = React.useState(0);

    const openImage = (project, index) => {
        setActiveProject(project);
        setActiveIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeImage = () => {
        setActiveProject(null);
        setActiveIndex(0);
        document.body.style.overflow = 'auto';
    };

    const showNext = (e) => {
        if (e) e.stopPropagation();
        if (activeProject) {
            setActiveIndex((prev) => (prev + 1) % activeProject.images.length);
        }
    };

    const showPrev = (e) => {
        if (e) e.stopPropagation();
        if (activeProject) {
            setActiveIndex((prev) => (prev - 1 + activeProject.images.length) % activeProject.images.length);
        }
    };

    // Swipe Navigation
    const [touchStart, setTouchStart] = React.useState(null);
    const [touchEnd, setTouchEnd] = React.useState(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) {
            showNext();
        } else if (isRightSwipe) {
            showPrev();
        }
    };

    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (!activeProject) return;

            if (e.key === 'ArrowRight') {
                setActiveIndex((prev) => (prev + 1) % activeProject.images.length);
            } else if (e.key === 'ArrowLeft') {
                setActiveIndex((prev) => (prev - 1 + activeProject.images.length) % activeProject.images.length);
            } else if (e.key === 'Escape') {
                closeImage();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeProject]);

    // Removed direct body style manipulation in favor of Tailwind dark mode classes
    React.useEffect(() => {
        // Clean up or simple init if needed
    }, []);

    function encode(data) {
        return Object.keys(data)
            .map(
                (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
            )
            .join("&");
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact", name, email, message }),
        })
            .then(() => {
                alert("Message sent!");
                setName("");
                setEmail("");
                setMessage("");
            })
            .catch((error) => alert(error));
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-['Emilio_Thin'] selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 bg-white/90 dark:bg-black/90 backdrop-blur-sm transition-colors duration-500">
                <Link to="/" className="text-xl font-bold tracking-tighter hover:opacity-50 transition-opacity">
                    FADEL TINTO
                </Link>
                <div className="flex items-center gap-6 text-sm font-medium tracking-widest uppercase">
                    <button
                        onClick={toggleTheme}
                        className="hover:opacity-50 transition-opacity"
                    >
                        {theme === 'dark' ? 'Light' : 'Dark'}
                    </button>
                    <a href="#work" className="hover:line-through decoration-1">Work</a>
                    <a href="#about" className="hover:line-through decoration-1">About</a>
                    <a href="#contact" className="hover:line-through decoration-1">Contact</a>
                </div>
            </nav>

            {/* Hero Section */}
            <header id="about" className="flex flex-col justify-center items-center px-6 pt-40 pb-20">
                <p className="text-2xl md:text-4xl leading-relaxed text-center max-w-4xl font-['Emilio_Thin']">
                    Vibe Photographer from Ouagadougou, Burkina Faso.
                    <br />
                    Passionate about capturing the raw energy and untold stories of my environment.
                </p>
            </header>

            {/* Projects Section */}
            <section id="work" className="px-6 pb-24">
                {projects.map((project, index) => (
                    <div key={project.id} className="mb-32 last:mb-0">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-t border-black dark:border-white pt-6 transition-colors duration-500">
                            <div>
                                <span className="block text-sm font-bold mb-2">0{index + 1} / PROJECT</span>
                                <h2 className="text-5xl md:text-7xl font-['Emilio_Thin'] font-thin uppercase tracking-tight mb-2 text-outline-transparent dark:text-outline-transparent transition-colors duration-500">
                                    {project.title}
                                </h2>
                                <div className="flex gap-2 mt-4">
                                    {project.colors && project.colors.map((color, i) => (
                                        <div key={i} className="w-4 h-4 rounded-full border border-black/10 dark:border-white/10" style={{ backgroundColor: color }}></div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-6 md:mt-0 max-w-md text-right md:text-left">
                                <p className="text-xl font-medium mb-1">{project.subtitle}</p>
                                <p className="text-zinc-500 font-['Inter']">{project.description}</p>
                            </div>
                        </div>

                        <div className={`grid gap-4 ${project.layout}`}>
                            {project.images.map((img, i) => {
                                const isObject = typeof img === 'object' && img !== null;
                                const src = isObject ? img.src : img;
                                const spanClass = isObject ? img.span : (i === 0 && project.layout.includes('grid-cols-3') ? 'md:col-span-2' : '');

                                return (
                                    <div
                                        key={i}
                                        className={`relative overflow-hidden group ${spanClass} cursor-pointer`}
                                        onClick={() => openImage(project, i)}
                                    >
                                        <img
                                            src={src}
                                            alt={`${project.title} shot ${i + 1}`}
                                            className="w-full h-[40vh] md:h-[60vh] object-cover transition-all duration-700 ease-out hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 px-6 border-t border-black dark:border-white transition-colors duration-500">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-5xl md:text-7xl font-['Emilio_Thin'] font-thin uppercase tracking-tight mb-12 text-center">
                        LET'S CREATE
                    </h2>

                    <form
                        name="contact"
                        method="POST"
                        data-netlify="true"
                        onSubmit={handleSubmit}
                        className="space-y-8"
                    >
                        <input type="hidden" name="form-name" value="contact" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-transparent border-b border-black dark:border-white py-2 focus:outline-none focus:border-zinc-400 transition-colors font-['Inter']"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent border-b border-black dark:border-white py-2 focus:outline-none focus:border-zinc-400 transition-colors font-['Inter']"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows="4"
                                className="w-full bg-transparent border-b border-black dark:border-white py-2 focus:outline-none focus:border-zinc-400 transition-colors resize-none font-['Inter']"
                                placeholder="Tell me about your project..."
                                required
                            ></textarea>
                        </div>

                        <div className="text-center pt-8">
                            <button
                                type="submit"
                                className="inline-block px-12 py-4 border border-black dark:border-white text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>

                    <div className="mt-24 flex flex-col md:flex-row justify-between items-center text-sm uppercase tracking-widest text-zinc-500">
                        <div className="flex gap-8 mb-8 md:mb-0">
                            <a
                                href="https://www.instagram.com/bizzareshots/?igsh=Z3B6dWNmcTg0NzZj&utm_source=qr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-black transition-colors"
                            >
                                Instagram
                            </a>
                        </div>
                        <div>
                            © {new Date().getFullYear()} Fadel Tinto
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {/* Lightbox Modal */}
            {activeProject && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
                    onClick={closeImage}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <button
                        className="absolute top-6 right-6 text-white hover:text-zinc-300 transition-colors z-50"
                        onClick={closeImage}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Previous Button */}
                    <button
                        className="absolute left-4 md:left-8 text-white hover:text-zinc-300 transition-colors z-50 p-4"
                        onClick={showPrev}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Next Button */}
                    <button
                        className="absolute right-4 md:right-8 text-white hover:text-zinc-300 transition-colors z-50 p-4"
                        onClick={showNext}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <img
                        src={typeof activeProject.images[activeIndex] === 'object' ? activeProject.images[activeIndex].src : activeProject.images[activeIndex]}
                        alt={`View ${activeIndex + 1}`}
                        className="max-w-full max-h-[90vh] object-contain cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    />

                    <div className="absolute bottom-6 left-0 right-0 text-center text-white/50 text-sm tracking-widest font-['Inter'] pointer-events-none">
                        {activeIndex + 1} / {activeProject.images.length}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotographyPortfolio;
