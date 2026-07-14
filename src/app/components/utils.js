import {
    NODE_MIN_RADIUS,
    NODE_MAX_RADIUS,
    NODE_ROTATION,
    CONNECTION_DISTANCE_THRESHOLD
} from './constants.js';

/**
 * Rotate a point around a center point by a given angle
 */
export function rotatePoint(x, y, cx, cy, angle) {
    const dx = x - cx;
    const dy = y - cy;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    return {
        x: cx + dx * cosA - dy * sinA,
        y: cy + dx * sinA + dy * cosA
    };
}

/**
 * Calculate Euclidean distance between two points
 */
export function euclideanDist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 * Generate random and fixed points for the background visualization
 */
export function generatePoints(dimensions, numNodes, fixedPoints) {
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

    // Add fixed points
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
        description: "My background, experiences, and interests."
    })

    return points
}

/**
 * Connect points with lines, filtering by distance
 */
export function connectPoints(points) {
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
    pairs = pairs.filter((p) => p.dist < CONNECTION_DISTANCE_THRESHOLD)
    // Sort by distance
    pairs.sort((a, b) => a.dist - b.dist)

    return pairs;
}
