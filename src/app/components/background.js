"use client";

import { GraduationCap, CodeXml, FolderCode, Microscope, BriefcaseBusiness, User } from 'lucide-react';
import { useState, useEffect, cloneElement, useRef } from 'react';

// Design
const LINE_COLOR = "#4dd0ff"
const NODE_COLOR = "#d9e2e8"

const NODE_MIN_RADIUS = 2;
const NODE_MAX_RADIUS = 5;

const POINT_OVERFLOW = 100;
const NODE_ROTATION = -Math.PI / 18;

function rotatePoint(x, y, cx, cy, angle) {
    const dx = x - cx;
    const dy = y - cy;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    return {
        x: cx + dx * cosA - dy * sinA,
        y: cy + dx * sinA + dy * cosA
    };
}

function generatePoints(dimensions, numNodes) {
    let width = dimensions.width;
    let height = dimensions.height;
    const centerX = width / 2;
    const centerY = height / 2;

    var points = [];

    // Randomly generate points
    for (var i = 0; i < numNodes; i++) {
        var spreadX = (Math.random() - 0.5) * width * 0.8;
        var spreadY = (Math.random() - 0.5) * height * 1.1;
        var x_pos = width / 2 + spreadX;
        var y_pos = height / 2 + spreadY;
        
        var radius = Math.random() * (NODE_MAX_RADIUS - NODE_MIN_RADIUS) + NODE_MIN_RADIUS;
        var rotated = rotatePoint(x_pos, y_pos, centerX, centerY, NODE_ROTATION);

        points.push({
            pos: {x: Math.floor(rotated.x), y: Math.floor(rotated.y)},
            radius: radius
        })
    }

    // Fixed points
    let iconStyle = {
        color: '#0f172a',
        strokeWidth: 1.5
    };

    let fixedPoints = [
        {
            label: "Projects",
            title: "Projects",
            icon: <FolderCode size={24} color={iconStyle.color} strokeWidth={iconStyle.strokeWidth} />,
            description: "A selection of my most impactful projects."
        }, 
        {
            label: "Experience",
            title: "View My Experience",
            icon: <BriefcaseBusiness size={24} color={iconStyle.color} strokeWidth={iconStyle.strokeWidth} />,
            description: "Professional roles and experiences."
        },
        {
            label: "Skills",
            title: "Skills & Tools",
            icon: <CodeXml size={24} color={iconStyle.color} strokeWidth={iconStyle.strokeWidth} />,
            description: "Technologies, frameworks, and tools I am familiar with."
        },
        {
            label: "Education",
            title: "Education",
            icon: <GraduationCap size={24} color={iconStyle.color} strokeWidth={iconStyle.strokeWidth} />,
            description: "Academic background and coursework."
        },
        {
            label: "Research",
            title: "Research and Passion",
            icon: <Microscope size={24} color={iconStyle.color} strokeWidth={iconStyle.strokeWidth} />,
            description: "Exploratory work and personal drives in the technical space."
        }
    ]
    
    for (var i = 0; i < fixedPoints.length; i++) {
        var angle = (i / fixedPoints.length) * Math.PI * 2;
        var x_pos = width / 2 + Math.cos(angle) * (width / 5);
        var y_pos = height / 2 + Math.sin(angle) * (height / 5);
        var radius = NODE_MAX_RADIUS * 8;
        var rotated = rotatePoint(x_pos, y_pos, centerX, centerY, NODE_ROTATION);

        points.push({
            pos: {x: rotated.x, y: rotated.y},
            radius: radius,
            ...fixedPoints[i]
        })
    }

    // Add central point (About Me)
    var center = rotatePoint(width / 2, height / 2, centerX, centerY, NODE_ROTATION);
    points.push({
        pos: {x: center.x, y: center.y},
        radius: NODE_MAX_RADIUS * 10,
        label: "About Me",
        icon: <User size={24} color={iconStyle.color} strokeWidth={iconStyle.strokeWidth} />,
        description: "My background, experiences, and interests."
    })

    return points
}

function connectPoints(points) {
    let pairs = []

    // TODO: optimize this
    for (let p1 = 0; p1 < points.length; p1++) {
        for (let p2 = p1 + 1; p2 < points.length; p2++) {
            let p1_x = points[p1].pos.x;
            let p1_y = points[p1].pos.y;
            let p2_x = points[p2].pos.x;
            let p2_y = points[p2].pos.y;

            let line = [p1_x, p1_y, p2_x, p2_y]
            pairs.push({
                p1: points[p1],
                p1_radius: points[p1].radius,
                p2: points[p2],
                p2_radius: points[p2].radius,
                line: line, 
                dist: euclideanDist(...line) 
            })
        }
    }

    // Remove where dist too far
    pairs = pairs.filter((p) => p.dist < 250)
    // Sort by distance
    pairs.sort((a, b) => a.dist - b.dist)

    return pairs;
}

function euclideanDist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export default function Background() {

    const [mounted, setMounted] = useState(false)
    let [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    })
    const [points, setPoints] = useState([])
    const [lines, setLines] = useState([])
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const [displayText, setDisplayText] = useState({})
    const typewriterTimeoutRef = useRef(null)
    

    // Init
    useEffect(() => {
        setMounted(true)

        // Handle window resize
        const handleDimensions = () => {
            setDimensions({
                width: window.innerWidth + POINT_OVERFLOW,
                height: window.innerHeight + POINT_OVERFLOW
            })
        }
        window.addEventListener("resize", handleDimensions)
        handleDimensions();

        // Generate points and lines
        setPoints(generatePoints({width: window.innerWidth + POINT_OVERFLOW, height: window.innerHeight + POINT_OVERFLOW}, 50))
    }, [])

    useEffect(() => {
        setLines(connectPoints(points))
    }, [points])

    if (!mounted) return <></>;

    const startTypewriter = (index, text) => {
        setHoveredIndex(index);
        setDisplayText({ [index]: '' });
        
        let currentIndex = 0;
        const speed = 20; // ms per character
        
        const typeNextChar = () => {
            if (currentIndex <= text.length) {
                setDisplayText(prev => ({ ...prev, [index]: text.slice(0, currentIndex) }));
                currentIndex++;
                typewriterTimeoutRef.current = setTimeout(typeNextChar, speed);
            }
        };
        
        typewriterTimeoutRef.current = setTimeout(typeNextChar, speed);
    };

    const clearTypewriter = () => {
        setHoveredIndex(null);
        if (typewriterTimeoutRef.current) {
            clearTimeout(typewriterTimeoutRef.current);
        }
    };

    return (
    <div className={`absolute inset-0`}
    style={{
        overflow: 'hidden',
        left: -POINT_OVERFLOW / 2,
        top: -POINT_OVERFLOW / 2
    }}>
        {/* Draw background, apply mask */}
        <svg className="absolute" width={dimensions.width} height={dimensions.height}
        style={{
            overflow: 'hidden',
            maskImage: 'radial-gradient(circle at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 75%)'
        }}>

            {/* Lines */}
            {lines.map(function(l, i) {
                // compute angle from p1 to p2, then offset endpoints by radius
                let x1 = l.line[0];
                let y1 = l.line[1];
                let x2 = l.line[2];
                let y2 = l.line[3];
                let dx = x2 - x1;
                let dy = y2 - y1;
                let theta = Math.atan2(dy, dx);

                let startX = x1 + Math.cos(theta) * l.p1_radius;
                let startY = y1 + Math.sin(theta) * l.p1_radius;
                let endX = x2 - Math.cos(theta) * l.p2_radius;
                let endY = y2 - Math.sin(theta) * l.p2_radius;

                return <line 
                    key={i}
                    stroke={LINE_COLOR}
                    strokeWidth={Math.min((1 / l.dist) * 50, NODE_MAX_RADIUS/32)} 
                    style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))' }}
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                />
            })}

            {/* Points */}
            {points.map(function(point, i) {
                const isFixed = point.description || point.label === "About Me";
                const isAboutMe = point.label === "About Me";
                const fill = isFixed ? 'rgba(71, 85, 105, 0.95)' : NODE_COLOR;
                const stroke = isFixed ? 'rgba(148, 163, 184, 0.4)' : 'none';
                const strokeWidth = isFixed ? 1.25 : 0;
                const filter = isAboutMe 
                    ? 'drop-shadow(0 0 12px rgba(148, 163, 184, 0.35))' 
                    : isFixed ? 'drop-shadow(0 0 8px rgba(148, 163, 184, 0.18))' 
                    : undefined;

                const handleNodeHover = point.description ? () => startTypewriter(i, point.description) : undefined;
                const handleNodeLeave = point.description ? clearTypewriter : undefined;

                return <circle
                    key={i}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    style={{ 
                        filter,
                        cursor: point.description ? 'pointer' : 'default'
                    }}
                    onMouseEnter={handleNodeHover}
                    onMouseLeave={handleNodeLeave}
                    cx={point.pos.x}
                    cy={point.pos.y}
                    r={point.radius}
                />
            })}

            {/* Icons and labels */}
            {points.map(function(point, i) {
                if (!point.icon || !point.label) return null;

                const centerX = point.pos.x;
                const centerY = point.pos.y;
                const iconSize = Math.min(48, Math.max(24, point.radius * 0.8));
                const iconElement = cloneElement(point.icon, {
                    size: iconSize,
                    color: '#ffffff',
                    strokeWidth: 1.5
                });

                return (
                    <g key={i}>
                        <g transform={`translate(${centerX - iconSize / 2}, ${centerY - iconSize / 2})`}>
                            {iconElement}
                        </g>
                    </g>
                );
            })}
        </svg>

        {/* Render description */}
        {points.map(function(point, i) {
            if (!point.description) return null;

            const angle = Math.atan2(point.pos.y - dimensions.height / 2, point.pos.x - dimensions.width / 2);
            const degrees = (angle * 180) / Math.PI;
            const boxWidth = 200;
            const boxHeight = hoveredIndex === i ? 72 : 48;
            const spacing = 14;
            let top = point.pos.y - boxHeight / 2;
            let left = point.pos.x - boxWidth / 2;

            if (degrees >= -45 && degrees < 45) {
                // right side
                left = point.pos.x + point.radius + spacing;
                top = point.pos.y - boxHeight / 2;
            } else if (degrees >= 45 && degrees < 135) {
                // bottom side
                top = point.pos.y + point.radius + spacing;
                left = point.pos.x - boxWidth / 2;
            } else if (degrees >= -135 && degrees < -45) {
                // top side
                top = point.pos.y - point.radius - boxHeight - spacing - 50;
                left = point.pos.x - boxWidth / 2;
                if (point.label === "Research") {
                    top -= 12;
                }
            } else {
                // left side
                left = point.pos.x - point.radius - boxWidth - spacing;
                top = point.pos.y - boxHeight / 2;
            }

            const handleMouseEnter = () => startTypewriter(i, point.description);
            const handleMouseLeave = clearTypewriter;

            return (
                <div 
                    key={`description-${i}`} 
                    className="absolute rounded-2xl border border-white/20 bg-slate-900/70 px-3 py-3 text-left text-sm text-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-200"
                    style={{
                        top,
                        left,
                        width: 200,
                        minHeight: boxHeight
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="mb-1 text-xs font-semibold uppercase tracking-[0.1em] text-sky-300" style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                        {point.title || point.label}
                    </div>
                    {hoveredIndex === i && (
                        <div className="text-sm leading-5 text-slate-200 min-h-[3.5rem]">
                            {displayText[i]}<span className="animate-pulse">|</span>
                        </div>
                    )}
                </div>
            );
        })}
    </div>);
}
