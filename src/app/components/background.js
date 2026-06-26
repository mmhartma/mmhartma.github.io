"use client";

import { GraduationCap, CodeXml, FolderCode, Microscope, BriefcaseBusiness, User } from 'lucide-react';
import { useState, useEffect, cloneElement } from 'react';

// Design
const LINE_COLOR = "#4dd0ff"
const NODE_COLOR = "#d9e2e8"

const NODE_MIN_RADIUS = 2;
const NODE_MAX_RADIUS = 5;

const POINT_OVERFLOW = 100;

function generatePoints(dimensions, numNodes) {
    let width = dimensions.width;
    let height = dimensions.height;

    var points = [];

    // Randomly generate points
    for (var i = 0; i < numNodes; i++) {
        var spreadX = (Math.random() - 0.5) * width * 0.8;
        var spreadY = (Math.random() - 0.5) * height * 1.1;
        var x_pos = Math.floor(width / 2 + spreadX);
        var y_pos = Math.floor(height / 2 + spreadY);
        
        var radius = Math.random() * (NODE_MAX_RADIUS - NODE_MIN_RADIUS) + NODE_MIN_RADIUS;

        points.push({
            pos: {x: x_pos, y: y_pos},
            radius: radius
        })
    }

    // Fixed points
    let labels = ["Projects", "Experience", "Skills", "Education", "Research"];
    let iconStyle = {
        color: '#0f172a',
        strokeWidth: 1.5
    };
    let icons = [
        <FolderCode key="projects" size={24} color={iconStyle.color} strokeWidth={iconStyle.strokeWidth} />,
        <BriefcaseBusiness key="experience" size={24} color={iconStyle.color} strokeWidth={iconStyle.strokeWidth} />,
        <CodeXml key="skills" size={24} color={iconStyle.color} strokeWidth={iconStyle.strokeWidth} />,
        <GraduationCap key="education" size={24} color={iconStyle.color} strokeWidth={iconStyle.strokeWidth} />,
        <Microscope key="research" size={24} color={iconStyle.color} strokeWidth={iconStyle.strokeWidth} />
    ];
    for (var i = 0; i < labels.length; i++) {
        var angle = (i / labels.length) * Math.PI * 2;
        var x_pos = width / 2 + Math.cos(angle) * (width / 5);
        var y_pos = height / 2 + Math.sin(angle) * (height / 5);
        var radius = NODE_MAX_RADIUS * 8;

        points.push({
            pos: {x: x_pos, y: y_pos},
            radius: radius,
            label: labels[i],
            icon: icons[i]
        })
    }

    // Add central point (About Me)
    points.push({
        pos: {x: width / 2, y: height / 2},
        radius: NODE_MAX_RADIUS * 10,
        label: "About Me",
        icon: <User size={24} color={iconStyle.color} strokeWidth={iconStyle.strokeWidth} />
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
                return <line 
                    key={i}
                    stroke={LINE_COLOR}

                    strokeWidth={Math.min((1 / l.dist) * 50, NODE_MAX_RADIUS/32)} 
                    style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))' }}

                    x1={l.line[0] + l.p1_radius/2} 
                    y1={l.line[1] + l.p1_radius/2} 
                    x2={l.line[2] + l.p2_radius/2} 
                    y2={l.line[3] + l.p2_radius/2}
                />
            })}

            {/* Points */}
            {points.map(function(point, i) {
                return <circle
                    key={i}
                    fill={NODE_COLOR}

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
                    color: '#0f172a',
                    strokeWidth: 1.5
                });

                return (
                    <g key={i}>
                        <g transform={`translate(${centerX - iconSize / 2}, ${centerY - iconSize / 2 - 8})`}>
                            {iconElement}
                        </g>
                        <text
                            fill="#0f172a"
                            fontSize="12"
                            fontWeight="600"
                            textAnchor="middle"
                            x={centerX}
                            y={centerY + iconSize / 2 + 4}
                        >
                            {point.label}
                        </text>
                    </g>
                );
            })}
        </svg>
    </div>);
}
