import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
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

    if (!isDesktop) {
        return null;
    }

    return (
        <>
            {/* Main Cursor (Red Dot) */}
            <div
                className="fixed pointer-events-none z-[9999]"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.2s ease-out',
                    willChange: 'transform'
                }}>
                <div
                    className="w-2 h-2 rounded-full bg-[#D71921] transition-all duration-300 shadow-[0_0_10px_rgba(215,25,33,0.8)]"
                    style={{
                        transform: isHovering ? 'scale(1.5)' : 'scale(1)',
                    }}
                />
            </div>

            {/* Cursor Follower (Crosshair) */}
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
                    className="relative w-8 h-8 transition-all duration-500 ease-out"
                    style={{
                        transform: isHovering ? 'scale(1.5) rotate(45deg)' : 'scale(1) rotate(0deg)'
                    }}>
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/30"></div>
                    <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white/30"></div>
                </div>
            </div>
        </>
    );
}
