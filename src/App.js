import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from "./contexts/LanguageContext";
import LandingPage from './components/LandingPage';
import SoftwarePortfolio from './SoftwarePortfolio';
import PhotographyPortfolio from './components/PhotographyPortfolio';
import ScrollToTop from './components/ScrollToTop';
import "./App.css";

import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <Router>
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/software" element={<SoftwarePortfolio />} />
                        <Route path="/photography" element={<PhotographyPortfolio />} />
                    </Routes>
                </Router>
            </LanguageProvider>
        </ThemeProvider>
    );
}