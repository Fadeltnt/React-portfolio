import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";

export default function Contact() {
    const { language } = useLanguage();
    const t = translations[language];
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");

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
            .then(() => alert(language === 'fr' ? "Message envoyé !" : "Message sent!"))
            .catch((error) => alert(error));
    }

    return (
        <section id="contact" className="nothing-section">
            <div className="nothing-container flex flex-col lg:flex-row gap-6 sm:gap-8">
                {/* Carte avec carte - Mobile: pleine largeur, Desktop: 2/3 */}
                <div className="w-full lg:w-2/3 nothing-card overflow-hidden flex items-end justify-start relative min-h-[280px] sm:min-h-[400px] sharp">
                    <iframe
                        width="100%"
                        height="100%"
                        title="map"
                        className="absolute inset-0"
                        frameBorder={0}
                        marginHeight={0}
                        marginWidth={0}
                        style={{filter: "opacity(0.3) grayscale(100%)"}}
                        src="https://www.google.com/maps/embed/v1/place?q=Sainte+Foy+Quebec&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                    />
                    <div className="bg-black relative flex flex-col sm:flex-row flex-wrap py-4 sm:py-6 w-full sharp" style={{border: '1px solid rgba(255, 255, 255, 0.12)'}}>
                        <div className="w-full sm:w-1/2 px-4 sm:px-6 mb-4 sm:mb-0">
                            <h2 
                                className="font-medium text-white tracking-widest text-[10px] sm:text-xs mb-2"
                                style={{
                                    fontFamily: "'Nothing', monospace",
                                    letterSpacing: '0.1em'
                                }}>
                                {t.contact.address}
                            </h2>
                            <p 
                                className="text-white text-opacity-70 text-xs sm:text-sm"
                                style={{
                                    fontFamily: "'Emilio Thin', sans-serif",
                                    fontWeight: 100
                                }}>
                                Chemin Sainte Foy. <br/>
                                Quebec, QC
                            </p>
                        </div>
                        <div className="w-full sm:w-1/2 px-4 sm:px-6">
                            <h2 
                                className="font-medium text-white tracking-widest text-[10px] sm:text-xs mb-2"
                                style={{
                                    fontFamily: "'Nothing', monospace",
                                    letterSpacing: '0.1em'
                                }}>
                                {t.contact.email}
                            </h2>
                            <a 
                                href="mailto:fadeltinto@gmail.com" 
                                className="text-white text-opacity-80 hover:text-white hover:text-opacity-100 transition-colors duration-200 text-xs sm:text-sm block mb-4"
                                style={{
                                    fontFamily: "'Emilio Thin', sans-serif",
                                    fontWeight: 100
                                }}>
                                fadeltinto@gmail.com
                            </a>
                            <h2 
                                className="font-medium text-white tracking-widest text-[10px] sm:text-xs mb-2"
                                style={{
                                    fontFamily: "'Nothing', monospace",
                                    letterSpacing: '0.1em'
                                }}>
                                {t.contact.phone}
                            </h2>
                            <p 
                                className="text-white text-opacity-70 text-xs sm:text-sm"
                                style={{
                                    fontFamily: "'Emilio Thin', sans-serif",
                                    fontWeight: 100
                                }}>
                                438-778-4099
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Formulaire - Mobile: pleine largeur, Desktop: 1/3 */}
                <form
                    name="contact"
                    method="POST"
                    action="/"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                    className="w-full lg:w-1/3 flex flex-col">
                    <h2 
                        className="nothing-title mb-2 text-white text-2xl sm:text-3xl md:text-4xl"
                        style={{
                            fontFamily: "'Nothing', monospace"
                        }}>
                        {t.contact.title}
                    </h2>
                    <p 
                        className="nothing-subtitle mb-6 sm:mb-8 text-sm sm:text-base">
                        {t.contact.description}
                    </p>
                    {/* Champs cachés nécessaires pour Netlify */}
                    <div hidden>
                        <input type="hidden" name="form-name" value="contact"/>
                        <input type="hidden" name="bot-field"/>
                    </div>
                    <div className="relative mb-4 sm:mb-6">
                        <label 
                            htmlFor="name" 
                            className="block text-xs sm:text-sm text-white text-opacity-70 mb-2 tracking-wider"
                            style={{
                                fontFamily: "'Nothing', monospace",
                                letterSpacing: '0.05em'
                            }}>
                            {t.contact.name}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="nothing-input text-sm sm:text-base"
                            placeholder={t.contact.namePlaceholder || "Your name"}
                        />
                    </div>
                    <div className="relative mb-4 sm:mb-6">
                        <label 
                            htmlFor="email" 
                            className="block text-xs sm:text-sm text-white text-opacity-70 mb-2 tracking-wider"
                            style={{
                                fontFamily: "'Nothing', monospace",
                                letterSpacing: '0.05em'
                            }}>
                            {t.contact.email}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="nothing-input text-sm sm:text-base"
                            placeholder={t.contact.emailPlaceholder || "your.email@example.com"}
                        />
                    </div>
                    <div className="relative mb-4 sm:mb-6">
                        <label 
                            htmlFor="message" 
                            className="block text-xs sm:text-sm text-white text-opacity-70 mb-2 tracking-wider"
                            style={{
                                fontFamily: "'Nothing', monospace",
                                letterSpacing: '0.05em'
                            }}>
                            {t.contact.message}
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="nothing-input h-24 sm:h-32 resize-none text-sm sm:text-base"
                            placeholder={t.contact.messagePlaceholder || "Your message..."}
                        />
                    </div>
                    <button
                        type="submit"
                        className="nothing-button nothing-button-accent w-full text-sm sm:text-base">
                        {t.contact.submit}
                    </button>
                </form>
            </div>
        </section>
    );
}