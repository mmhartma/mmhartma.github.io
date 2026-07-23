const Associates = {
    school: "Erie Community College",
    title: "Associates Degree",
    major: "Computer Science",
    start: "Aug 2021",
    end: "May 2023",
    gpa: 3.5,
    coursework: ["Data Structures and Algorithms", "Java Programming", "Web Development"]
}

const Bachelors = {
    school: "University at Buffalo",
    title: "Bachelors Degree",
    major: "Computer Science",
    start: "Aug 2023",
    end: "May 2025",
    gpa: 3.5,
    coursework: ["Systems Programming", "Algorithms and Complexity", "Software Engineering Concepts", "Distributed Systems", "Artificial Intelligence"]
}

const Masters = {
    school: "University at Buffalo",
    title: "Masters Degree",
    major: "Computer Science",
    start: "Aug 2025",
    end: "Dec 2026",
    gpa: 3.5,
    coursework: ["Computer Security", "Data Intensive Computing", "Modern Networking Concepts", "Operating Systems", "Database Management Systems"]
}

const Certificate = {
    school: "University at Buffalo",
    title: "Advanced Certificate in Cybersecurity",
    major: "Management Track",
    start: "Jan 2026",
    end: "Dec 2026",
    gpa: 3.5,
    coursework: ["Information Security and Assurance", "Cybersecurity, Privacy & Ethics", "IS Auditing"]
}

// Reverse for chronological order on the eye
export default [Associates, Bachelors, Masters, Certificate].reverse();