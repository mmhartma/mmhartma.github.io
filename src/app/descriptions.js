// UTIL
function Header(props) {
    return (<>
        <h3 className="italic">{props.place} ({props.dateFrom} - {props.dateTo})</h3>
        <hr className="my-2"/>
    </>)
}

// CHAPTERS
export function HighSchool_Description() {
    return (<>
        <Header place="Orange Park, Florida" dateFrom="Aug. 2018" dateTo="May 2021"/>
        <p className="pb-2">Obtained both Cambridge AICE Diploma (with Merit) and School Diploma</p>
        <ul className="list-disc list-inside">
            <li>Graduated one year early: 3.98 Unweighted GPA (4.6 Weighted) </li>
            <li>Participated in various activities as part of community service</li>
            <li>Found a passion for understanding <span className="italic">why and how</span> things work, which led me to to code outside of school (JavaScript)</li>
        </ul>
    </>)
}

export function ECC_Description() {
    return (<>
        <Header place="Buffalo, New York" dateFrom="Aug. 2021" dateTo="May 2023"/>
        <p className="pb-2">Obtained Associate in Science, Computer Science (3.5 GPA)</p>
        <p className="">C++ used as primary language within classes</p>
        <ul className="list-disc list-inside">
            <li>Took various courses within the computer science track, notably:
                <ol className="list-decimal list-inside">
                    <li className="indent-1">Advanced Data Structures</li>
                    <li className="indent-1">Web Development and Programming</li>
                </ol>
            </li>
            <li>Became knowledgeable in low level concepts in C/C++</li>
            <li>Placed on Dean's list 3 semesters</li>
        </ul>
        <hr className="my-8"/>
        <p className="text-xl">Projects</p>
        <ul className="list-disc list-inside">
            <li>Graph Traversal: DFS, BFS, Dijkstra's Algorithm</li>
            <li>Trees, Heaps</li>
            <li>Priority Queues</li>
        </ul>

    </>)
}

export function UB_Description() {
    return (<>
        <Header place="Buffalo, New York" dateFrom="Aug. 2023" dateTo="Dec. 2025"/>
        <p>Obtained Bachelor of Science, <span className="italic">Computer Science</span> (3.5 GPA)</p>
        <p className="pb-2">Pursuing Master of Science, <span className="italic">Computer Science</span> (3.5 GPA)</p>
        <ul className="list-disc list-inside">
            <li>Participated in UB Hacking (Hackathon), Fall 2023</li>
            <li>Python used as primary language within classes</li>
            <li>Actively participated in classes, interest in systems</li>
        </ul>
        
        <hr className="my-4"/>

        <p className="text-xl pt-2">Projects <span className="text-sm">(the ones I'm proud of)</span></p>
        
        <div className="px-8 m-2 py-2 bg-gray-700 rounded-lg">
            <p className="pt-2 text-lg">CSE 426: Blockchain Application Development (Solidity)</p>
            <p className="text-md italic"><a target="_blank" href="https://github.com/mmhartma/426-Project" className="text-blue-400 hover:underline">PwMD: Password Manager, Distributed</a></p>
            <hr className="my-1"/>
            <p>Created a blockchain-based solution for storing and retrieving encrypted passwords tied to a Non-Fungible Token (NFT)</p>
            <p>Associated the smart contract with both a Decentralized Application (dApp) and as a chrome extension for ease of use</p>
            <p>User has the ability to create, read, update, and delete any password stored, only available for the owner to manage</p>
        </div>

        <div className="px-8 m-2 py-2 bg-gray-700 rounded-lg">
            <p className="pt-2 text-lg">CSE 521: Operating Systems (C)</p>
            <p className="text-md italic"><a target="_blank" href="https://web.stanford.edu/class/cs140/projects/pintos/pintos.pdf" className="text-blue-400 hover:underline">Pintos Operating System</a></p>
            <hr className="my-1"/>
            <p>A project about implementing underlying processes within an Operating System in phases</p>
            <p>Thread scheduling and execution investigated, along with execution of user programs</p>
            <p>Heavy use of GDB to debug; careful planning required to ensure a correct solution</p>
        </div>

        <div className="px-8 m-2 py-2 bg-gray-700 rounded-lg">
            <p className="pt-2 text-lg">CSE 589: Modern Networking Concepts</p>
            <p className="text-md italic">Text Chat Application (Python)</p>
            <hr className="my-1"/>
            <p>This project was aimed toward the importance of designing a digestible protocol to enable text-chat communication via</p>
            <p>Client-Server model emphasized: lack of trust in the client, server to digest requests and route accordingly</p>
            <p>Shell based interaction on the client: commands parsed and translated into the protocol for further processing</p>
            <p>Rigorous testing required to ensure stability on both the server and client side</p>
        </div>

        <div className="px-8 m-2 py-2 bg-gray-700 rounded-lg">
            <p className="pt-2 text-lg"> CSE 587: Data Intensive Computing</p>
            <p className="text-md italic"><a target="_blank" href="https://github.com/mmhartma/CSE587-Fall24-Project" className="text-blue-400 hover:underline">Rent Analyzer and Predictor</a> (Python)</p>
            <hr className="my-1"/>
            <p>A semester-long project with two other group members aimed at understanding the cycle of using data to create an AI/ML product</p>
            <p>Data Processing Cycle emphasized here: Collection, Processing, and Analysis</p>
            <p>Created AI models based on various algorithms that predicted rent prices for upcoming years based on gathered data</p>
        </div>

        <div className="px-8 m-2 py-2 bg-gray-700 rounded-lg">
            <p className="pt-2 text-lg">CSE 486: Distributed Systems</p>
            <p className="text-md italic"><a target="_blank" href="https://raft.github.io/" className="text-blue-400 hover:underline">Raft</a>: Consensus Algorithm (Go)</p>
            <hr className="my-1"/>
            <p>A project aimed at tackling the idea of consensus between multiple servers, handling failure</p>
            <p>Translated a research paper into code: the ideas were laid out, little test cases given (majority of tests made by the student)</p>
            <p>Required a great understanding of failure, including amnesia and recovery</p>
        </div>
        
        <div className="px-8 m-2 py-2 bg-gray-700 rounded-lg">
            <p className="pt-2 text-lg">CSE 486: Distributed Systems</p>
            <p className="text-md italic">k-DHT: k-Distributed Hash Table (Go)</p>
            <hr className="my-1"/>
            <p>Based off the research paper <a target="_blank" href="https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf" className="text-blue-400 hover:underline">Kademlia</a>, where information is attempted to be available without knowing each participating node</p>
            <p>Similar in difficulty to the Raft project above, where the student was tasked with translating the paper into code, with little test cases given</p>
            <p>Planning and debugging were the emphasis in this project; not planning according to the specific design requirements led to many unnecessary headaches</p>
        </div>

        <div className="px-8 m-2 py-2 bg-gray-700 rounded-lg">
            <p className="pt-2 text-lg">CSE 442: Software Engineering Concepts</p>
            <p className="text-md italic">Self-Checkout Kiosk (JavaScript, PHP)</p>
            <hr className="my-1"/>
            <p>A semester-long project with 4 other teammates to create a product that can be sold to others (agile development environment)</p>
            <p>Communication and setting realistic expectations were exercised rigorously, as tasks had to be done within a certain timeframe</p>
            <p>Went through the entire development cycle, starting from product draw-up to selling this to other classmates</p>
            <p>Learned much about web development, testing, and managing git commits</p>
            <p className="py-4">By far my most favorite project! This project was featured at Demo Day, but I couldn't make it due to time constraints</p>
        </div>

        <div className="px-8 m-2 py-2 bg-gray-700 rounded-lg">
            <p className="pt-2 text-lg">CSE 220: Systems Programming</p>
            <p className="text-md italic">malloc, calloc, realloc (C)</p>
            <hr className="my-1"/>
            <p>This project aimed at reimplementing C standard library dynamic memory management functions from scratch</p>
            <p>There was a heavy emphasis on man pages to create a robust implementation that works on real applications</p>
            <p>Attention to detail on documentation was the main focus, and made for great practice using GDB in the debugging process</p>
        </div>

        <div className="px-8 m-2 py-2 bg-gray-700 rounded-lg">
            <p className="pt-2 text-lg">CSE 220: Systems Programming</p>
            <p className="text-md italic">Instant Messenger (C)</p>
            <hr className="my-1"/>
            <p>This project was aimed at serialization and understanding the importance of creating an efficient underlying protocol</p>
            <p>Understanding the project requirements and designing a compact protocol that transmitted information efficiently was the main task</p>
        </div>
    </>)
}

export function Future_Description() {
    return (<>
        <hr className="my-2"/>
        <div className="px-8 m-2 py-2 bg-gray-700 rounded-lg">
            <p className="pt-2 text-lg">Career Ambitions</p>
            <hr className="my-1"/>
            <p className="p-1 pt-2"><span className="font-bold">Actively pursuing</span> a tech role at a company that makes a difference</p>
            <p className="p-1"><span className="font-bold">Seeking mentorship</span> to gain guidance and accelerate growth</p>
            <p className="p-1"><span className="font-bold">Motivated by growth and recognition</span>— thoroughly driven by results, eager to maximize opportunities given</p>
            <p className="p-1"><span className="font-bold">Aiming to leverage leadership skills</span> to drive innovation and create impactful technological solutions</p> 
        </div>

        <div className="px-8 m-2 py-2 bg-gray-700 rounded-lg">
            <p className="pt-2 text-lg">Interests (Goals)</p>
            <hr className="my-1"/>
            <p className="p-1 pt-2"><span className="font-bold">Exploring systems</span>—focusing on intractability, scalability, and security</p>
            <p className="p-1 pt-2"><span className="font-bold">Optimizing existing systems</span> to enhance efficiency and performance</p>
            <p className="p-1"><span className="font-bold">Building market-driven</span> solutions with real-world impact</p>

        </div>
    </>
    )
}



//EXPERIENCES
export function LaBella_Description() {
    return (<>
        <div className="flex justify-between">
            <span className="h3 italic">Buffalo, New York (June 2021 - Current)</span>
            <span className="italic">Note this is my family's business</span>
        </div>
        <hr className="my-2"/>
        <p>There's no one term to cover what I do here- a little bit of everything?</p>
        <p>I've gained many transferrable skills here, I plan to take these everywhere I go</p>
        <p className="mt-4">For my computer-related responsibilities, I maintain:</p>
        <p className="indent-2">The <a target="_blank" className="text-blue-400 hover:underline" href="https://labellasicilia.com/">company website</a></p>
        <p className="indent-2">The <a target="_blank" className="text-blue-400 hover:underline" href="https://drive.google.com/file/d/1sfpuQVdSyYilFVubo-JoEu0-mRpt0pAt/view?usp=sharing">dining room menu</a></p>
        <p className="indent-2">The <a target="_blank" className="text-blue-400 hover:underline" href="https://drive.google.com/file/d/1oad1ANePLbPLuwtVyi-IR5Zq1jLnKLnT/view?usp=sharing">takeout menu</a></p>
        <p className="indent-2">Along with the point-of-sale computers (self-taught)</p>

        <p className="pt-4">There are many responsibilities I hold here, and have been tied into everything. From maintenance to accounting, I've at least been a part of it</p>
    </>)
}
export function UBResearch_Description() {
    return (<>
        <Header place="Buffalo, New York" dateFrom="May 2024" dateTo="Aug. 2024"/>
        <p>Research position over Summer 2024, tasked with improving the networking functionality</p>
        <p>Learned a considerable amount of C and cryptography</p>
        <p>Switched from blocking to non-blocking send and receive functions, saw increase of response time of 30%</p>
        <p>Main downfall was congestion with high number of packets-- more necessary work to be done to avoid this</p>
        <p>Wrote a document containing all the necessary formal details, which can be found <a target="_blank" href="https://drive.google.com/file/d/1Kf0UykyZqgK0aaZ0LjpnmBTcz04H0Ir-/view?usp=sharing"  className="text-blue-400 hover:underline">here</a>.</p>

    </>)
}
