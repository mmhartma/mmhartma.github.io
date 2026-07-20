// Structure: [
// [{ "name": "company", ...], 
//]

const laBellas = {
  name: "La Bella Sicilia",
  position: "Website & Systems Administrator",
  subtitle: "Note this is my family's business, so I encompass a wide range of responsibilities and roles.",
  duration: "June 2021 - Present",
  description: [
    {
      name: "Networking & Infrastructure",
      description: [
        "Ethernet cabling",
        "Router & switch configuration",
        "Network diagnostics",
        "Website hosting",
        "Web server administration",
        "Domain management",
        "DNS management",
        "CDN configuration",
        "SSL certificate management",
        "Infrastructure planning",
        "Technology procurement",
        "Hardware deployment"
      ]
    },
    {
      name: "Systems Administration",
      description: [
        "POS systems",
        "Payment system configuration",
        "Receipt & kitchen printers",
        "Backup management",
        "Uptime monitoring",
        "Website deployment",
        "Hosting migration",
        "Email forwarding configuration",
        "Remote system administration",
        "System troubleshooting",
        "Preventative maintenance"
      ]
    },
    {
      name: "Web Development & Digital",
      description: [
        "Website development",
        "UI/UX design",
        "Mobile responsiveness",
        "Accessibility improvements",
        "Website optimization",
        "Performance optimization",
        "Asset optimization",
        "Image optimization",
        "Content management",
        "Content publishing",
        "Digital asset management",
        "Menu management",
        "Specials management",
        "Catering page management"
      ]
    },
    {
      name: "SEO & Analytics",
      description: [
        "Search engine optimization (SEO)",
        "Local SEO",
        "Keyword optimization",
        "Metadata management",
        "Structured data (Schema.org)",
        "Sitemap management",
        "robots.txt management",
        "Google Business Profile management",
        "Google Search Console",
        "Google Analytics",
        "Search performance analysis",
        "Customer feedback analysis"
      ]
    },
    {
      name: "Operations",
      description: [
        "Opening & closing procedures",
        "Workflow optimization",
        "Supply organization",
        "Phone order management",
        "Customer service",
        "Register operation",
        "Quality assurance",
        "Catering preparation",
        "Shift coverage",
        "Menu optimization"
      ]
    },
    {
      name: "Leadership",
      description: [
        "Employee training",
        "Technical support",
        "Vendor coordination",
        "Technical documentation",
        "Cross-functional collaboration"
      ]
    },
    {
      name: "Facilities & Security",
      description: [
        "Security camera installation",
        "Camera monitoring",
        "Minor equipment repairs",
        "Building maintenance",
        "Lighting maintenance",
        "Cable management",
        "Storage organization"
      ]
    }
  ]
};

const research = {
  name: "University at Buffalo",
  position: "Research Intern",
  subtitle: "Worked on a research project under the supervision of Marina Blanton, Ph.D., focusing on privacy-preserving networking and systems programming.",
  duration: "May 2024 - August 2024",
  description: [
    {
      name: "Networking",
      description: [
        "Optimized TCP socket implementation",
        "Implemented non-blocking I/O",
        "Reduced message latency by ~30%",
        "Redesigned communication protocols",
        "Improved networking efficiency",
        "Evaluated networking architectures",
        "Analyzed protocol performance",
        "Implemented asynchronous communication"
      ]
    },
    {
      name: "Security",
      description: [
        "Enhanced AES-based communication layer",
        "Secure data transmission",
        "Balanced performance and security requirements",
        "Privacy-preserving networking",
        "Secure protocol implementation"
      ]
    },
    {
      name: "Systems Programming",
      description: [
        "Refactored networking components",
        "Designed modular networking interfaces",
        "Improved code maintainability",
        "Debugged low-level networking issues",
        "Implemented socket abstractions"
      ]
    },
    {
      name: "Research",
      description: [
        "Benchmarked networking performance",
        "Evaluated design tradeoffs",
        "Compared implementation strategies",
        "Documented architectural changes",
        "Presented research findings"
      ]
    }
  ]
};

export default [laBellas, research].reverse();