import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        // Vérifier si on est sur desktop
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        
        checkDesktop();
        window.addEventListener('resize', checkDesktop);

        const updateCursor = (e) => {
            if (window.innerWidth >= 768) {
                setPosition({ x: e.clientX, y: e.clientY });
                setIsVisible(true);
            }
        };

        const handleMouseEnter = (e) => {
            if (window.innerWidth >= 768 && e.target) {
                const target = e.target;
                const isInteractive = target.tagName === 'A' || 
                                    target.tagName === 'BUTTON' || 
                                    (target.closest && (target.closest('a') || target.closest('button')));
                if (isInteractive) {
                    setIsHovering(true);
                }
            }
        };

        const handleMouseLeave = (e) => {
            if (window.innerWidth >= 768 && e.target) {
                const target = e.target;
                const isInteractive = target.tagName === 'A' || 
                                    target.tagName === 'BUTTON' || 
                                    (target.closest && (target.closest('a') || target.closest('button')));
                if (isInteractive) {
                    setIsHovering(false);
                }
            }
        };

        const handleMouseOut = () => {
            if (window.innerWidth >= 768) {
                setIsVisible(false);
            }
        };

        const handleMouseOver = () => {
            if (window.innerWidth >= 768) {
                setIsVisible(true);
            }
        };

        const handleMouseOverWrapper = (e) => {
            handleMouseOver();
            handleMouseEnter(e);
        };

        const handleMouseOutWrapper = (e) => {
            handleMouseOut();
            handleMouseLeave(e);
        };

        if (window.innerWidth >= 768) {
            window.addEventListener('mousemove', updateCursor);
            document.addEventListener('mouseover', handleMouseOverWrapper, true);
            document.addEventListener('mouseout', handleMouseOutWrapper, true);
        }

        return () => {
            window.removeEventListener('resize', checkDesktop);
            window.removeEventListener('mousemove', updateCursor);
            document.removeEventListener('mouseover', handleMouseOverWrapper, true);
            document.removeEventListener('mouseout', handleMouseOutWrapper, true);
        };
    }, []);

    // Masquer sur mobile
    if (!isDesktop) {
        return null;
    }

    return (
        <>
            {/* Cursor principal */}
            <div
                className="fixed pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.2s ease-out',
                    willChange: 'transform'
                }}>
                <div
                    className="w-6 h-6 rounded-full bg-white transition-all duration-300"
                    style={{
                        transform: isHovering ? 'scale(2)' : 'scale(1)',
                        opacity: isHovering ? 0.3 : 0.8
                    }}
                />
            </div>
            
            {/* Cursor follower */}
            <div
                className="fixed pointer-events-none z-[9998]"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.2s ease-out',
                    willChange: 'transform'
                }}>
                <div
                    className="w-2 h-2 rounded-full bg-white transition-all duration-500 ease-out"
                    style={{
                        transform: isHovering ? 'scale(0.5)' : 'scale(1)'
                    }}
                />
            </div>
        </>
    );
}

