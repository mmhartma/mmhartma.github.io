import { useState } from 'react';
import { ZOOM_SCALE, POINT_OVERFLOW } from './constants.js';

/**
 * Custom hook for zoom functionality
 */
export function useZoom(dimensions, points) {
    const [zoomedIndex, setZoomedIndex] = useState(null);
    const [zoomTransform, setZoomTransform] = useState({ x: 0, y: 0, scale: 1 });
    const [animatingOutLabels, setAnimatingOutLabels] = useState(new Set());

    const resetZoom = () => {
        setZoomedIndex(null);
        setAnimatingOutLabels(new Set());
        setZoomTransform((prev) => ({ ...prev, scale: 1 }));
    };

    const zoomNode = (index) => {
        if (!points[index]) return;
        if (zoomedIndex === index) {
            resetZoom();
            return;
        }

        const point = points[index];

        // Start animating out all labels
        const labelsToAnimate = new Set();
        points.forEach((p, i) => {
            if (p.description) {
                labelsToAnimate.add(i);
            }
        });
        setAnimatingOutLabels(labelsToAnimate);

        // Remove labels from DOM after animation completes
        setTimeout(() => {
            setZoomedIndex(index);
        }, 300);

        const scale = ZOOM_SCALE;
        const viewportWidth = dimensions.width - POINT_OVERFLOW;
        const viewportHeight = dimensions.height - POINT_OVERFLOW;
        const targetX = viewportWidth * 0.25 + POINT_OVERFLOW / 2;
        const targetY = viewportHeight * 0.5 + POINT_OVERFLOW / 2;
        const originX = (targetX - scale * point.pos.x) / (1 - scale);
        const originY = (targetY - scale * point.pos.y) / (1 - scale);

        setZoomTransform({ x: originX, y: originY, scale });
    };

    return {
        zoomedIndex,
        zoomTransform,
        animatingOutLabels,
        resetZoom,
        zoomNode
    };
}
