import { GraduationCap, CodeXml, FolderCode, Microscope, BriefcaseBusiness } from 'lucide-react';
import { ICON_STYLE } from './constants.js';

export const fixedPoints = [
    {
        label: "Projects",
        icon: <FolderCode size={24} color={ICON_STYLE.color} strokeWidth={ICON_STYLE.strokeWidth} />,
        description: "A selection of my most impactful projects."
    }, 
    {
        label: "Experience",
        icon: <BriefcaseBusiness size={24} color={ICON_STYLE.color} strokeWidth={ICON_STYLE.strokeWidth} />,
        description: "Professional roles and experiences."
    },
    {
        label: "Skills",
        icon: <CodeXml size={24} color={ICON_STYLE.color} strokeWidth={ICON_STYLE.strokeWidth} />,
        description: "Technologies, frameworks, and tools I am familiar with."
    },
    {
        label: "Education",
        icon: <GraduationCap size={24} color={ICON_STYLE.color} strokeWidth={ICON_STYLE.strokeWidth} />,
        description: "Academic background and coursework."
    },
    {
        label: "Research",
        icon: <Microscope size={24} color={ICON_STYLE.color} strokeWidth={ICON_STYLE.strokeWidth} />,
        description: "Exploratory work and personal drives in the technical space."
    }
];

/**
 * Get the About Me icon configuration
 */
export function getAboutMeIcon() {
    const { User } = require('lucide-react');
    return <User size={24} color={ICON_STYLE.color} strokeWidth={ICON_STYLE.strokeWidth} />;
}
