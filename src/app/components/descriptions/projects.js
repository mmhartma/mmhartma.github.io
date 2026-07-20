// Structure: [
// {name: "Project", ...}
// ]


const contaminationTracing = {
  name: "Privacy-Preserving Supply Chain Contamination Tracing",
  description:
    "Developed a secure multi-party computation system in PICCO that privately traces contaminated products through supply-chain transaction graphs, enabling regulatory investigations while preserving the confidentiality of proprietary business data.",
  stack: ["PICCO", "C"],
  skills: [
    "Secure Multi-Party Computation",
    "Secret Sharing",
    "Algorithms"
  ]
};

const clairvoyix = {
  name: "Clairvoyix AI Workload Platform",
  description:
    "Built a full-stack platform for submitting, scheduling, and monitoring AI workloads on shared GPU infrastructure, integrating RAG-based document summarization, question-answering services, secure authentication, resource allocation, and real-time job tracking.",
  stack: [
    "React",
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
  description:
    "Extended the Pintos operating system by implementing priority scheduling, priority donation, synchronization primitives, system calls, process management, and user program support while improving concurrency and process execution reliability.",
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
  description:
    "Built a Solidity-based ERC-721 password manager that securely stores encrypted website credentials on-chain using Keccak-256 key derivation, NFT ownership authentication, and gas-efficient storage structures.",
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
  description:
    "Trained and evaluated a machine learning model to recognize handwritten digits from user-drawn input using image preprocessing, feature extraction, and classification techniques.",
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
  description:
    "Analyzed over 100,000 housing records using ARIMA time-series forecasting and linear regression to predict rental trends across U.S. markets and identify appreciation patterns.",
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
  description:
    "Built a Python-based client-server messaging application featuring custom application-layer protocols, socket communication, session management, and real-time command processing.",
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
  description:
    "Implemented the RAFT distributed consensus protocol, including leader election, log replication, term management, and fault-tolerant state synchronization.",
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
  description:
    "Implemented the Kademlia distributed hash table using XOR-distance routing, hashed node identifiers, and extensive testing to validate routing correctness and robustness.",
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
  description:
    "Developed an asynchronous distributed messaging system with an integrated failure detector capable of reliable communication and fault detection between processes.",
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
  description:
    "Implemented custom dynamic memory allocators supporting malloc, calloc, and realloc while managing heap allocation and memory efficiency.",
  stack: ["C"],
  skills: [
    "Memory Management",
    "Heap Allocation",
    "Systems Programming"
  ]
};

const synchronization = {
  name: "Synchronization",
  description:
    "Implemented the producer-consumer model using pthreads, mutexes, and synchronization primitives to coordinate concurrent threads safely.",
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
  description:
    "Developed a C-based instant messaging application capable of serializing, transmitting, and receiving messages through a centralized server.",
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
  description:
    "Implemented a console-based simulation of Conway's Game of Life using cellular automata rules and efficient grid updates.",
  stack: ["C"],
  skills: [
    "Algorithms",
    "Cellular Automata",
    "Simulation"
  ]
};

// export in order
export default [contaminationTracing, clairvoyix, pintos, pwmd, numberRecognition, rentalPredictor, messagingService, raft, kademlia, messageFailureDetector, dynamicAllocator, synchronization, instantMessenger, gameOfLife];