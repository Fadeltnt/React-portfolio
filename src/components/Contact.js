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
            .then(() => {
                alert(language === 'fr' ? "Message envoyé !" : "Message sent!");
                setName("");
                setEmail("");
                setMessage("");
            })
            .catch((error) => alert(error));
    }

    return (
        <section id="contact" className="nothing-section">
            <div className="nothing-container flex flex-col lg:flex-row gap-12">
                {/* Contact Info */}
                <div className="w-full lg:w-1/3 flex flex-col">
                    <h2 className="font-display text-4xl md:text-6xl text-white mb-8 tracking-wider">
                        {t.contact.title}<span className="text-[#D71921]">.</span>
                    </h2>
                    <p className="font-body text-lg mb-12 opacity-80 leading-relaxed">
                        {t.contact.description}
                    </p>

                    <div className="space-y-8">
                        <div className="group">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2 group-hover:text-[#D71921] transition-colors">
                                {t.contact.email}
                            </h3>
                            <a
                                href="mailto:fadeltinto@gmail.com"
                                className="font-body text-xl text-white hover:text-zinc-300 transition-colors">
                                fadeltinto@gmail.com
                            </a>
                        </div>
                        <div className="group">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2 group-hover:text-[#D71921] transition-colors">
                                {t.contact.phone}
                            </h3>
                            <p className="font-body text-xl text-white">
                                438-778-4099
                            </p>
                        </div>
                        <div className="group">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2 group-hover:text-[#D71921] transition-colors">
                                {t.contact.address}
                            </h3>
                            <p className="font-body text-xl text-white">
                                Québec
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form
                    name="contact"
                    method="POST"
                    action="/"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                    className="w-full lg:w-2/3 flex flex-col gap-6 bg-black/20 p-8 border border-white/10 backdrop-blur-sm">

                    <div hidden>
                        <input type="hidden" name="form-name" value="contact" />
                        <input type="hidden" name="bot-field" />
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                            {t.contact.name}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="nothing-input font-body"
                            placeholder={t.contact.namePlaceholder || "Your name"}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                            {t.contact.email}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="nothing-input font-body"
                            placeholder={t.contact.emailPlaceholder || "your.email@example.com"}
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                            {t.contact.message}
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="nothing-input h-32 resize-none font-body"
                            placeholder={t.contact.messagePlaceholder || "Your message..."}
                        />
                    </div>

                    <button
                        type="submit"
                        className="nothing-button nothing-button-accent w-full mt-4 font-mono">
                        {t.contact.submit}
                    </button>
                </form>
            </div>
        </section>
    );
}