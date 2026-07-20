// Structure: [
// {"name": "Project", "description": "..."}, 
//]

// Yup, it's come to this
const age = Math.floor((Date.now() - new Date("2004-06-13").getTime()) / (1000 * 60 * 60 * 24 * 365.25));

const intro = {
  name: "Introduction",
  description: `I'm a highly motivated ${age}-year-old software engineer that puts the user first while building scalable, secure, and efficient systems. I have a foundation of knowledge in computer science, particularly with systems, and I thoroughly enjoy learning everything under this umbrella of a field. I have a particular interest in cybersecurity and privacy, and I am always looking for ways to improve my skills to benefit others. I strive to make a positive impact on whatever I work on, and I am always looking for new challenges to tackle.`
};


const drives = {
  name: "Drives",
  description: "I'm driven by my own curiosity and impact I can make on the world. I am always looking for ways to improve myself, whether it be new skills, knowledge, or experiences. I pursue roles that allow me to learn and grow, particularly with mentorship and collaboration. I'm a perfectionist, and I strive to make the best out of every opportunity I have."
};


const howIWork = {
  name: "How I Work",
  description: "I am a very self-reliant and independent worker, but I also thrive in collaborative environments where I can learn from others. While being detail-oriented, I also start from a high-level perspective to understand the bigger picture of how my work fits into the overall goals of a project. Being iterative and creating readable and maintainable code are core values of mine, allowing for frequent feedback loops and continuous improvement. I am always looking for ways to improve my workflow and processes, and I am open to feedback and suggestions from others."
};


const hobbies = {
  name: "Hobbies",
  description: "Outside of work, I enjoy going to the gym, spending time with friends and family, and cars. Below are a few pictures of cars I've owned:",
  images: [
    { src: '/k5.jpg', alt: 'Kia K5 - front view', caption: "2023 Kia K5, the old car" },
    { src: '/s5_1.jpeg', alt: 'Audi S5 - side profile', caption: "2022 Audi S5" },
    { src: '/s5_2.jpg', alt: 'Audi S5 - rear view', caption: "2022 Audi S5" }
  ]
};



export default [intro, drives, howIWork, hobbies];