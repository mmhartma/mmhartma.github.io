"use client";

import { useState, useRef, useEffect } from 'react';
/* 
    Each zoomed content component will have the same structure:
    An array with different sections. Each section will have a title and an array of content.
*/

import Education from './descriptions/education.js';
import AboutMe from './descriptions/aboutme.js';
import Experience from './descriptions/experience.js';
import Projects from './descriptions/projects.js';
import Skills from './descriptions/skills.js';

const skillCategoryNames = ['Systems', 'Networking', 'Backend', 'Frontend', 'Tools'];

const cardStyles = {
    // Titles and headings
    categoryTitle: 'text-xs font-semibold uppercase tracking-wide text-white',
    mainHeading: 'text-lg font-extrabold leading-snug text-sky-300',
    sectionLabel: 'text-xs font-semibold uppercase text-slate-400',
    
    // Text content
    description: 'text-sm leading-relaxed text-slate-300 whitespace-normal break-words',
    descriptionExpanded: 'text-sm leading-relaxed text-slate-300 whitespace-normal break-words',
    metaText: 'text-sm text-slate-400',
    
    // Badges/Tags
    badge: 'rounded-full border border-slate-600 bg-slate-700/70 px-2.5 py-1 text-xs text-slate-200',
    skillBadge: 'rounded-full border border-slate-600 bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-slate-700/90 hover:text-white',
    skillPanel: 'rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/60 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]',
    skillAccent: 'h-1.5 w-12 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400',
    
    // Dividers and borders
    divider: 'border-slate-600',
};

export default function ZoomedContent({ label }) {
    let contentMap = {
        Education: Education ?? [],
        'About Me': AboutMe ?? [],
        Experience: Experience ?? [],
        Projects: Projects ?? [],
        Skills: (Skills ?? []).map((items, index) => ({
            title: skillCategoryNames[index] || `Category ${index + 1}`,
            items
        }))
    };

    let sections = contentMap[label] ?? [];

    if (!sections.length) {
        return <></>;
    }

    let [expandedIndex, setExpandedIndex] = useState(null);
    let hoverTimeoutRef = useRef(null);
    let [showCards, setShowCards] = useState(false);
    let [activeImageIndex, setActiveImageIndex] = useState(null);

    // Cleanup
    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        };
    }, []);

    // Show cards with stepped animation
    useEffect(() => {
        // trigger staggered entrance whenever visible set changes
        setShowCards(false);
        let t = setTimeout(() => setShowCards(true), 50);
        return () => clearTimeout(t);
    }, [expandedIndex]);

    let visibleSections =
        expandedIndex === null
            ? sections.map((s, i) => ({ section: s, index: i }))
            : [{ section: sections[expandedIndex], index: expandedIndex }];

    // Handle mouse enter and leave events for individual cards (read more)
    let handleMouseEnter = (index) => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => setExpandedIndex(index), 300);
    };

    let handleMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setExpandedIndex(null);
    };

    let renderCardBody = (section, isExpanded) => {
        // helper: clip text to N words
        let clipWords = (text, limit) => {
            if (!text) return '';
            let words = String(text).split(/\s+/);
            if (words.length <= limit) return text;
            return words.slice(0, limit).join(' ') + '…';
        };

        if (label === 'Education') {
            const courseworkItems = Array.isArray(section.coursework)
                ? section.coursework
                : section.coursework ? [section.coursework] : [];

            return (
                <div className="flex flex-col h-full">
                    <div>
                        <div className={cardStyles.categoryTitle}>
                            {section.title}
                        </div>
                        <div className={`mt-2 ${cardStyles.mainHeading}`}>{section.school}</div>
                        {section.major ? (
                            <div className="mt-1 text-sm font-medium text-slate-300">{section.major}</div>
                        ) : null}
                    </div>

                    <div className={`mt-3 ${cardStyles.metaText}`}>{section.start} - {section.end}</div>
                    {section.gpa ? <div className={`mt-2 ${cardStyles.metaText}`}>GPA: {section.gpa}</div> : null}

                    <hr className='my-4 border-slate-600' style={{ visibility: isExpanded ? 'visible' : 'hidden' }}></hr>

                    {courseworkItems.length ? (
                        <div className={isExpanded ? `mt-4 ${cardStyles.descriptionExpanded} max-w-[48ch]` : `mt-3 ${cardStyles.description} max-w-[48ch]`}>
                            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                                Relevant Coursework
                            </div>
                            {isExpanded ? (
                                <ul className="list-disc space-y-1 pl-5 text-slate-300">
                                    {courseworkItems.map((item, idx) => (
                                        <li key={`${item}-${idx}`}>{item}</li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="space-y-1">
                                    {courseworkItems.slice(0, 3).map((item, idx) => (
                                        <div key={`${item}-${idx}`} className="truncate">
                                            {item}
                                        </div>
                                    ))}
                                    {courseworkItems.length > 3 ? (
                                        <div className="mt-2 text-xs uppercase tracking-[0.15em] text-slate-500">
                                            Hover to reveal more
                                        </div>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>
            );
        }

        if (label === 'About Me') {
            return (
                <div className="flex flex-col h-full">
                    <div className={cardStyles.mainHeading}>
                        {section.name}
                    </div>
                    <div className={`mt-3 ${cardStyles.description}`}>
                        {isExpanded ? section.description : clipWords(section.description, 150)}
                    </div>
                    {section.images && section.images.length ? (
                        <div className={`mt-4 grid ${activeImageIndex !== null ? 'grid-cols-1' : 'grid-cols-3'} gap-2 auto-rows-fr overflow-hidden`}>
                            {section.images
                                .map((img, idx) => ({ img, idx }))
                                .filter(({ idx }) => activeImageIndex === null || activeImageIndex === idx)
                                .map(({ img, idx }) => {
                                    let isActive = activeImageIndex === idx;
                                    let wrapperClass = `overflow-hidden rounded-md border border-slate-700 bg-slate-800 transition-all duration-300 ${isActive ? 'z-40 relative' : ''}`;
                                    let imgWrapperClass = isActive ? 'w-full h-100 overflow-hidden' : 'w-full h-28 overflow-hidden';
                                    return (
                                        <div
                                            key={idx}
                                            className={wrapperClass}
                                            onClick={(e) => { e.stopPropagation(); setActiveImageIndex(isActive ? null : idx); }}
                                        >
                                            <div className={imgWrapperClass}>
                                                <img
                                                    src={img.src}
                                                    alt={img.alt}
                                                    className={`w-full h-full object-cover transition-transform duration-300 transform ${isActive ? 'scale-110' : 'scale-100'} block`}
                                                />
                                            </div>
                                            {img.caption ? (
                                                <div className="mt-2 px-2 pb-2 text-xs text-slate-400 truncate">{img.caption}</div>
                                            ) : null}
                                        </div>
                                    );
                                })}
                        </div>
                    ) : null}
                </div>
            );
        }

        if (label === 'Experience') {
            let rawItems = Array.isArray(section.description) ? section.description : [section.description];
            let hasNestedCategories = rawItems.length > 0 && typeof rawItems[0] === 'object' && rawItems[0] !== null && 'name' in rawItems[0];
            let experienceSections = hasNestedCategories
                ? rawItems
                : [{ name: 'Highlights', description: rawItems }];

            let previewSections = isExpanded ? experienceSections : experienceSections.slice(0, 2);

            return (
                <div className="flex flex-col h-full">
                    <div className={cardStyles.categoryTitle}>{section.name}</div>
                    <div className={`mt-2 ${cardStyles.mainHeading}`}>{section.position}</div>
                    {section.subtitle ? (
                        <div className="mt-2 text-sm text-slate-300">
                            {section.subtitle}
                        </div>
                    ) : null}
                    <div className={`mt-2 ${cardStyles.metaText}`}>{section.duration}</div>

                    {experienceSections?.length ? (
                        <div className={isExpanded ? 'mt-4 flex-1 overflow-y-auto pr-1' : 'mt-4'}>
                            <div className={isExpanded ? 'grid gap-4 sm:grid-cols-2' : ''}>
                                {previewSections.map((item, index) => {
                                    let itemDescription = Array.isArray(item.description)
                                        ? item.description
                                        : [item.description];
                                    let previewContent = isExpanded ? itemDescription : itemDescription.slice(0, 3);

                                    return (
                                        <div key={index} className="rounded-2xl border border-slate-700/80 bg-slate-900/80 p-4 flex flex-col">
                                            <div className="text-sm font-semibold text-slate-100">
                                                {item.name}
                                            </div>
                                            <div className="mt-3 text-sm leading-6 text-slate-300 overflow-y-auto pr-1" style={{ maxHeight: isExpanded ? '220px' : 'auto' }}>
                                                {isExpanded ? (
                                                    <ul className="list-disc space-y-2 pl-5 text-slate-300">
                                                        {itemDescription.map((bullet, idx) => (
                                                            <li key={idx}>{bullet}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <div className="space-y-1">
                                                        {previewContent.map((bullet, idx) => (
                                                            <div key={idx} className="truncate">
                                                                {bullet}
                                                            </div>
                                                        ))}
                                                        {itemDescription.length > previewContent.length ? (
                                                            <div className="mt-2 text-xs uppercase tracking-[0.15em] text-slate-500">
                                                                Hover to reveal more
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}

                                {!isExpanded && experienceSections.length > previewSections.length ? (
                                    <div className="col-span-full rounded-2xl border border-dashed border-slate-700/70 bg-slate-800/80 p-4 text-sm text-slate-400">
                                        {experienceSections.length - previewSections.length} more categories hidden until hover
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ) : null}
                </div>
            );
        }

        if (label === 'Projects') {
            const projects = Array.isArray(section.projects) ? section.projects : [];

            return (
                <div className="flex flex-col h-full min-h-0">
                    <div className="flex items-start justify-between gap-3">
                        <div className={cardStyles.mainHeading}>
                            {section.title}
                        </div>
                    </div>

                    <div className={`mt-4 flex flex-col gap-3 ${isExpanded ? 'flex-1 min-h-0 overflow-y-auto pr-1' : ''}`}>
                        {projects.map((project, index) => {
                            const primaryLanguage = project.stack?.[0];

                            return (
                                <div key={`${project.name}-${index}`} className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="text-sm font-semibold text-slate-100">
                                            {project.name}
                                        </div>
                                        {primaryLanguage ? (
                                            <span className="shrink-0 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
                                                {primaryLanguage}
                                            </span>
                                        ) : null}
                                    </div>

                                    <div className={`mt-2 ${cardStyles.description}`}>
                                        {isExpanded ? (
                                            <div className="space-y-3">
                                                {Array.isArray(project.description) ? project.description.map((item, idx) => (
                                                    <div key={`${item.label}-${idx}`}>
                                                        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                                                            {item.label}
                                                        </div>
                                                        <div className="mt-1 text-sm leading-6 text-slate-300">
                                                            {item.text}
                                                        </div>
                                                    </div>
                                                )) : null}
                                            </div>
                                        ) : (
                                            <div className="space-y-1">
                                                {Array.isArray(project.description) ? project.description.slice(0, 2).map((item, idx) => (
                                                    <div key={`${item.label}-${idx}`}>
                                                        <span className="font-semibold text-slate-200">{item.label}: </span>
                                                        <span>{clipWords(item.text, 18)}</span>
                                                    </div>
                                                )) : null}
                                            </div>
                                        )}
                                    </div>

                                    {isExpanded && project.stack?.length ? (
                                        <div className="mt-3">
                                            <div className={cardStyles.sectionLabel}>Stack</div>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {project.stack.map((item) => (
                                                    <span key={item} className={cardStyles.badge}>
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ) : null}

                                    {isExpanded && project.skills?.length ? (
                                        <div className="mt-3">
                                            <div className={cardStyles.sectionLabel}>Skills</div>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {project.skills.map((item) => (
                                                    <span key={item} className={cardStyles.skillBadge}>
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        if (label === 'Skills') {
            return (
                <div className="flex flex-col h-full gap-2">
                    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                        {section.title}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {section.items.map((item) => (
                            <span key={item} className={cardStyles.skillBadge}>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <>
            {/* Right side */}
            <div
                className="pointer-events-none absolute inset-y-0 right-0 h-screen flex items-center justify-end px-3 py-4 sm:px-6 lg:px-8"
                onClick={(event) => event.stopPropagation()}
                style={{ width: '40%' }}
            >
                <div className="pointer-events-auto flex h-full w-full flex-col gap-6 p-6 antialiased sm:gap-8 sm:p-8 min-h-0 overflow-y-auto relative">
                    {visibleSections.map(({ section, index }) => {
                        let isExpanded = expandedIndex === index;
                        let baseTransition = 'transition-all duration-300 ease-out';
                        let appearState = showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2';

                        let cardClass = isExpanded
                            ? `flex flex-col flex-1 rounded-xl border border-slate-700/80 bg-slate-800/80 p-6 text-slate-100 gap-4 ${baseTransition} shadow-lg overflow-y-auto overflow-x-hidden z-50 ${appearState}`
                            : `flex flex-col flex-1 rounded-xl border border-slate-700/80 bg-slate-800/80 p-4 text-slate-100 gap-3 ${baseTransition} hover:-translate-y-1 hover:shadow-lg overflow-hidden ${appearState}`;

                        let delay = expandedIndex === null ? index * 80 : 0;

                            return (
                                <div
                                    key={`${index}`}
                                    className={cardClass}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => setActiveImageIndex(null)}
                                    style={{ transitionDelay: `${delay}ms`, minHeight: isExpanded ? '240px' : '112px' }}
                                >
                                    {renderCardBody(section, isExpanded)}
                                </div>
                            );
                    })}
                </div>
            </div>
        </>
    );
}