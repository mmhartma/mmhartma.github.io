"use client";

import { useState, useRef, useEffect } from 'react';
/* 
    Each zoomed content component will have the same structure:
    An array with different sections. Each section will have a title and an array of content.
*/

import Education from './education.js';

export default function ZoomedContent({ label }) {
    if (label !== 'Education') {
        return <></>;
    }

    const sections = Education ?? [];
    const [expandedIndex, setExpandedIndex] = useState(null);
    const hoverTimeoutRef = useRef(null);
    const [showCards, setShowCards] = useState(false);

    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        // trigger staggered entrance whenever visible set changes
        setShowCards(false);
        const t = setTimeout(() => setShowCards(true), 50);
        return () => clearTimeout(t);
    }, [expandedIndex]);
    const visibleSections =
        expandedIndex === null
            ? sections.map((s, i) => ({ section: s, index: i }))
            : [{ section: sections[expandedIndex], index: expandedIndex }];

    return (
        <div
            className="pointer-events-none absolute inset-y-0 right-0 h-screen flex items-center justify-end px-3 py-4 sm:px-6 lg:px-8"
            onClick={(event) => event.stopPropagation()}
            style={{ width: '40%' }}
        >
            <div className="pointer-events-auto flex h-full w-full flex-col gap-6 p-6 antialiased sm:gap-8 sm:p-8 min-h-0">
                {visibleSections.map(({ section, index }) => {
                    const isExpanded = expandedIndex === index;
                    const baseTransition = 'transition-all duration-300 ease-out';
                    const appearState = showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2';

                    const cardClass = isExpanded
                        ? `flex flex-col flex-1 rounded-xl border border-slate-700/80 bg-slate-800/80 p-8 text-slate-100 gap-6 ${baseTransition} shadow-lg overflow-auto z-50 ${appearState}`
                        : `flex flex-col flex-1 rounded-xl border border-slate-700/80 bg-slate-800/80 p-6 text-slate-100 gap-4 ${baseTransition} hover:-translate-y-1 hover:shadow-lg overflow-hidden min-h-0 ${appearState}`;

                    const handleMouseEnter = () => {
                        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                        hoverTimeoutRef.current = setTimeout(() => setExpandedIndex(index), 300);
                    };

                    const handleMouseLeave = () => {
                        if (hoverTimeoutRef.current) {
                            clearTimeout(hoverTimeoutRef.current);
                            hoverTimeoutRef.current = null;
                        }
                        setExpandedIndex(null);
                    };

                    let delay = expandedIndex === null ? index * 80 : 0;

                    return (
                        <div
                            key={`${section.school}-${index}`}
                            className={cardClass}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            style={{ transitionDelay: `${delay}ms` }}
                        >
                            <div className="flex flex-col h-full">
                                <div>
                                    <div className="text-xs font-semibold uppercase tracking-wide text-sky-300">
                                        {section.title}
                                    </div>
                                    <div className="mt-2 text-xl font-extrabold leading-snug text-white">{section.school}</div>
                                    {section.major ? (
                                        <div className="mt-1 text-sm font-medium text-slate-300">{section.major}</div>
                                    ) : null}
                                </div>

                                <div className="mt-3 text-sm text-slate-400">{section.start} - {section.end}</div>
                                {section.gpa ? <div className="mt-2 text-sm text-slate-400">GPA: {section.gpa}</div> : null}

                                {section.description ? (
                                    <div className={isExpanded ? 'mt-4 text-sm leading-relaxed text-slate-300 max-w-[48ch] flex-1 overflow-auto' : 'mt-3 text-sm leading-relaxed text-slate-300 max-w-[48ch] max-h-[6.5rem] overflow-hidden'}>
                                        {section.description}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}