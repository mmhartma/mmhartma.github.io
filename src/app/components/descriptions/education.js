const Associates = {
    school: "Erie Community College",
    title: "Associates Degree",
    major: "Computer Science",
    start: "Aug 2021",
    end: "May 2023",
    gpa: 3.5,
    description: ""
}

const Bachelors = {
    school: "University at Buffalo",
    title: "Bachelors Degree",
    major: "Computer Science",
    start: "Aug 2023",
    end: "May 2025",
    gpa: 3.5,
    description: ""
}

const Masters = {
    school: "University at Buffalo",
    title: "Masters Degree",
    major: "Computer Science",
    start: "Aug 2025",
    end: "Dec 2026",
    gpa: 3.5,
    description: ""
}

const Certificate = {
    school: "University at Buffalo",
    title: "Advanced Certificate in Cybersecurity",
    major: "Management Track",
    start: "Jan 2026",
    end: "Dec 2026",
    gpa: 3.5,
    description: ""
}

// Reverse for chronological order on the eye
export default [Associates, Bachelors, Masters, Certificate].reverse();