import { useState, useRef, useEffect } from 'react';
import { TYPEWRITER_SPEED } from './constants.js';

/**
 * Custom hook for typewriter effect
 */
export function useTypewriter() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [displayText, setDisplayText] = useState({});
    const typewriterTimeoutRef = useRef(null);
    const animatedNodesRef = useRef(new Set());

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (typewriterTimeoutRef.current) {
                clearTimeout(typewriterTimeoutRef.current);
            }
        };
    }, []);

    const startTypewriter = (index, text) => {
        if (animatedNodesRef.current.has(index)) {
            setHoveredIndex(index);
            return;
        }

        if (typewriterTimeoutRef.current) {
            clearTimeout(typewriterTimeoutRef.current);
        }

        setHoveredIndex(index);
        setDisplayText(prev => ({ ...prev, [index]: '' }));
        
        let currentIndex = 0;
        
        const typeNextChar = () => {
            if (currentIndex <= text.length) {
                setDisplayText(prev => ({ ...prev, [index]: text.slice(0, currentIndex) }));
                currentIndex++;

                if (currentIndex > text.length) {
                    animatedNodesRef.current.add(index);
                    return;
                }

                typewriterTimeoutRef.current = setTimeout(typeNextChar, TYPEWRITER_SPEED);
            }
        };
        
        typewriterTimeoutRef.current = setTimeout(typeNextChar, TYPEWRITER_SPEED);
    };

    const clearTypewriter = () => {
        setHoveredIndex(null);
    };

    return {
        hoveredIndex,
        displayText,
        animatedNodesRef,
        startTypewriter,
        clearTypewriter
    };
}
