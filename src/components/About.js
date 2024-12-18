import React from 'react';

export default function About() {
    return (
        <section id="about">
            <div className="container mx-auto flex px-10 py-20 md:flex-row flex-col items-center">
                <div
                    className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                        Hi, I'm Fadel
                        <br className="hidden lg:inline-block"/> Software Engineer student.
                    </h1>
                    <p className="mb-8 leading-relaxed">
                        I’m a third-year student at Université Laval, a nerd with a love for manga and video games, and
                        I’m passionate about web development.I enjoy crafting elegant and efficient solutions to complex
                        problems. Explore my work to discover more about my skills and achievements.
                    </p>
                    <div className="flex justify-center">
                        <a
                            href="/Fadel_Tinto_CV.pdf"  // Update with your CV file name
                            download="Fadel_Tinto_CV.pdf"  // This attribute triggers the download
                            className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">
                            My CV
                        </a>
                        <a
                            href="#projects"
                            className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
                            See My Past Work
                        </a>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <img
                        className="object-cover object-center rounded hidden md:block"
                        alt="hero"
                        src="/IMG_9182.jpg"
                    />
                </div>
            </div>
        </section>
    );
}