// Structure: [
// {name: "Project", ...}
// ]

const buildProjectDescription = (items) =>
  items.map(([label, text]) => ({ label, text }));

const contaminationTracing = {
  name: "Privacy-Preserving Supply Chain Contamination Tracing",
  description: buildProjectDescription([
    ["Problem", "Supply-chain investigations needed to trace contaminated products without exposing proprietary transaction data."],
    ["Challenge", "Securely correlating shared records across multiple parties while preserving confidentiality and complying with regulatory constraints."],
    ["Approach", "Built a secure multi-party computation workflow in PICCO that computed contamination traces over transaction graphs without revealing raw business data."],
    ["Outcome", "Enabled privacy-preserving investigations that identified contamination paths while keeping sensitive information hidden from participating organizations."],
    ["Takeaways", "Privacy-first systems design can preserve both utility and trust when sensitive data is shared across untrusted parties."]
  ]),
  stack: ["C", "PICCO"],
  skills: [
    "Secure Multi-Party Computation",
    "Secret Sharing",
    "Algorithms"
  ]
};

const clairvoyix = {
  name: "Clairvoyix AI Workload Platform",
  description: buildProjectDescription([
    ["Problem", "Teams needed a reliable way to manage and monitor AI workloads on shared GPU infrastructure."],
    ["Challenge", "Balancing job scheduling, authentication, resource allocation, and document-aware AI services in one cohesive platform."],
    ["Approach", "Created a full-stack web system for submitting, tracking, and monitoring workloads while integrating RAG-based summarization and question-answering services."],
    ["Outcome", "Delivered a unified portal that made AI job execution more transparent, manageable, and operationally easier to oversee."],
    ["Takeaways", "Good infrastructure products come from combining user experience, backend reliability, and clear observability into one workflow."],
  ]),
  stack: [
    "JavaScript",
    "Node.js",
    "Express",
    "PostgreSQL",
    "Python"
  ],
  skills: [
    "REST APIs",
    "RAG",
    "Authentication",
    "GPU Scheduling",
    "Resource Management"
  ]
};

const pintos = {
  name: "PINTOS",
  description: buildProjectDescription([
    ["Problem", "The operating system needed stronger concurrency, scheduling, and process-management behavior for modern coursework workloads."],
    ["Challenge", "Implementing complex kernel features without breaking system stability or introducing subtle race conditions."],
    ["Approach", "Extended Pintos with priority scheduling, priority donation, synchronization primitives, system calls, and process support."],
    ["Outcome", "Improved process execution reliability and created a more robust multi-threaded operating system foundation."],
    ["Takeaways", "Low-level systems work rewards careful design, disciplined testing, and a deep understanding of execution flow."]
  ]),
  stack: ["C"],
  skills: [
    "Operating Systems",
    "Thread Scheduling",
    "Synchronization",
    "Process Management",
    "System Calls"
  ]
};

const pwmd = {
  name: "Password Manager, Distributed (PWmD)",
  description: buildProjectDescription([
    ["Problem", "Password management needed a decentralized, tamper-resistant way to store and verify credentials without relying on a single trusted authority."],
    ["Challenge", "Designing a secure on-chain credential model that preserved privacy while remaining practical and gas-efficient."],
    ["Approach", "Built a Solidity-based ERC-721 password manager that used encrypted storage, Keccak-256 key derivation, and NFT-based ownership checks."],
    ["Outcome", "Created a prototype for permissioned credential ownership that demonstrated secure decentralized password management concepts."],
    ["Takeaways", "Blockchain systems are most compelling when they solve a real trust problem instead of adding complexity for its own sake."]
  ]),
  stack: ["Solidity", "Ethereum"],
  skills: [
    "Smart Contracts",
    "ERC-721",
    "Web3",
    "Cryptography",
    "Access Control"
  ]
};

const numberRecognition = {
  name: "Number Recognition",
  description: buildProjectDescription([
    ["Problem", "Handwritten digit recognition required a model that could classify user-drawn images accurately and consistently."],
    ["Challenge", "Turning raw pixels into meaningful features while avoiding overfitting and maintaining reliable evaluation."],
    ["Approach", "Trained and evaluated a machine learning classifier using preprocessing, feature extraction, and classification techniques on digit images."],
    ["Outcome", "Built a working recognition pipeline that could interpret handwritten digits from user input."],
    ["Takeaways", "The quality of a machine learning system is often determined by the quality of its data pipeline and evaluation strategy."]
  ]),
  stack: ["Python", "NumPy"],
  skills: [
    "Machine Learning",
    "Image Processing",
    "Feature Extraction",
    "Classification"
  ]
};

const rentalPredictor = {
  name: "Rental Price Predictor",
  description: buildProjectDescription([
    ["Problem", "Rental markets needed better forecasting tools to anticipate price trends across a large and varied set of locations."],
    ["Challenge", "Modeling noisy housing data and identifying long-term trends without overfitting to short-term anomalies."],
    ["Approach", "Analyzed more than 100,000 housing records with ARIMA and linear regression to forecast rental trends and appreciation patterns."],
    ["Outcome", "Produced a predictive system that surfaced meaningful rental market insights and trend estimates."],
    ["Takeaways", "Strong forecasting requires careful data preparation as much as the modeling technique itself."]
  ]),
  stack: ["Python", "Pandas"],
  skills: [
    "Data Analysis",
    "ARIMA",
    "Linear Regression",
    "Time-Series Forecasting"
  ]
};

const messagingService = {
  name: "Messaging Service",
  description: buildProjectDescription([
    ["Problem", "A distributed messaging application needed a reliable client-server protocol for sending and receiving messages under real network conditions."],
    ["Challenge", "Designing a communication model that handled session state, message ordering, and robust socket behavior."],
    ["Approach", "Implemented a Python-based messaging service with custom application-layer protocols, session handling, and real-time command processing."],
    ["Outcome", "Built a functional messaging platform that could exchange messages reliably through a centralized server."],
    ["Takeaways", "Protocol design becomes much easier when the system’s communication guarantees are clearly defined from the start."]
  ]),
  stack: ["Python"],
  skills: [
    "Sockets",
    "Networking",
    "Client-Server Architecture",
    "Protocol Design"
  ]
};

const raft = {
  name: "RAFT",
  description: buildProjectDescription([
    ["Problem", "Distributed systems needed a fault-tolerant consensus protocol for coordinating state across replicated nodes."],
    ["Challenge", "Implementing leader election, log replication, and term management without introducing inconsistencies during failures."],
    ["Approach", "Implemented the RAFT consensus protocol with leader election, replication, and synchronization logic for distributed state management."],
    ["Outcome", "Delivered a working replication model that demonstrated reliable consensus behavior under fault scenarios."],
    ["Takeaways", "Consensus systems are most robust when correctness and failure handling are treated as first-class requirements."]
  ]),
  stack: ["Go"],
  skills: [
    "Distributed Systems",
    "RAFT Consensus",
    "Fault Tolerance",
    "Leader Election"
  ]
};

const kademlia = {
  name: "Kademlia",
  description: buildProjectDescription([
    ["Problem", "A distributed hash table needed a scalable routing strategy that could locate peers efficiently in a decentralized network."],
    ["Challenge", "Designing a routing structure that remained correct and resilient even as nodes joined and left the system."],
    ["Approach", "Implemented a Kademlia-style DHT with XOR-distance routing, hashed identifiers, and thorough validation of routing behavior."],
    ["Outcome", "Built a functioning peer-to-peer routing system that could locate information through structured distributed lookup."],
    ["Takeaways", "Decentralized systems thrive when their routing rules are simple, predictable, and well-tested."]
  ]),
  stack: ["Go"],
  skills: [
    "Distributed Systems",
    "Distributed Hash Tables",
    "Hashing",
    "XOR Routing"
  ]
};

const messageFailureDetector = {
  name: "Message Service and Failure Detector",
  description: buildProjectDescription([
    ["Problem", "Distributed processes needed a way to communicate reliably while detecting failures in a timely manner."],
    ["Challenge", "Combining asynchronous messaging with failure detection in a way that remained accurate under partial system failures."],
    ["Approach", "Developed a distributed messaging service with an integrated failure detector to track process liveness and message delivery."],
    ["Outcome", "Delivered a system capable of reliable communication and fault detection across distributed processes."],
    ["Takeaways", "Failure detection is an essential part of distributed systems design, not an afterthought."]
  ]),
  stack: ["Go"],
  skills: [
    "Distributed Systems",
    "Asynchronous Programming",
    "Failure Detection",
    "Networking"
  ]
};

const dynamicAllocator = {
  name: "Dynamic Allocator",
  description: buildProjectDescription([
    ["Problem", "Memory allocation in a custom runtime environment needed efficient support for common allocator operations."],
    ["Challenge", "Designing a allocator that balanced performance, correctness, and memory utilization under real allocation patterns."],
    ["Approach", "Implemented custom malloc, calloc, and realloc behavior while managing free-list and heap allocation strategies."],
    ["Outcome", "Created a functioning dynamic memory allocator that handled allocation requests and memory reuse effectively."],
    ["Takeaways", "Systems programming teaches that small design choices in memory management can drastically affect performance and stability."]
  ]),
  stack: ["C"],
  skills: [
    "Memory Management",
    "Heap Allocation",
    "Systems Programming"
  ]
};

const synchronization = {
  name: "Synchronization",
  description: buildProjectDescription([
    ["Problem", "Concurrent threads needed a safe way to coordinate shared resources without race conditions or deadlocks."],
    ["Challenge", "Implementing synchronization correctly while preserving correctness under contention and timing variation."],
    ["Approach", "Built a producer-consumer system using pthreads, mutexes, and synchronization primitives to coordinate shared work safely."],
    ["Outcome", "Delivered a concurrency model that demonstrated controlled, reliable interaction between threads."],
    ["Takeaways", "Thread safety requires disciplined synchronization patterns and a strong mental model of shared state."]
  ]),
  stack: ["C", "POSIX Threads"],
  skills: [
    "Concurrency",
    "Mutexes",
    "Synchronization",
    "Producer-Consumer"
  ]
};

const instantMessenger = {
  name: "Instant Messenger",
  description: buildProjectDescription([
    ["Problem", "A messaging application needed reliable communication between clients and a central server over a network."],
    ["Challenge", "Serializing and transmitting messages while managing connection state and preserving message integrity."],
    ["Approach", "Developed a C-based client-server instant messenger that serialized payloads and coordinated messages through a server."],
    ["Outcome", "Built a working messaging app that demonstrated practical client-server communication patterns."],
    ["Takeaways", "Networking applications benefit greatly from clean message formats and well-defined session boundaries."]
  ]),
  stack: ["C"],
  skills: [
    "Sockets",
    "Networking",
    "Serialization",
    "Client-Server Architecture"
  ]
};

const gameOfLife = {
  name: "Conway's Game of Life",
  description: buildProjectDescription([
    ["Problem", "A cellular automata simulation needed an efficient way to model evolving populations over many time steps."],
    ["Challenge", "Updating the grid correctly while maintaining performance as the simulation size and iteration count grew."],
    ["Approach", "Implemented a console-based simulation using cellular automata rules and optimized grid updates."],
    ["Outcome", "Produced a working simulation that visually demonstrated the system’s evolution over time."],
    ["Takeaways", "Simple rules can produce rich behavior when the implementation is both clear and efficient."]
  ]),
  stack: ["C"],
  skills: [
    "Algorithms",
    "Cellular Automata",
    "Simulation"
  ]
};

const networkingProjects = [
  contaminationTracing,
  messagingService,
  raft,
  kademlia,
  messageFailureDetector,
  instantMessenger
];

const operatingSystemsProjects = [
  pintos,
  dynamicAllocator,
  synchronization,
  gameOfLife
];

const webProjects = [
  clairvoyix,
  pwmd,
  numberRecognition,
  rentalPredictor
];

const networking = {
  title: "Networking",
  projects: networkingProjects
};

const operatingSystems = {
  title: "Operating Systems",
  projects: operatingSystemsProjects
};

const web = {
  title: "Web Applications",
  projects: webProjects
};

// export in order
export default [networking, operatingSystems, web];