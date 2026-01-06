import type { Project } from "@/types";

// Narrative: Show the range from low-level systems to high-level applications
// Organized by "depth" - from bare metal to user-facing

export const projectCategories = [
  {
    id: "systems",
    title: "Systems & Low-Level",
    description: "Building from the ground up - memory allocators, servers, parsers",
    gradient: "from-red-500 to-orange-500",
  },
  {
    id: "ml",
    title: "ML & Data Science",
    description: "Finding patterns in data - prediction models, analysis, visualization",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "web",
    title: "Full-Stack Applications",
    description: "End-to-end products - from database to deployment",
    gradient: "from-red-600 to-red-500",
  },
  {
    id: "tools",
    title: "Tools & Experiments",
    description: "Side projects and explorations",
    gradient: "from-green-500 to-emerald-500",
  },
];

export const projects: Project[] = [
  // === SYSTEMS PROGRAMMING ===
  {
    slug: "dynamic-memory-allocator",
    title: "Dynamic Memory Allocator",
    description:
      "A secure, high-performance malloc() implementation for x86-64. Features segregated free lists, quick lists, block coalescing, and obfuscated headers to detect heap corruption.",
    longDescription: "Built my own malloc/free/realloc from scratch. This taught me more about memory management than any textbook could.",
    image: "/images/projects/spectrum-analyzer.png",
    tech: ["C", "x86-64", "Systems Programming", "Memory Management"],
    github: "https://github.com/FardinIqbal/dynamic-memory-allocator",
    featured: true,
    category: "systems",
  },
  {
    slug: "concurrent-game-server",
    title: "Concurrent Network Game Server",
    description:
      "Multi-threaded C server for a real-time maze game. Handles concurrent connections with POSIX threads, custom binary protocols, and synchronized game state.",
    longDescription: "Real-time multiplayer requires precise synchronization. This server handles multiple clients without race conditions.",
    image: "/images/projects/spectrum-analyzer.png",
    tech: ["C", "POSIX Threads", "Sockets", "Binary Protocols"],
    github: "https://github.com/FardinIqbal/concurrent-network-game-server",
    featured: true,
    category: "systems",
  },
  {
    slug: "posix-printer-spooler",
    title: "POSIX Print Spooler",
    description:
      "A complete print spooler with job queuing, dynamic printer management, signal handling, and conversion pipelines. Full inter-process communication using Unix syscalls.",
    image: "/images/projects/spectrum-analyzer.png",
    tech: ["C", "POSIX", "Signals", "IPC", "Process Control"],
    github: "https://github.com/FardinIqbal/posix-printer-spooler",
    featured: false,
    category: "systems",
  },
  {
    slug: "openstreetmap-parser",
    title: "OpenStreetMap PBF Parser",
    description:
      "Systems-level parser for OpenStreetMap .pbf files. Custom Protocol Buffers deserializer with no third-party libs - pure binary decoding and zlib decompression.",
    image: "/images/projects/spectrum-analyzer.png",
    tech: ["C", "Protocol Buffers", "Binary Parsing", "zlib"],
    github: "https://github.com/FardinIqbal/openstreetmap-pbf-parser",
    featured: false,
    category: "systems",
  },
  {
    slug: "web-server-proxy",
    title: "HTTP Server & Proxy",
    description:
      "Built an HTTP/1.1 web server and caching proxy from scratch. Handles concurrent requests, implements HTTP spec, and caches responses.",
    image: "/images/projects/spectrum-analyzer.png",
    tech: ["Python", "HTTP", "Sockets", "Caching"],
    github: "https://github.com/FardinIqbal/Web-Server-and-Proxy-Server-",
    featured: false,
    category: "systems",
  },
  {
    slug: "tcp-flow-analysis",
    title: "TCP Flow Analysis Tool",
    description:
      "Network packet analyzer for TCP flows. Parses pcap files, reconstructs streams, and visualizes connection patterns.",
    image: "/images/projects/spectrum-analyzer.png",
    tech: ["Python", "TCP/IP", "Packet Analysis", "Networking"],
    github: "https://github.com/FardinIqbal/TCP-Flow-Analysis-Tool",
    featured: false,
    category: "systems",
  },

  // === MACHINE LEARNING & DATA SCIENCE ===
  {
    slug: "movie-revenue-prediction",
    title: "Box Office Revenue Predictor",
    description:
      "ML pipeline to predict movie revenue using TMDB 5000 dataset. Includes EDA, feature engineering, and comparison of Linear, KNN, and Random Forest regressors with cross-validation.",
    longDescription: "Can we predict if a movie will be a hit? Turns out budget, cast popularity, and release timing matter most.",
    image: "/images/projects/spectrum-analyzer.png",
    tech: ["Python", "scikit-learn", "Pandas", "Feature Engineering"],
    github: "https://github.com/FardinIqbal/movie-revenue-prediction",
    featured: true,
    category: "ml",
  },
  {
    slug: "energy-demand-prediction",
    title: "Energy Demand Forecasting",
    description:
      "Weather-driven residential energy modeling. Built data pipelines, trained regression models, and profiled appliance load patterns to predict household energy consumption.",
    image: "/images/projects/spectrum-analyzer.png",
    tech: ["Python", "Pandas", "Regression", "Data Engineering"],
    github: "https://github.com/FardinIqbal/energy-usage-prediction-weather",
    featured: true,
    category: "ml",
  },
  {
    slug: "nyc-airbnb-analysis",
    title: "NYC Airbnb Market Analysis",
    description:
      "Deep-dive analysis of NYC Airbnb listings. Data cleaning, correlation analysis, and strategic insights for pricing, occupancy, and host behavior patterns.",
    image: "/images/projects/spectrum-analyzer.png",
    tech: ["Python", "Pandas", "Data Visualization", "Statistical Analysis"],
    github: "https://github.com/FardinIqbal/nyc-airbnb-data-analysis",
    featured: false,
    category: "ml",
  },
  {
    slug: "glimpse",
    title: "Glimpse",
    description:
      "James Webb Space Telescope data explorer. Real-time 3D visualization of exoplanet atmospheres with spectral analysis and cinematic presentation.",
    longDescription:
      "Built to make JWST data accessible and beautiful. What would other worlds look like if we could see them?",
    image: "/images/projects/glimpse.png",
    tech: ["Next.js", "Three.js", "TypeScript", "Astropy", "FITS"],
    github: "https://github.com/FardinIqbal/GLIMPSE",
    live: "https://glimpse-jwst.vercel.app",
    featured: true,
    category: "ml",
  },

  // === FULL-STACK WEB ===
  {
    slug: "neo-provider",
    title: "Neo Provider",
    description:
      "Healthcare SaaS platform for Early Intervention therapists. Full EHR with scheduling, clinical notes, billing, and offline-first mobile app.",
    longDescription:
      "Built from scratch to solve the chaos of pediatric therapy clinics. Monorepo architecture with end-to-end type safety.",
    image: "/images/projects/neo-provider.png",
    tech: [
      "TypeScript",
      "React Native",
      "tRPC",
      "Drizzle ORM",
      "PostgreSQL",
      "Turborepo",
    ],
    github: "https://github.com/FardinIqbal/neo-provider",
    featured: true,
    category: "web",
  },
  {
    slug: "localelo",
    title: "LocalElo",
    description:
      "Multi-organization Elo ranking platform for competitive communities. Glicko-2 ratings, member management, and analytics for BJJ gyms, chess clubs, and esports teams.",
    longDescription:
      "Built for my BJJ gym to track sparring rankings. Now supports any competitive community that needs fair, transparent rankings.",
    image: "/images/projects/localelo.png",
    tech: ["Next.js 15", "TypeScript", "tRPC", "Drizzle ORM", "Clerk", "Tailwind"],
    github: "https://github.com/FardinIqbal/localelo",
    featured: true,
    category: "web",
  },
  {
    slug: "civica",
    title: "Civica",
    description:
      "Your government, explained. Track legislation, find representatives, follow money in politics. Aggregates official government APIs into a single elegant interface.",
    longDescription:
      "Government data is scattered and incomprehensible. Civica makes it accessible for ordinary citizens.",
    image: "/images/projects/civica.png",
    tech: ["Next.js", "TypeScript", "Congress.gov API", "FEC API", "OpenSecrets"],
    github: "https://github.com/FardinIqbal/civica",
    featured: true,
    category: "web",
  },
  {
    slug: "fairshare",
    title: "FairShare",
    description:
      "Splitwise-style expense sharing app. Group finance management with secure auth, real-time balance tracking, and smart settlement suggestions.",
    longDescription: "Built for my roommates who were tired of Venmo requests. Now we actually know who owes what.",
    image: "/images/projects/fairshare.jpg",
    tech: ["Ruby on Rails", "PostgreSQL", "Tailwind", "AWS", "Devise"],
    github: "https://github.com/FardinIqbal/FairShare",
    live: "https://finshare-app-552abe51e905.herokuapp.com/",
    featured: false,
    category: "web",
  },
  {
    slug: "mindmesh-ai",
    title: "MindMesh AI",
    description:
      "AI-powered brainstorming companion. Expand ideas through intelligent mind mapping with GPT integration and interactive visualizations.",
    image: "/images/projects/fairshare.jpg",
    tech: ["React", "TypeScript", "OpenAI API", "D3.js"],
    github: "https://github.com/FardinIqbal/MindMeshAI",
    featured: true,
    category: "web",
  },
  {
    slug: "reddit-clone",
    title: "Reddit Clone",
    description:
      "Full-featured social platform with real-time updates, JWT auth, nested comment threading, and upvote/downvote mechanics.",
    image: "/images/projects/reddit.jpg",
    tech: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
    github: "https://github.com/FardinIqbal/Reddit-Clone",
    featured: false,
    category: "web",
  },
  {
    slug: "versecraft",
    title: "VerseCraft",
    description:
      "TikTok-style poetry platform. Swipe through verses, ambient soundscapes, and immersive reading experiences. Like reels, but for poetry.",
    longDescription:
      "Reimagining how poetry is consumed in the social media age. Swipe navigation, ambient audio, and elegant typography.",
    image: "/images/projects/versecraft.png",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind", "Supabase"],
    github: "https://github.com/FardinIqbal/VerseCraft",
    featured: true,
    category: "web",
  },
  {
    slug: "roommatch",
    title: "RoomMatch",
    description:
      "Tinder-style roommate matching app. Swipe through potential roommates, match based on lifestyle compatibility, chat in-app.",
    image: "/images/projects/fairshare.jpg",
    tech: ["React", "Node.js", "MongoDB", "WebSockets"],
    github: "https://github.com/FardinIqbal/roommatch",
    featured: false,
    category: "web",
  },

  // === TOOLS & OTHER ===
  {
    slug: "prometheus-pai",
    title: "Prometheus (PAI)",
    description:
      "Personal AI Infrastructure. Self-optimizing assistant with semantic memory, proactive behaviors, and continuous learning from every interaction.",
    longDescription:
      "My custom AI system that learns preferences, remembers context across sessions, and evolves its own capabilities.",
    image: "/images/projects/prometheus.png",
    tech: [
      "Claude API",
      "TypeScript",
      "Vector Embeddings",
      "Claude Code",
      "Notion API",
    ],
    github: "https://github.com/FardinIqbal/prometheus",
    featured: true,
    category: "tools",
  },
  {
    slug: "computational-geometry",
    title: "Computational Geometry Visualizer",
    description:
      "Interactive tool for visualizing geometric algorithms - convex hulls, Voronoi diagrams, Delaunay triangulation, and more.",
    image: "/images/projects/cold-caller.png",
    tech: ["JavaScript", "Canvas API", "Algorithms", "Visualization"],
    github: "https://github.com/FardinIqbal/computational-geometry-tool",
    featured: false,
    category: "tools",
  },
  {
    slug: "cold-caller",
    title: "Cold Caller",
    description:
      "Android app for teachers to randomly call on students. Tracks participation, manages class sessions, ensures fair distribution.",
    image: "/images/projects/cold-caller.png",
    tech: ["Java", "Android", "Firebase", "Material Design"],
    github: "https://github.com/FardinIqbal/Cold-Caller",
    featured: false,
    category: "tools",
  },
  {
    slug: "trading-simulation",
    title: "Trading Simulator",
    description:
      "Paper trading platform with real market data. Practice strategies without risking real money.",
    image: "/images/projects/cold-caller.png",
    tech: ["Python", "APIs", "Data Visualization"],
    github: "https://github.com/FardinIqbal/trading_simulation",
    featured: false,
    category: "tools",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const systemsProjects = projects.filter((p) => p.category === "systems");
export const mlProjects = projects.filter((p) => p.category === "ml");
export const webProjects = projects.filter((p) => p.category === "web");
export const toolsProjects = projects.filter((p) => p.category === "tools");
