'use client';

import { useState, useEffect } from 'react';

// Design
const LINE_COLOR = "#3498db"
const NODE_COLOR = "#bbbbbb"

// Initialization
const NUM_NODES_MIN = 25
const NUM_NODES_MAX = 40
const NUM_NODES = Math.floor(Math.random() * (NUM_NODES_MAX - NUM_NODES_MIN) + NUM_NODES_MIN);

const NODE_DIAMETER = 10;
const NODE_MAX_DIST = 330;

// Updating 
const EDGE_PADDING = 5;
const MAX_VELOCITY = 3;
const DRAG = 0.00;

// Gravity (decided higher constant of G for easier computation)
const GRAVITY_ON = true
const G = 6.67e-2// -11 irl
const MIN_MASS = 50
const MAX_MASS = 50

// Interaction
const MOUSE_PUSH_POWER = 4;

// Utility
const FRAMES_PER_SECOND = 60;

function generatePoints(width, height) {
    var points = [];
    for (var i = 0; i < NUM_NODES; i++) {
        var x_pos = Math.floor(Math.random() * (width + 1));
        var x_vel = Math.random() * MAX_VELOCITY * 2 - MAX_VELOCITY;

        var y_pos = Math.floor(Math.random() * (height + 1));
        var y_vel = Math.random() * MAX_VELOCITY * 2 - MAX_VELOCITY;

        points.push({
            pos: {x: x_pos, y: y_pos}, 
            vel: {x: x_vel, y: y_vel},
            mass: Math.floor(Math.random() * (MAX_MASS - MIN_MASS) + MIN_MASS)
        })
    }
    return points
}

function connectPoints(points) {

    let pairs = []
    for (let p1 = 0; p1 < points.length; p1++) {
        for (let p2 = p1 + 1; p2 < points.length; p2++) { // Skip duplicates
            let p1_x = points[p1].pos.x + (NODE_DIAMETER / 2) + (points[p1].vel.x / 2);
            let p1_y = points[p1].pos.y + (NODE_DIAMETER / 2) + (points[p1].vel.y / 2);
            let p2_x = points[p2].pos.x + (NODE_DIAMETER / 2) + (points[p2].vel.x / 2);
            let p2_y = points[p2].pos.y + (NODE_DIAMETER / 2) + (points[p2].vel.y / 2);

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
    pairs = pairs.filter((p) => p.dist < NODE_MAX_DIST)
    // Sort by distance
    pairs.sort((a, b) => { return a.dist < b.dist})

    return pairs;
}

function updatePoints(points, lines, dimensions) {
    return points.map(point => {
            var vel_x = point.vel.x;
            var vel_y = point.vel.y;

            // NOTE: gravity will only have an effect within NODE_MAX_DISTANCE
            if (GRAVITY_ON) {
                for (let line of lines) {
                    let otherPoint = undefined

                    if (line.p1 == point) { otherPoint = line.p2 }
                    if (line.p2 == point) { otherPoint = line.p1 }
                    if (otherPoint == undefined) continue // No match

                    if (line.dist < 10*NODE_DIAMETER) continue // Prevents clustering (mostly)
                    let f = (G * point.mass * otherPoint.mass) / (line.dist**2)

                    let ux = (otherPoint.pos.x - point.pos.x) / line.dist
                    let uy = (otherPoint.pos.y - point.pos.y) / line.dist

                    vel_x += (f / point.mass) * ux
                    vel_y += (f / point.mass) * uy

                    otherPoint.vel.x -= (f / otherPoint.mass) * ux
                    otherPoint.vel.y -= (f / otherPoint.mass) * uy                    
                }
            }

            
            var new_x = point.pos.x + vel_x;
            var new_y = point.pos.y + vel_y;

            // Boundary checking
            var min_x = NODE_DIAMETER + EDGE_PADDING;
            var max_x = dimensions.width - NODE_DIAMETER - EDGE_PADDING;
            var min_y = NODE_DIAMETER + EDGE_PADDING;
            var max_y = dimensions.height - NODE_DIAMETER - EDGE_PADDING;

            // Clamp values and reverse velocity if hitting a boundary
            if (new_x < min_x || new_x > max_x) {
                new_x = Math.max(min_x, Math.min(new_x, max_x));
                vel_x *= -1;
            }

            if (new_y < min_y || new_y > max_y) {
                new_y = Math.max(min_y, Math.min(new_y, max_y));
                vel_y *= -1;
            }



            // Drag
            vel_x = Math.abs(vel_x) > DRAG ? vel_x - Math.sign(vel_x) * DRAG : 0;
            vel_y = Math.abs(vel_y) > DRAG ? vel_y - Math.sign(vel_y) * DRAG : 0;

            point.pos = {"x": new_x, "y": new_y}
            point.vel = {"x": Math.min(vel_x, MAX_VELOCITY), "y": Math.min(vel_y, MAX_VELOCITY)}
            return point
        })
}

function euclideanDist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export default function Background() {
    const [mounted, setMounted] = useState(false)
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    })
    const [points, setPoints] = useState([])
    const [lines, setLines] = useState([])
    

    // Init
    useEffect(() => {
        setMounted(true)
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        })
        setPoints(generatePoints(window.innerWidth, window.innerHeight))
        setLines(connectPoints(points))
        
    }, [])

    //Resizing
    useEffect(() => {
        if (!mounted) return

        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        handleResize()

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [mounted])

    // Mouse movement 
    useEffect(() => {

        const handleMouse = (e) => {
            let mouse_x = e.pageX
            let mouse_y = e.pageY

            // TODO: could be optimized updating some distance tree structure (squares?)
            for (let point of points) {
                let point_x = point.pos.x + (NODE_DIAMETER/2)
                let point_y = point.pos.y + (NODE_DIAMETER/2)

                let dist = euclideanDist(mouse_x, mouse_y, point_x, point_y)
                if (dist < 60) {
                    let dx = point_x - mouse_x
                    let dy = point_y - mouse_y

                    let vector = { x: dx / dist, y: dy / dist }
                    point.vel.x = vector.x * MOUSE_PUSH_POWER
                    point.vel.y = vector.y * MOUSE_PUSH_POWER
                }
            }
        }

        window.addEventListener("mousemove", handleMouse)
        return () => window.removeEventListener("mousemove", handleMouse)
    }, [points, dimensions, mounted])

    // Time scheduling
    useEffect(() => {
        if (!mounted) return

        const interval = setInterval(() => {
            setLines(connectPoints(points))

            setPoints(updatePoints(points, lines, dimensions))
        }, 1000 / FRAMES_PER_SECOND);

        return () => clearInterval(interval);
    }, [points, lines, dimensions]);

    if (!mounted) return null

    return (<div>
        <svg className="absolute" width={dimensions.width} height={dimensions.height}>
            {lines.map(function(l, i) {
                return <line 
                    key={i}
                    stroke={LINE_COLOR}
                    strokeWidth={Math.min((1 / l.dist) * 60, NODE_DIAMETER/4)} 

                    x1={l.line[0]} 
                    y1={l.line[1]} 
                    x2={l.line[2]} 
                    y2={l.line[3]}
                />
            })}
        </svg>
        {points.map(function(point, i) {
            return <div 
                className={`absolute rounded-full`}
                style={{ 
                    background: `${NODE_COLOR}`,
                    top: `${point.pos.y}px`, 
                    left: `${point.pos.x}px`,
                    width: `${NODE_DIAMETER}px`,
                    height: `${NODE_DIAMETER}px`
                }} 
                key={i}
            ></div>
        })}

        
    </div>);
}
