"use client";

import { User } from 'lucide-react';
import { useState, useEffect, cloneElement } from 'react';
import {
    LINE_COLOR,
    NODE_COLOR,
    NODE_MAX_RADIUS,
    POINT_OVERFLOW
} from './constants.js';
import { generatePoints, connectPoints } from './utils.js';
import { fixedPoints } from './fixedPoints.js';
import { useTypewriter } from './useTypewriter.js';
import { useZoom } from './useZoom.js';

import ZoomedContent from './zoomedContent.js';

export default function Background(props) {
    const setZoomedIn = props.setZoomedIn;

    const [mounted, setMounted] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [points, setPoints] = useState([]);
    const [lines, setLines] = useState([]);
    const [showLabel, setShowLabel] = useState(false);

    // Use custom hooks
    const { hoveredIndex, displayText, animatedNodesRef, startTypewriter, clearTypewriter } = useTypewriter();
    const { zoomedIndex, zoomTransform, animatingOutLabels, resetZoom, zoomNode } = useZoom(dimensions, points);

    const label = zoomedIndex !== null ? points[zoomedIndex]?.label : null;


    // Init
    useEffect(() => {
        setMounted(true);

        // Handle window resize
        const handleDimensions = () => {
            setDimensions({
                width: window.innerWidth + POINT_OVERFLOW,
                height: window.innerHeight + POINT_OVERFLOW
            });
        };
        window.addEventListener("resize", handleDimensions);
        handleDimensions();

        // Generate points and lines
        const newDimensions = {
            width: window.innerWidth + POINT_OVERFLOW,
            height: window.innerHeight + POINT_OVERFLOW
        };
        setPoints(generatePoints(newDimensions, 50, fixedPoints));
    }, []);

    // Update lines whenever points change
    useEffect(() => {
        setLines(connectPoints(points));
    }, [points]);

    useEffect(() => {
        setZoomedIn(zoomedIndex !== null);
    }, [zoomedIndex, setZoomedIn]);

    // Show label above node (on focus)
    useEffect(() => {
        if (zoomedIndex !== null) {
            let timer = window.setTimeout(() => setShowLabel(true), 300);
            return () => window.clearTimeout(timer);
        }

        setShowLabel(false);
    }, [zoomedIndex]);

    if (!mounted) return <></>;

    const wrapperStyle = {
        overflow: 'hidden',
        left: -POINT_OVERFLOW / 2,
        top: -POINT_OVERFLOW / 2,
        transform: `scale(${zoomTransform.scale})`,
        transformOrigin: `${zoomTransform.x}px ${zoomTransform.y}px`,
        transition: 'transform 500ms cubic-bezier(0.2, 0.9, 0.2, 1)',
        willChange: 'transform, transform-origin'
    };

    return (
        <>
            <div
                className={`absolute inset-0`}
                onClick={zoomedIndex !== null ? resetZoom : undefined}
                style={wrapperStyle}
            >
            {/* Draw background, apply mask */}
            <svg
                className="absolute"
                width={dimensions.width}
                height={dimensions.height}
                style={{
                    overflow: 'hidden',
                    maskImage: 'radial-gradient(circle at center, black 30%, transparent 75%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 75%)'
                }}
            >
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

                    return (
                        <line
                            key={i}
                            stroke={LINE_COLOR}
                            strokeWidth={Math.min((1 / l.dist) * 50, NODE_MAX_RADIUS / 32)}
                            style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))' }}
                            x1={startX}
                            y1={startY}
                            x2={endX}
                            y2={endY}
                        />
                    );
                })}

                {/* Points */}
                {points.map(function(point, i) {
                    let isFixed = point.description || point.label === "About Me";
                    let isAboutMe = point.label === "About Me";
                    let fill = isFixed ? 'rgba(71, 85, 105, 0.95)' : NODE_COLOR;
                    let stroke = isFixed ? 'rgba(148, 163, 184, 0.4)' : 'none';
                    let strokeWidth = isFixed ? 1.25 : 0;
                    let filter = isAboutMe
                        ? 'drop-shadow(0 0 12px rgba(148, 163, 184, 0.35))'
                        : isFixed ? 'drop-shadow(0 0 8px rgba(148, 163, 184, 0.18))'
                            : undefined;

                    const handleNodeHover = point.description ? () => startTypewriter(i, point.description) : undefined;
                    const handleNodeLeave = point.description ? clearTypewriter : undefined;

                    return (
                        <circle
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
                            onClick={point.description ? (event) => {
                                event.stopPropagation();
                                zoomNode(i);
                            } : undefined}
                            cx={point.pos.x}
                            cy={point.pos.y}
                            r={point.radius}
                        />
                    );
                })}

                {/* Icons and labels */}
                {points.map(function(point, i) {
                    if (!point.icon && point.label !== "About Me") return null;
                    if (zoomedIndex !== null && zoomedIndex !== i) return null;

                    let centerX = point.pos.x;
                    let centerY = point.pos.y;
                    let iconSize = Math.min(48, Math.max(24, point.radius * 0.8));

                    let iconElement = null;
                    if (point.icon) {
                        iconElement = cloneElement(point.icon, {
                            size: iconSize,
                            color: '#ffffff',
                            strokeWidth: 1.5
                        });
                    } else if (point.label === "About Me") {
                        iconElement = cloneElement(<User size={24} />, {
                            size: iconSize,
                            color: '#ffffff',
                            strokeWidth: 1.5
                        });
                    }

                    if (!iconElement) return null;

                    return (
                        <g key={i}>
                            <g transform={`translate(${centerX - iconSize / 2}, ${centerY - iconSize / 2})`}>
                                {iconElement}
                            </g>
                        </g>
                    );
                })}
            </svg>

            {/* Render label on the focused node*/}
            {points.map(function(point, i) {
                if (zoomedIndex !== i) return null;

                return (
                    <div
                        key={`label-${i}`}
                        className="pointer-events-none absolute transition-opacity duration-500 ease-out"
                        style={{
                            left: point.pos.x,
                            top: point.pos.y - point.radius - 20,
                            transform: 'translate(-50%, -100%)',
                            zIndex: 10,
                            opacity: showLabel ? 1 : 0
                        }}
                    >
                        <div className="rounded-full border border-white/20 bg-slate-900/70 px-3 py-1 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur-xl whitespace-nowrap">
                            {point.label}
                        </div>
                    </div>
                );
            })}

            {/* Render description */}
            {points.map(function(point, i) {
                if (!point.description) return null;
                if (zoomedIndex !== null) return null;

                let isAnimatingOut = animatingOutLabels.has(i);
                let angle = Math.atan2(point.pos.y - dimensions.height / 2, point.pos.x - dimensions.width / 2);
                let degrees = (angle * 180) / Math.PI;
                let boxWidth = 200;
                let boxHeight = hoveredIndex === i ? 72 : 48;
                let spacing = 14;
                let top = point.pos.y - boxHeight / 2;
                let left = point.pos.x - boxWidth / 2;

                // No, there's not a better way..
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
                        className={`absolute rounded-2xl border border-white/20 bg-slate-900/70 px-3 py-3 text-left text-sm text-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-200 ${isAnimatingOut ? 'fade-out-scale' : ''}`}
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
        </div>

        {/* Zoomed content cards */}
        <ZoomedContent label={label} />
    </>
);
}
