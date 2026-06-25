"use client";

import { useState, useEffect } from 'react';

// Design
const LINE_COLOR = "#3498db"
const NODE_COLOR = "#bbbbbb"

const NODE_MIN_DIAMETER = 5;
const NODE_MAX_DIAMETER = 10;


function generatePoints(dimensions, numNodes) {
    let width = dimensions.width;
    let height = dimensions.height;

    var points = [];

    for (var i = 0; i < numNodes; i++) {
        var x_pos = Math.floor(Math.random() * (width - NODE_MAX_DIAMETER));
        var y_pos = Math.floor(Math.random() * (height - NODE_MAX_DIAMETER));
        
        var diameter = Math.random() * (NODE_MAX_DIAMETER - NODE_MIN_DIAMETER) + NODE_MIN_DIAMETER;

        points.push({
            pos: {x: x_pos, y: y_pos},
            diameter: diameter
        })
    }

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
                p2: points[p2],
                line: line, 
                dist: euclideanDist(...line) 
            })
        }
    }

    // Remove where dist too far
    pairs = pairs.filter((p) => p.dist < 300)
    // Sort by distance
    pairs.sort((a, b) => { return a.dist < b.dist})

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
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        window.addEventListener("resize", handleDimensions)
        handleDimensions();

        // Generate points and lines
        setPoints(generatePoints({width: window.innerWidth, height: window.innerHeight}, 50))
    }, [])

    useEffect(() => {
        setLines(connectPoints(points))
    }, [points])

    if (!mounted) return <></>;


    return (
    <div>
        {/* Lines */}
        <svg className="absolute" width={dimensions.width} height={dimensions.height}>
            {lines.map(function(l, i) {
                return <line 
                    key={i}
                    stroke={LINE_COLOR}
                    strokeWidth={Math.min((1 / l.dist) * 60, NODE_MAX_DIAMETER/4)} 

                    x1={l.line[0]} 
                    y1={l.line[1]} 
                    x2={l.line[2]} 
                    y2={l.line[3]}
                />
            })}
        </svg>

        {/* Points */}
        {points.map(function(point, i) {
            return <div 
                className={`absolute rounded-full`}
                style={{ 
                    background: `${NODE_COLOR}`,
                    top: `${point.pos.y}px`, 
                    left: `${point.pos.x}px`,
                    width: `${point.diameter}px`,
                    height: `${point.diameter}px`
                }} 
                key={i}
            ></div>
        })}

        
    </div>);
}
