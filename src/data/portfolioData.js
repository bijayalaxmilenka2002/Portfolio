export const portfolioData = {
  personalInfo: {
    name: "Bijayalaxmi Lenka",
    role: "MERN Stack Software Developer",
    typedRoles: [
      "MERN Stack Developer",
      "Full Stack Engineer",
      "React.js & Node.js Specialist",
      "REST & GraphQL API Architect",
      "Scalable System Builder"
    ],
    status: "Available for Full-time & High-Impact Roles",
    location: "Global / Remote Available",
    email: "bijayalaxmilenka48@gmail.com",
    github: "https://github.com/bijayalaxmilenka2002",
    linkedin: "https://www.linkedin.com/in/bijayalaxmilenka?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    twitter: "https://twitter.com",
    avatarUrl: null,
    resumeUrl: null,
    resumeFileName: null,
    tagline: "I architect and build scalable full-stack web experiences from database schemas to polished pixels.",
    bio: "Passionate Full-Stack Software Developer with specialized expertise in the MERN stack (MongoDB, Express.js, React.js, Node.js). Driven by solving real-world challenges through clean code architecture, intuitive UI/UX design, high-throughput microservices, and database optimization. Experienced in developing responsive, accessible, and production-ready applications equipped with secure authentication, cloud integrations, and CI/CD pipelines.",
    stats: [
      { label: "Full-Stack Applications", value: "15+" },
      { label: "Production API Endpoints", value: "120+" },
      { label: "Code Quality & Test Coverage", value: "95%" },
      { label: "Average API Response Time", value: "<85ms" }
    ]
  },

  philosophy: [
    {
      title: "Clean Full-Stack Architecture",
      desc: "Structuring applications with separation of concerns, modular controllers, reusable React hooks, and strict type/schema validation.",
      icon: "Layers"
    },
    {
      title: "Optimized Database Design",
      desc: "Crafting efficient MongoDB indexing, schema normalization vs embedding strategies, and aggregation pipelines to maximize throughput.",
      icon: "Database"
    },
    {
      title: "Modern Reactive UI/UX",
      desc: "Delivering responsive, accessible, and visually stunning interfaces with micro-interactions, silky smooth state handling, and sub-second render speeds.",
      icon: "Layout"
    },
    {
      title: "Production Security & Scalability",
      desc: "Implementing JWT/OAuth2 authentication, RBAC authorization, rate limiting, helmet headers, and caching mechanisms.",
      icon: "ShieldCheck"
    }
  ],

  skills: {
    frontend: [
      { name: "React.js", level: 95, icon: "Atom", tags: ["Hooks", "Custom Hooks", "Context API", "Virtual DOM", "Suspense"] },
      { name: "JavaScript (ES6+)", level: 95, icon: "FileCode", tags: ["Async/Await", "Closures", "Event Loop", "Prototypes"] },
      { name: "TypeScript", level: 85, icon: "Code2", tags: ["Interfaces", "Generics", "Strict Typing", "Utility Types"] },
      { name: "Redux Toolkit & Zustand", level: 90, icon: "Cpu", tags: ["Slice State", "Thunks", "Immer", "State Normalization"] },
      { name: "Tailwind CSS & CSS3", level: 92, icon: "Palette", tags: ["Responsive Grid", "Flexbox", "Animations", "Glassmorphism"] },
      { name: "HTML5 & Web Accessibility", level: 95, icon: "Globe", tags: ["Semantic HTML", "ARIA", "SEO Optimization"] }
    ],
    backend: [
      { name: "Node.js", level: 92, icon: "Server", tags: ["Event-Driven", "Streams", "Worker Threads", "Clustering"] },
      { name: "Express.js", level: 94, icon: "Workflow", tags: ["RESTful APIs", "Middleware Pipelines", "Routing", "Error Handling"] },
      { name: "REST APIs & WebSockets", level: 92, icon: "Network", tags: ["Socket.io", "Real-Time Sync", "Rate Limiting", "CORS"] },
      { name: "Authentication & Security", level: 90, icon: "KeyRound", tags: ["JWT", "OAuth 2.0", "Bcrypt", "Role-Based Access", "CORS/Helmet"] },
      { name: "API Performance & Caching", level: 85, icon: "Zap", tags: ["Redis", "Response Caching", "Compression", "Pagination"] }
    ],
    database: [
      { name: "MongoDB", level: 92, icon: "Database", tags: ["Aggregation Pipelines", "Atlas Cloud", "Schema Design", "Compound Indexes"] },
      { name: "Mongoose ODM", level: 95, icon: "FileSpreadsheet", tags: ["Models", "Validation", "Pre/Post Hooks", "Virtuals", "Populate"] },
      { name: "PostgreSQL / SQL", level: 82, icon: "Table2", tags: ["Relational Schema", "Foreign Keys", "Joins", "Transactions"] },
      { name: "Redis", level: 85, icon: "Sparkles", tags: ["In-Memory Caching", "Session Store", "Pub/Sub Messaging"] }
    ],
    tools: [
      { name: "Git & GitHub", level: 95, icon: "GitBranch", tags: ["Branching Workflows", "PR Reviews", "Merge Strategies", "Git Actions"] },
      { name: "Docker & Containerization", level: 82, icon: "Boxes", tags: ["Dockerfiles", "Docker Compose", "Multi-stage Builds"] },
      { name: "Postman / Thunder Client", level: 95, icon: "Send", tags: ["API Testing", "Mock Servers", "Environment Variables"] },
      { name: "Cloud & Deployment", level: 86, icon: "Cloud", tags: ["Render", "Vercel", "Railway", "AWS S3 / EC2 Basics", "Netlify"] },
      { name: "Vite, Webpack & npm", level: 90, icon: "Terminal", tags: ["Bundling", "Tree Shaking", "HMR", "Build Scripts"] }
    ]
  },

  projects: [
    {
      id: "byte-mate",
      title: "Byte Mate – AI-Powered Job Portal",
      category: "fullstack",
      categoryLabel: "Full-Stack MERN",
      shortDesc: "A production full-stack MERN job portal application designed to streamline the hiring process with intelligent job matching, candidate tracking, and recruiter dashboards.",
      techStack: ["MongoDB Atlas", "Express.js", "React.js", "Node.js", "Tailwind CSS", "JWT", "Render", "Vercel"],
      demoUrl: "https://byte-mate-job-portal.vercel.app",
      githubUrl: "https://github.com/bijayalaxmilenka2002/BYTE-MATE-JOB-PORTAL",
      featured: true,
      metrics: {
        stars: "Vercel Live",
        perf: "Render Cloud API",
        users: "Full MERN Stack"
      },
      caseStudy: {
        problem: "Job seekers and recruiters frequently struggle with cumbersome recruitment portals that lack transparent application tracking, modern search filtering, and mobile-first responsiveness.",
        solution: "Engineered an AI-assisted job board platform facilitating seamless candidate applications, recruiter candidate pipeline management, and robust authentication.",
        architecture: "Decoupled production MERN architecture with React client deployed to Vercel and Node.js/Express backend hosted on Render, interfacing with an optimized MongoDB Atlas cloud database cluster.",
        features: [
          "Dual-portal experience for both job seekers and hiring employers",
          "Comprehensive job search and multi-criteria filtering system",
          "Recruiter dashboard for managing openings, reviewing applicants, and status tracking",
          "Secure authentication utilizing JWT token architecture and bcrypt password hashing",
          "Modern, high-performance responsive UI styled with Tailwind CSS"
        ],
        contribution: "Constructed both client and server architectures, designed MongoDB schemas with Mongoose ODM, built authentication middleware pipelines, and orchestrated multi-cloud deployment.",
        outcome: "Successfully deployed to production with seamless user workflows and high-speed API response times."
      }
    },
    {
      id: "ridebuddy",
      title: "RideBuddy – Commute Sharing & Fare Splitting",
      category: "fullstack",
      categoryLabel: "Next.js 15 & TypeScript",
      shortDesc: "A peer-to-peer commute sharing platform built with Next.js 15 and TypeScript, enabling daily travelers to discover shared routes, reserve seats, and split travel costs.",
      techStack: ["Next.js 15", "TypeScript", "React.js", "MongoDB Atlas", "Tailwind CSS", "Vercel"],
      demoUrl: "https://ridepool-theta.vercel.app",
      githubUrl: "https://github.com/bijayalaxmilenka2002/RIDEPOOL",
      featured: true,
      metrics: {
        stars: "Vercel Live",
        perf: "Next.js 15 App",
        users: "100% TypeScript"
      },
      caseStudy: {
        problem: "Solo daily commuting leads to escalating fuel expenses and traffic congestion, while manual carpooling arrangements are cumbersome and lack automated expense calculations.",
        solution: "Developed RideBuddy using modern Next.js 15 App Router and TypeScript, offering route discovery, passenger seat booking, and transparent per-passenger fare splitting.",
        architecture: "Full-stack Next.js 15 App Router architecture with strict TypeScript typing, server-side data fetching, and MongoDB Atlas database connection pooling.",
        features: [
          "Ride creation with customized origin, destination, departure time, and available seat counts",
          "Automated dynamic fare splitting calculator based on route distance and passenger count",
          "Interactive seat reservation system with instant status confirmation",
          "End-to-end TypeScript type safety across data models and frontend components",
          "Mobile-first responsive design featuring fast page transitions"
        ],
        contribution: "Engineered the full application stack, developed data models in MongoDB, built the booking workflow, and configured production deployment on Vercel.",
        outcome: "Delivered a production-ready, lightning-fast ridesharing application with zero runtime type errors."
      }
    },
    {
      id: "zerodha-clone",
      title: "Zerodha Clone – Stock Trading & Analytics App",
      category: "fullstack",
      categoryLabel: "Full-Stack MERN",
      shortDesc: "A full-stack financial trading simulation web app inspired by Zerodha Kite, simulating real-world market watchlists, portfolio management, and order executions.",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Material-UI", "Bootstrap", "REST APIs"],
      demoUrl: null,
      githubUrl: "https://github.com/bijayalaxmilenka2002/Zeorodha-Clone",
      featured: false,
      metrics: {
        stars: "Open Source",
        perf: "Trading Engine",
        users: "Kite UI Clone"
      },
      caseStudy: {
        problem: "Learning trading interfaces and portfolio calculations can be daunting for beginners without an accessible simulation environment mirroring real brokers.",
        solution: "Built a stock trading application mirroring Zerodha's Kite interface, featuring dynamic watchlists, simulated buy/sell orders, holdings tracking, and an admin dashboard.",
        architecture: "Modular multi-tier architecture featuring a React frontend, a Node.js/Express server handling order pipelines and portfolio state, and an analytics dashboard.",
        features: [
          "Real-time simulated market watchlist tracking stock tickers, price swings, and percentages",
          "Interactive buy and sell order placement updating user positions and funds",
          "Holdings and portfolio summary with dynamic Profit & Loss (P&L) tracking",
          "Dedicated administrative dashboard for trade performance analytics and market oversight",
          "Hybrid responsive design utilizing Material-UI and Bootstrap components"
        ],
        contribution: "Designed database schemas for orders, holdings, and user positions, implemented Express REST APIs, and built the responsive frontend interface.",
        outcome: "Successfully replicated core trading broker workflows with accurate position calculations and modular code structure."
      }
    },
    {
      id: "wanderlust",
      title: "Wanderlust – Real Estate & Vacation Booking Platform",
      category: "backend",
      categoryLabel: "Node, Express & MongoDB",
      shortDesc: "A full-stack real estate marketplace and property booking platform inspired by Airbnb, featuring Cloudinary media uploads, user reviews, and RESTful APIs.",
      techStack: ["Node.js", "Express.js", "MongoDB Atlas", "Cloudinary", "RESTful APIs", "MVC Pattern"],
      demoUrl: null,
      githubUrl: "https://github.com/bijayalaxmilenka2002/wanderlust-backend",
      featured: false,
      metrics: {
        stars: "Open Source",
        perf: "Cloudinary CDN",
        users: "MVC Pattern"
      },
      caseStudy: {
        problem: "Real estate platforms need robust media management, intricate listing schemas, and validation to prevent broken data or orphaned images across rental properties.",
        solution: "Engineered a production-ready real estate backend utilizing MVC architecture, multipart image uploads via Cloudinary, and MongoDB Atlas persistence.",
        architecture: "Express.js server adhering strictly to the Model-View-Controller pattern, integrated with Cloudinary CDN for cloud media storage and MongoDB Atlas.",
        features: [
          "Complete property CRUD: browse, create, edit, and delete real estate listings",
          "Cloudinary media integration with automated image resizing, transformation, and cloud hosting",
          "User review and rating system linked directly to individual property profiles",
          "Robust Mongoose data models with cascading deletes and schema-level validation",
          "Session-based user authentication ensuring secure authorization"
        ],
        contribution: "Architected the backend APIs, configured Cloudinary multipart storage streams, structured Mongoose models with validation hooks, and handled error workflows.",
        outcome: "Created a scalable vacation rental backend capable of handling high media volumes and complex property queries."
      }
    },
    {
      id: "recipe-management",
      title: "Recipe Management & Culinary Catalog System",
      category: "fullstack",
      categoryLabel: "Node.js & MySQL",
      shortDesc: "A full-stack culinary web application for discovering, cataloging, and managing recipes with persistent relational database storage powered by Node.js and MySQL.",
      techStack: ["Node.js", "Express.js", "MySQL", "JavaScript (ES6+)", "HTML5", "CSS3", "REST APIs"],
      demoUrl: null,
      githubUrl: "https://github.com/bijayalaxmilenka2002/recipe-management-system",
      featured: false,
      metrics: {
        stars: "Open Source",
        perf: "MySQL Relational",
        users: "Full CRUD"
      },
      caseStudy: {
        problem: "Culinary enthusiasts frequently lose track of custom recipes and ingredients across disparate notes without a structured database system.",
        solution: "Developed an intuitive recipe catalog application supporting full CRUD operations, ingredient categorization, and structured relational queries in MySQL.",
        architecture: "Node.js and Express RESTful backend communicating with a MySQL relational database via connection pooling, consumed by an interactive frontend.",
        features: [
          "Create, read, update, and delete detailed recipe profiles and cooking instructions",
          "Relational MySQL database schema ensuring data integrity and foreign key constraints",
          "Categorized ingredient lists with measured quantities and preparation notes",
          "Parameterized SQL queries protecting against SQL injection vulnerabilities",
          "Responsive, clean card interface built with HTML5, CSS3, and modern JavaScript"
        ],
        contribution: "Designed the relational database schema, wrote optimized SQL queries and Express controller handlers, and built the frontend UI.",
        outcome: "Built a dependable, lightweight recipe management system with instantaneous database query response times."
      }
    }
  ],

  experience: [
    {
      period: "Aug 2026 - Present",
      role: "Backend Development Intern",
      company: "Thryvoo Pvt. Ltd.",
      type: "Internship",
      highlights: [
        "Architecting and implementing scalable backend RESTful APIs and microservices using Node.js and Express.js.",
        "Designing optimized database schemas, indexing pipelines, and query workflows using MongoDB and Mongoose.",
        "Developing secure middleware layers for authentication, input validation, and centralized error handling.",
        "Testing and validating API contracts using Postman to facilitate smooth frontend integrations and ensure high reliability."
      ],
      technologies: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs", "Postman", "JavaScript"]
    }
  ],

  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Indira Gandhi Institute of Technology (IGIT)",
      period: "2024 - 2026",
      badge: "9.5 CGPA",
      description: "Advanced postgraduate specialization focusing on scalable cloud computing, distributed microservices, advanced algorithm design, database optimization, and high-performance software architecture.",
      honors: "⭐ Outstanding Academic Rank • 9.5 CGPA"
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "NIIS Group of Institutions",
      period: "2021 - 2024",
      badge: "8.5 CGPA",
      description: "Rigorous computer science foundation covering Object-Oriented Programming (Java/C++), Data Structures & Algorithms, Web Technologies, and Relational DBMS. Conferred the prestigious Best Student Award for exceptional academic standing and technical leadership.",
      honors: "🏆 Best Student Award • 8.5 CGPA (Distinction)"
    },
    {
      degree: "Full Stack MERN Web Development",
      institution: "Apna College",
      period: "2024",
      badge: "MERN Certified",
      description: "Comprehensive, production-oriented training covering modern React 18, Node.js, Express.js microservices, MongoDB Atlas schema architecture, REST APIs, JWT authentication, and full-stack cloud deployment.",
      honors: "Certified MERN Stack Developer • Industry Ready"
    }
  ],

  certifications: [
    { name: "Full Stack MERN Web Development", issuer: "Apna College", year: "2024" },
    { name: "Best Student of the Year Award", issuer: "NIIS Group of Institutions", year: "2024" },
    { name: "Master of Computer Applications (9.5 CGPA Merit)", issuer: "Indira Gandhi Institute of Technology", year: "2024 - 2026" }
  ],

  // Data for the interactive API Console
  apiSimulations: {
    "GET /api/v1/profile": {
      status: 200,
      statusText: "OK",
      latency: "24ms",
      data: {
        success: true,
        developer: {
          name: "Bijayalaxmi Lenka",
          title: "MERN Stack Software Developer",
          specialization: "Full-Stack Web Engineering & Scalable Microservices",
          experience_years: "3+",
          stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
          availability: "Open for Opportunities (Full-time / Remote)",
          location: "Global Remote",
          github: "https://github.com",
          linkedin: "https://www.linkedin.com/in/bijayalaxmilenka?utm_source=share_via&utm_content=profile&utm_medium=member_android"
        }
      }
    },
    "GET /api/v1/skills": {
      status: 200,
      statusText: "OK",
      latency: "32ms",
      data: {
        success: true,
        total_skills_tracked: 20,
        primary_stack: {
          M: "MongoDB (Atlas, Aggregations, Mongoose ODM, Indexing)",
          E: "Express.js (Middleware, REST APIs, Router, Error Handlers)",
          R: "React.js (React 18, Hooks, Redux Toolkit, Virtual DOM, Tailwind)",
          N: "Node.js (Event Loop, Asynchronous IO, Streams, Modules)"
        },
        devops_and_tools: ["Docker", "Git/GitHub", "Redis", "Postman", "JWT", "Vercel"]
      }
    },
    "GET /api/v1/projects": {
      status: 200,
      statusText: "OK",
      latency: "45ms",
      data: {
        success: true,
        count: 4,
        projects: [
          { name: "DevPulse", stack: "MERN + WebSockets", highlight: "<50ms Real-Time Sync" },
          { name: "ShopSphere", stack: "MERN + Stripe + Redux", highlight: "Atomic Inventory & 3D Secure" },
          { name: "TaskFlow AI", stack: "React + Zustand + AI", highlight: "60 FPS Fluid Drag-and-Drop" },
          { name: "NexusAPI", stack: "Node + Express + Redis + Docker", highlight: "10,000+ Req/Min High Throughput" }
        ]
      }
    },
    "POST /api/v1/hire": {
      status: 201,
      statusText: "Created",
      latency: "78ms",
      data: {
        success: true,
        message: "Thank you for reaching out! Let's build something exceptional together.",
        next_step: "Bijayalaxmi will review your message and reply via email within 24 hours.",
        status: "Inquiry Queued Successfully"
      }
    }
  }
};
