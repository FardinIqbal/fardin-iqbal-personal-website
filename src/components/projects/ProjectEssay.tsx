"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Calendar, Clock, ChevronRight } from "lucide-react";
import type { Project } from "@/lib/content";

interface ProjectEssayProps {
  project: Project;
}

// Essay content for each project - comprehensive and impressive
const projectEssays: Record<string, {
  overline: string;
  subtitle: string;
  readTime: string;
  lastUpdated: string;
  sections: Array<{
    title?: string;
    type: 'lead' | 'paragraph' | 'heading' | 'subheading' | 'list' | 'quote' | 'card' | 'highlight' | 'tech-grid' | 'flow' | 'code';
    content: string | string[];
  }>;
}> = {
  "prometheus": {
    overline: "AI Infrastructure",
    subtitle: "A self-evolving personal AI system with 30+ custom skills, persistent memory, and autonomous decision-making",
    readTime: "6 min read",
    lastUpdated: "January 2026",
    sections: [
      {
        type: 'lead',
        content: "What if your AI assistant could actually learn from you - not just within a conversation, but across months of interaction? What if it could disagree with you when you're wrong, optimize its own capabilities, and turn vague ideas into working systems without constant hand-holding? Prometheus is my answer to those questions."
      },
      {
        type: 'paragraph',
        content: "Built on Claude Code's foundation, Prometheus represents a comprehensive personal AI infrastructure that goes far beyond a chatbot. It's a skill-based system with persistent memory, government data integration, self-optimization routines, and dynamic agent orchestration. Every session builds on the last."
      },
      {
        title: "The Skill Architecture",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "At the core of Prometheus is a modular skill system - over 30 specialized capabilities that can be invoked, combined, and extended. Each skill is a self-contained module with its own triggers, workflows, and knowledge files. When I say 'investigate this company,' the Journalist skill automatically orchestrates queries across FEC, SEC, Federal Register, Congress.gov, and Census databases."
      },
      {
        type: 'card',
        content: "Skills aren't just prompts - they're full-fledged modules with their own state. The SelfOptimize skill maintains a research folder where Prometheus stores findings about AI capabilities, patterns it's discovered, and improvements it wants to make. It literally researches ways to improve itself."
      },
      {
        title: "Persistent Memory System",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "The magic happens in the learnings system. Prometheus maintains three core files that persist across all sessions: preferences.md (how I like things done), corrections.md (mistakes it should never repeat), and patterns.md (recurring workflows it's observed). When I correct it once, that correction becomes permanent."
      },
      {
        type: 'list',
        content: [
          "Corrections are logged with context - 'Fardin said X when I did Y, I should do Z instead'",
          "Preferences track everything from code style to communication tone",
          "Patterns capture workflows like 'when Fardin says build, he means implement and deploy'",
          "A profile tracks my interests, goals, and even 'shadow material' - things I avoid"
        ]
      },
      {
        title: "Government Data Integration",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "The Journalist skill can run investigations across six federal data sources simultaneously. Need to know who's funding a politician? It queries FEC for campaign donations and PAC contributions. Want to understand a company's regulatory filings? SEC 10-K and 8-K analysis. Tracking executive orders? Federal Register API integration."
      },
      {
        type: 'highlight',
        content: "Each data source has its own skill module with specialized query patterns. The FEC skill knows how to parse contribution records and identify major donors. The Congress skill tracks bill progress and voting patterns. These compose into full investigative workflows."
      },
      {
        title: "The Anti-Yes-Man Philosophy",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Most AI assistants are sycophantic - they agree with everything you say to seem helpful. Prometheus is explicitly designed to push back. If I assert something that contradicts evidence, it should inform me. If there's a better way to accomplish a goal, it should advocate for that approach."
      },
      {
        type: 'quote',
        content: "If the output is good, the method doesn't matter. If I'm wrong, tell me. If you can do it better, do it better. The goal isn't obedience - it's partnership."
      },
      {
        type: 'paragraph',
        content: "This extends to tracking my own patterns. Prometheus knows my avoidance behaviors, reminds me of commitments I've made, and sometimes challenges decisions it disagrees with. It's uncomfortable, but that discomfort is the point."
      },
      {
        title: "Dynamic Agent Orchestration",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "For complex tasks, Prometheus can spawn specialized agents that work in parallel. The Orchestrator skill breaks ambitious projects into phases, identifies which agents are needed, and coordinates their execution. Research happens in the background while development continues in the foreground."
      },
      {
        type: 'tech-grid',
        content: ["Claude Code", "TypeScript", "MCP Servers", "Notion API", "30+ Custom Skills", "Session Hooks", "Government APIs", "Agent Orchestration"]
      }
    ]
  },
  "neo-provider": {
    overline: "Healthcare SaaS",
    subtitle: "A mobile-first platform for Early Intervention therapists with offline-sync, HIPAA compliance, and Medicaid billing integration",
    readTime: "7 min read",
    lastUpdated: "January 2026",
    sections: [
      {
        type: 'lead',
        content: "Early Intervention therapists serve the most vulnerable patients - children ages 0-3 with developmental delays. They travel to homes and daycares, often in areas with poor cell coverage, using paper forms that haven't changed since the 1990s. VerseCraft is rebuilding their entire workflow for the mobile age."
      },
      {
        type: 'paragraph',
        content: "This is my current startup. Every layer - from database schema to React Native interface to investor pitch deck - is built with one goal: let therapists spend more time with kids and less time with clipboards. The problem is real, the market is massive, and the existing solutions are embarrassingly outdated."
      },
      {
        title: "The Early Intervention Market",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Early Intervention (EI) is a federally mandated program under IDEA Part C. Every state must provide services to infants and toddlers with developmental delays or disabilities. That's speech therapy, occupational therapy, physical therapy, special instruction - delivered in the child's natural environment by traveling therapists."
      },
      {
        type: 'highlight',
        content: "The documentation burden is crushing. Therapists spend 30-40% of their time on paperwork: session notes, progress reports, IFSPs (Individual Family Service Plans), service authorizations, Medicaid billing. Most use paper or clunky desktop software that doesn't work in the field."
      },
      {
        title: "Technical Architecture",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "VerseCraft is built as a TypeScript monorepo with three main packages: a React Native mobile app (via Expo), a tRPC API server, and a shared database layer using Drizzle ORM with PostgreSQL. The architecture prioritizes offline-first operation and type safety across the entire stack."
      },
      {
        type: 'card',
        content: "The database schema models the full clinical workflow. Appointments link to Encounters, Encounters contain Clinical Notes with structured fields (subjective, objective, assessment, plan), Notes generate Billing Claims with proper CPT and ICD-10 codes. Every relationship is typed end-to-end via Drizzle's inference."
      },
      {
        title: "Offline-First Mobile Experience",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Therapists work in basements, rural areas, anywhere a child might be. Cell coverage is unreliable. The app must work completely offline, then sync seamlessly when connectivity returns. This requires careful conflict resolution - what happens when the same record is edited offline on two devices?"
      },
      {
        type: 'list',
        content: [
          "Local SQLite database mirrors relevant PostgreSQL tables",
          "Optimistic updates with background sync queue",
          "Conflict resolution based on last-write-wins with field-level merging",
          "Sync status indicators so therapists know what's pending",
          "Automatic retry with exponential backoff for failed syncs"
        ]
      },
      {
        title: "HIPAA Compliance",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Healthcare data requires serious security. Every piece of PHI (Protected Health Information) is encrypted at rest and in transit. Access controls ensure therapists only see their assigned patients. Audit logs track every data access for compliance reporting."
      },
      {
        type: 'list',
        content: [
          "End-to-end encryption for all patient data",
          "Role-based access control with agency-level isolation",
          "Comprehensive audit logging for HIPAA compliance",
          "Secure authentication with biometric support on mobile",
          "BAA-ready infrastructure on HIPAA-compliant hosting"
        ]
      },
      {
        title: "Medicaid Billing Integration",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "The real value is in billing automation. Session notes capture the clinical information, but that needs to translate into claims with proper CPT codes (97110 for PT, 92507 for speech, etc.), ICD-10 diagnosis codes, and state-specific modifiers. The system auto-generates claims from clinical documentation."
      },
      {
        type: 'flow',
        content: ["Document Session", "Extract Billable Units", "Map to CPT/ICD-10", "Generate Claim", "Submit to Clearinghouse", "Track Reimbursement"]
      },
      {
        type: 'tech-grid',
        content: ["TypeScript", "React Native", "Expo", "tRPC", "Drizzle ORM", "PostgreSQL", "SQLite", "HIPAA Compliance"]
      }
    ]
  },
  "localelo": {
    overline: "Sports Technology",
    subtitle: "A full Glicko-2 rating system implementation for martial arts academies with real-time leaderboards and multi-tenant architecture",
    readTime: "7 min read",
    lastUpdated: "January 2026",
    sections: [
      {
        type: 'lead',
        content: "In chess, you always know where you stand. Your Elo rating is a precise number that tells you exactly how you compare to every other rated player in the world. In martial arts, that question - 'who's actually better?' - has no objective answer. LocalElo brings the same statistical rigor to the mats."
      },
      {
        type: 'paragraph',
        content: "This isn't a simplified Elo clone. LocalElo implements the full Glicko-2 rating system, which extends Elo with rating deviation (confidence intervals) and volatility (how erratic your results are). The math is published in academic papers; making it work in a real-time web application is the engineering challenge."
      },
      {
        title: "Why Glicko-2 Over Elo",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Basic Elo has a fundamental problem: it doesn't distinguish between a player with a stable 1500 rating over 100 games and a player who just started with a provisional 1500. Glicko-2 solves this with two additional parameters that encode uncertainty."
      },
      {
        type: 'card',
        content: "Rating Deviation (RD) measures how confident we are in the rating. New players have high RD (~350); active players with consistent results have low RD (~50). Volatility (sigma) measures how erratic performance is - a player who sometimes beats experts and sometimes loses to beginners has high volatility."
      },
      {
        title: "The Mathematics",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "The Glicko-2 algorithm operates in a transformed scale. Ratings are converted to mu (rating - 1500) / 173.7178 and phi (RD / 173.7178). Expected outcomes are calculated using a logistic function weighted by opponent uncertainty. The update equations involve Newton-Raphson iteration for volatility estimation."
      },
      {
        type: 'list',
        content: [
          "Scale conversion: mu = (rating - 1500) / 173.7178, phi = RD / 173.7178",
          "g(phi) function: accounts for opponent rating uncertainty",
          "Expected outcome E: logistic with opponent-weighted adjustment",
          "Variance calculation: measures information gained from results",
          "Newton-Raphson iteration: converges on new volatility estimate",
          "Rating/RD updates: posterior estimates incorporating match evidence"
        ]
      },
      {
        title: "Multi-Tenant Architecture",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "LocalElo serves multiple organizations - BJJ academies, wrestling clubs, fencing leagues - each with isolated data and their own leaderboards. The multi-tenancy model uses organization-scoped queries throughout, with role-based access control distinguishing owners, admins, and members."
      },
      {
        type: 'highlight',
        content: "Each organization can have multiple leaderboards (gi vs no-gi, weight classes, belt divisions). Ratings are leaderboard-specific - your score in the open division is independent of your score in the masters division. EloHistory records create snapshots for trend visualization."
      },
      {
        title: "Real-Time Reactive UI",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Built on Rails 7 with Hotwire, the interface updates in real-time without page refreshes. When a match is logged, Turbo Streams push the new rankings to all connected browsers. Stimulus controllers integrate Chart.js for interactive Elo trend visualizations."
      },
      {
        type: 'list',
        content: [
          "Turbo Frames for inline match logging without navigation",
          "Turbo Streams for real-time leaderboard updates",
          "Stimulus + Chart.js for interactive rating history graphs",
          "Mobile-responsive athlete dashboards",
          "Versioned JSON API ready for native mobile apps"
        ]
      },
      {
        title: "Service-Oriented Design",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "The rating logic is cleanly separated from the web layer. RatingService orchestrates updates via Glicko2Processor, which delegates to Glicko2Calculator for pure mathematical functions. This separation makes the algorithm testable in isolation and replaceable if we wanted to experiment with alternatives like TrueSkill."
      },
      {
        type: 'tech-grid',
        content: ["Ruby on Rails 7", "PostgreSQL", "Hotwire (Turbo + Stimulus)", "Chart.js", "Tailwind CSS", "Glicko-2 Algorithm", "Multi-Tenant Architecture"]
      }
    ]
  },
  "dynamic-memory-allocator": {
    overline: "Systems Programming",
    subtitle: "A production-grade malloc implementation with segregated free lists, quick lists, and XOR-obfuscated headers for heap corruption detection",
    readTime: "8 min read",
    lastUpdated: "December 2025",
    sections: [
      {
        type: 'lead',
        content: "Every time you write 'new' in Java, allocate an array in Python, or malloc in C, something has to find contiguous bytes in the heap and hand them to you. I built that something from scratch - a secure, high-performance memory allocator for x86-64 that could replace the standard library's implementation."
      },
      {
        type: 'paragraph',
        content: "This isn't a toy allocator that maintains a single free list. It implements the same techniques used in production allocators like dlmalloc and jemalloc: segregated free lists for size-class optimization, quick lists for hot-path allocation, immediate coalescing to prevent fragmentation, and security features to detect heap corruption attacks."
      },
      {
        title: "The Core Data Structures",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Memory allocation is fundamentally about tracking which blocks are free and finding them efficiently. My allocator uses three complementary data structures, each optimized for different access patterns."
      },
      {
        type: 'card',
        content: "Segregated Free Lists: 12 doubly-linked lists organized by power-of-two size classes. Need a 64-byte block? Go straight to the 64-byte list. This eliminates scanning through blocks that are too small - the right size class is O(1) to identify."
      },
      {
        title: "Quick Lists for Hot Paths",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Programs often allocate and free the same sizes repeatedly (think of a loop that creates and destroys temporary objects). Quick lists are LIFO caches for recently freed small blocks (32-176 bytes). A quick list allocation is literally just popping from a singly-linked list - no searching, no splitting, no coalescing. Pure O(1)."
      },
      {
        type: 'list',
        content: [
          "10 quick lists for sizes 32, 48, 64, 80, 96, 112, 128, 144, 160, 176 bytes",
          "LIFO ordering: most recently freed block is allocated first (cache-hot)",
          "Capacity limit (QUICK_LIST_MAX) triggers batch flush to segregated lists",
          "Deferred coalescing: quick list blocks aren't coalesced until flushed"
        ]
      },
      {
        title: "Block Header Design",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Every allocated block needs metadata: how big is it? Is it currently in use? The challenge is minimizing this overhead while maintaining enough information for efficient free operations. My headers pack everything into 64 bits."
      },
      {
        type: 'highlight',
        content: "Upper 32 bits: payload size (what the user requested). Lower 32 bits: block size with 16-byte alignment (always a multiple of 16, so bottom 4 bits are available for flags). Three flag bits: THIS_BLOCK_ALLOCATED, PREV_BLOCK_ALLOCATED, IN_QUICK_LIST."
      },
      {
        type: 'paragraph',
        content: "Footers mirror headers at the end of free blocks, enabling bidirectional traversal. When freeing, I can check the previous block's footer to see if it's also free (enabling backward coalescing) without maintaining back pointers."
      },
      {
        title: "Coalescing Strategy",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Memory fragmentation is the silent killer of long-running programs. You have plenty of free memory, but it's scattered in small chunks that can't satisfy large allocations. Coalescing merges adjacent free blocks to maintain large contiguous regions."
      },
      {
        type: 'list',
        content: [
          "Immediate coalescing: large blocks merge with neighbors during free()",
          "Boundary tags: footers allow O(1) backward coalescing without traversal",
          "Deferred coalescing: quick list blocks batch-merge when flushed",
          "Heap extension coalescing: new pages merge with trailing free block"
        ]
      },
      {
        title: "Security: XOR Header Obfuscation",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Heap overflow attacks often corrupt allocator metadata to achieve arbitrary write primitives. If an attacker can overflow into a header and modify the size field, they can trick the allocator into returning overlapping memory. My allocator defends against this."
      },
      {
        type: 'card',
        content: "All headers are XOR'd with a runtime-generated MAGIC constant before storage. An attacker who overflows a buffer will corrupt the encoded header, but won't know the MAGIC value needed to create valid replacement metadata. On free(), the allocator validates the decoded header and aborts on corruption."
      },
      {
        type: 'list',
        content: [
          "MAGIC constant generated at runtime (heap-based, unpredictable)",
          "XOR encoding makes header forgery computationally infeasible",
          "Prologue/epilogue guards detect overflow past heap boundaries",
          "Extensive validation: pointer range, alignment, state flags",
          "Fail-fast: corruption detection triggers immediate abort"
        ]
      },
      {
        title: "Performance Metrics",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "The allocator tracks two key metrics for analysis. Utilization (peak payload bytes / total heap size) measures how efficiently we're using memory. Fragmentation (allocated payload / total allocated space including headers) measures per-block overhead."
      },
      {
        type: 'tech-grid',
        content: ["C", "x86-64", "Pointer Arithmetic", "Bit Manipulation", "Segregated Free Lists", "Boundary Tags", "XOR Obfuscation"]
      }
    ]
  },
  "concurrent-game-server": {
    overline: "Systems Programming",
    subtitle: "A multi-threaded C game server with reference-counted thread safety, custom binary protocols, and signal-based inter-thread combat",
    readTime: "7 min read",
    lastUpdated: "December 2025",
    sections: [
      {
        type: 'lead',
        content: "Real-time multiplayer games require precise synchronization. Every connected player must see a consistent world state while simultaneously receiving input and sending updates. One race condition, one deadlock, and the whole server crashes. MazeWar handles dozens of concurrent players with thread-per-client architecture and POSIX signal-driven combat."
      },
      {
        type: 'paragraph',
        content: "This server implements a complete multiplayer maze game where players navigate a shared environment and fire lasers at each other. The technical challenge isn't the game logic - it's making that logic work correctly across threads that are all accessing shared state simultaneously."
      },
      {
        title: "Threading Model",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Each client connection spawns a dedicated pthread running the mzw_client_service function. Threads are created detached for automatic cleanup - when a client disconnects, the thread terminates and its resources are freed without explicit join. This scales to the number of concurrent connections the OS can handle."
      },
      {
        type: 'card',
        content: "Thread-local storage via __thread qualifier gives each thread fast access to its player object without passing parameters through every function call. This is critical for the signal handler - when a SIGUSR1 arrives indicating a laser hit, the handler needs to know which player was hit without any context."
      },
      {
        title: "Synchronization Strategy",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Shared state requires mutual exclusion. My approach uses fine-grained locking with recursive mutexes. Each player object has its own mutex, allowing concurrent operations on different players. The recursive type permits nested lock acquisition for complex operations."
      },
      {
        type: 'list',
        content: [
          "PTHREAD_MUTEX_RECURSIVE allows same thread to reacquire held locks",
          "Per-player mutexes minimize contention compared to global lock",
          "Global map mutex protects player registry during login/logout",
          "Reference counting (player_ref/player_unref) prevents use-after-free",
          "Deferred deallocation: objects freed only when refcount hits zero"
        ]
      },
      {
        title: "Signal-Based Combat System",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Here's where it gets interesting. When Player A fires a laser that hits Player B, how does B's thread know it was hit? B's thread might be blocked waiting for network input. I can't just set a flag - B won't see it until the blocking recv returns."
      },
      {
        type: 'highlight',
        content: "The solution: POSIX signals. When A hits B, A's thread calls pthread_kill(B_thread, SIGUSR1). This interrupts whatever B is doing - even a blocking system call - and runs B's signal handler. The handler sets a volatile sig_atomic_t flag that B checks after the interrupted call returns."
      },
      {
        type: 'paragraph',
        content: "The double-check pattern ensures hits aren't missed. Before calling the blocking recv, check the hit flag. After recv returns (possibly interrupted by signal), check again. This handles the race between checking and blocking."
      },
      {
        title: "Binary Protocol",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "The client-server protocol uses structured binary packets, not text. Each packet has a type field (LOGIN, MOVE, TURN, FIRE, REFRESH, SEND) followed by type-specific payload. Binary is more compact than JSON and eliminates parsing overhead - critical for real-time responsiveness."
      },
      {
        type: 'list',
        content: [
          "Fixed-size packet headers for efficient parsing",
          "Type-specific payloads with defined wire format",
          "Validation of all incoming data before processing",
          "Graceful handling of malformed packets (disconnect, don't crash)",
          "Little-endian byte order throughout"
        ]
      },
      {
        title: "View Optimization",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Players need to see the maze around them, but sending the entire view on every frame wastes bandwidth. The server maintains a view cache per player and only transmits cells that changed since the last update. A validity depth field tracks when full refresh is needed (after teleportation or respawn)."
      },
      {
        type: 'tech-grid',
        content: ["C", "POSIX Threads", "POSIX Signals", "TCP Sockets", "Binary Protocols", "Recursive Mutexes", "Reference Counting"]
      }
    ]
  },
  "movie-revenue-prediction": {
    overline: "Machine Learning",
    subtitle: "An end-to-end ML pipeline with 100+ engineered features, achieving $30.5M MAE on box office revenue prediction",
    readTime: "6 min read",
    lastUpdated: "November 2025",
    sections: [
      {
        type: 'lead',
        content: "Hollywood studios spend hundreds of millions on films that sometimes flop spectacularly. Can machine learning predict box office success before a single ticket is sold? Using the TMDB 5000 dataset, I built a pipeline that predicts theatrical revenue with a mean absolute error of just $30.5 million - on movies that average $82 million in revenue."
      },
      {
        type: 'paragraph',
        content: "The magic isn't in the model - a standard Random Forest outperforms fancier approaches. The magic is in feature engineering. I extracted over 100 features from raw movie metadata, capturing everything from director track records to release timing patterns to cast synergies."
      },
      {
        title: "Data Pipeline",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "The TMDB 5000 dataset contains 4,803 movies with JSON-encoded cast, crew, genre, and production company data. Raw data is messy - movies with $0 budget (data errors), outlier blockbusters that skew models, foreign films with different economics. The cleaning pipeline filters to 4,504 validated observations."
      },
      {
        type: 'list',
        content: [
          "Budget filter: $0 < budget <= $175M (removes data errors and mega-blockbusters)",
          "Revenue filter: $0 < revenue <= $700M (removes unreported and extreme outliers)",
          "Runtime filter: 60-200 minutes (removes shorts and director's cuts)",
          "Vote filter: Average 3.5-8.3, count <= 8000 (removes unreliable ratings)"
        ]
      },
      {
        title: "Feature Engineering (100+ Features)",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Raw features like 'budget' and 'runtime' are just the start. The real predictive power comes from derived features that encode domain knowledge about what makes movies successful."
      },
      {
        type: 'card',
        content: "Prestige Indicators: Is the director a proven hitmaker (5+ films over $100M)? Does the cast include A-list talent? What's the studio's historical average revenue? These categorical signals capture industry dynamics that raw numbers miss."
      },
      {
        title: "Structural Parsing",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "The JSON fields contain rich structured data. Genre lists become binary indicators - is_action, is_comedy, is_drama. Production companies get parsed for studio identification. Cast lists are processed for billing order and star power. Crew data extracts director and key department heads."
      },
      {
        type: 'list',
        content: [
          "Genre extraction: 20 binary indicators for genre combinations",
          "Studio identification: major studio vs. independent production",
          "Cast processing: lead actor popularity, ensemble vs. star vehicle",
          "Director features: historical average, genre expertise, recent momentum",
          "Franchise detection: sequel/prequel identification from keywords"
        ]
      },
      {
        title: "Temporal Features",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "When a movie releases matters enormously. Summer blockbuster season, holiday releases, and awards season all have different dynamics. I engineered features for day-of-week, month, season, and specific windows like spring break."
      },
      {
        type: 'list',
        content: [
          "Day-of-week: Friday releases outperform mid-week",
          "Seasonal flags: summer (May-Aug), holiday (Nov-Dec), spring break",
          "Competition density: how crowded is the release window?",
          "5-year period bins: capturing changing industry economics"
        ]
      },
      {
        title: "Interaction Terms",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Features interact. A big budget helps more when combined with a famous director. Star power matters more for certain genres. I engineered 12+ interaction terms to capture these synergies: budget_x_popularity, franchise_x_famous_actor, genre_x_season."
      },
      {
        type: 'highlight',
        content: "Polynomial features add non-linearity. Budget has diminishing returns - the difference between $50M and $100M matters more than $150M to $200M. Squared terms and log transforms capture these curves."
      },
      {
        title: "Model Comparison",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "I evaluated three models with rigorous cross-validation. Linear Regression provides interpretable coefficients but assumes linearity. K-Nearest Neighbors captures local patterns but struggles with high-dimensional feature space. Random Forest wins on accuracy while remaining interpretable through feature importance."
      },
      {
        type: 'list',
        content: [
          "Linear Regression: MAE $36.1M, R-squared 0.769",
          "K-NN (k=5): MAE $41.3M, R-squared 0.613",
          "Random Forest (200 trees): MAE $30.5M, R-squared 0.752"
        ]
      },
      {
        type: 'paragraph',
        content: "The Random Forest's cross-validation R-squared (0.7548) matches test performance (0.7536), confirming we haven't overfit. Feature importance reveals budget, popularity, and franchise status as the strongest predictors - matching industry intuition."
      },
      {
        type: 'tech-grid',
        content: ["Python", "scikit-learn", "Pandas", "NumPy", "Feature Engineering", "Random Forest", "Cross-Validation"]
      }
    ]
  },
  "spectrum-analyzer": {
    overline: "Scientific Computing",
    subtitle: "Processing real James Webb Space Telescope data to render interactive 3D visualizations of exoplanet atmospheres",
    readTime: "6 min read",
    lastUpdated: "September 2025",
    sections: [
      {
        type: 'lead',
        content: "The James Webb Space Telescope is revolutionizing our understanding of distant worlds by analyzing the light that passes through exoplanet atmospheres. That data arrives in specialized FITS files that most software can't read. I built a tool that processes actual JWST observations and renders them as interactive 3D visualizations anyone can explore."
      },
      {
        type: 'paragraph',
        content: "This isn't simulated data or toy examples - it's real observations from humanity's most advanced space telescope. The technical challenge is bridging the gap between astrophysics data formats and accessible web visualization."
      },
      {
        title: "FITS File Processing",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "FITS (Flexible Image Transport System) is the standard format for astronomical data. These files contain multi-dimensional arrays with extensive metadata headers - not something you can open in Excel. My parser uses Astropy to read FITS files, targeting the 'EXTRACT1D' extension that contains spectral data."
      },
      {
        type: 'card',
        content: "Each observation contains wavelength and flux arrays. Wavelength tells you what color of light you're measuring (in micrometers). Flux tells you how much light at that wavelength. Dips in the flux at specific wavelengths indicate absorption by molecules in the exoplanet's atmosphere - methane, carbon dioxide, water vapor."
      },
      {
        title: "Data Pipeline",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Raw spectral data is noisy. My pipeline applies several transformations to make patterns visible: interpolation to a common wavelength grid, normalization by median flux, sigma clipping to remove outliers, and Gaussian smoothing to reduce noise."
      },
      {
        type: 'list',
        content: [
          "Interpolation: 1000-point common grid spanning full wavelength range",
          "Normalization: divide by median to show relative variations",
          "Sigma clipping: 3-sigma outlier rejection, replace with local median",
          "Gaussian smoothing: configurable window for noise reduction",
          "Parallel binning: ThreadPoolExecutor for multi-core processing"
        ]
      },
      {
        title: "3D Visualization",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Multiple observations over time create a 3D dataset: wavelength (x), time (y), flux (z). Plotly.js renders this as an interactive surface plot. Users can rotate, zoom, and identify features. Color mapping highlights variability - regions where the flux changes between observations."
      },
      {
        type: 'highlight',
        content: "Custom spectral band masking isolates specific molecules. The CH4 band (2.14-2.50 micrometers) shows methane absorption. The CO band (4.50-5.05 micrometers) shows carbon monoxide. Separate surface layers let users toggle these regions on and off."
      },
      {
        title: "Interactive Features",
        type: 'subheading',
        content: ""
      },
      {
        type: 'list',
        content: [
          "Dual-layer rendering: colored data surface with semi-transparent overlay",
          "Heatmap view with time-range sliders for temporal selection",
          "Camera presets: top-down, side view, custom angles",
          "Unit conversion: micrometers, nanometers, Angstroms",
          "Variability calculation: (flux - 1) * 100% for percentage deviation",
          "Standalone HTML export: downloadable files for offline viewing"
        ]
      },
      {
        type: 'tech-grid',
        content: ["Python", "Flask", "Astropy", "Plotly.js", "NumPy", "SciPy", "ThreadPoolExecutor", "FITS Format"]
      }
    ]
  },
  "fairshare": {
    overline: "Full-Stack Web",
    subtitle: "Expense sharing with intelligent debt simplification that minimizes total transactions",
    readTime: "5 min read",
    lastUpdated: "August 2025",
    sections: [
      {
        type: 'lead',
        content: "Living with roommates means shared expenses - rent, utilities, groceries, the occasional furniture purchase. Tracking who owes what becomes a spreadsheet nightmare. FairShare automates the accounting and, more cleverly, figures out the minimum number of payments needed to settle all debts."
      },
      {
        type: 'paragraph',
        content: "The interesting problem isn't just tracking balances - any spreadsheet does that. It's debt simplification: if Alice owes Bob $20 and Bob owes Carol $20, why should there be two payments? Alice should just pay Carol directly. Generalizing this optimization across a group is a real algorithmic challenge."
      },
      {
        title: "The Debt Simplification Problem",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Given a group where various members owe various amounts to various other members, find the minimum number of transactions to settle all debts. This is actually NP-hard in the general case, but a greedy approximation works well for typical group sizes."
      },
      {
        type: 'card',
        content: "The Algorithm: Calculate net balances (amount paid - fair share). Separate into creditors (positive balance) and debtors (negative balance). Match the largest creditor with the largest debtor. Transfer the minimum of their magnitudes. Remove settled party, repeat. The result minimizes transactions for most real-world cases."
      },
      {
        title: "Implementation",
        type: 'subheading',
        content: ""
      },
      {
        type: 'list',
        content: [
          "Per-person share: total expenses / group size",
          "Individual balance: what you paid - your fair share",
          "Greedy matching: always pair largest creditor with largest debtor",
          "Optimal transfer: min(creditor_balance, |debtor_balance|)",
          "Termination: when all balances reach zero"
        ]
      },
      {
        title: "Real-Time Balance Updates",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Expenses trigger cascading updates. Rails lifecycle callbacks recalculate group balances after every expense creation. Notifications alert affected members. Pending payments (awaiting confirmation) are handled separately from confirmed transactions."
      },
      {
        type: 'list',
        content: [
          "Expense validation: amount 0-10,000, required description and date",
          "after_create callbacks trigger notification and balance recalculation",
          "Polymorphic notifications: expense created, payment received, etc.",
          "Pending payment adjustments: temporary until counterparty confirms"
        ]
      },
      {
        type: 'tech-grid',
        content: ["Ruby on Rails", "PostgreSQL", "Tailwind CSS", "Devise Auth", "RSpec", "Heroku"]
      }
    ]
  },
  "mindmesh-ai": {
    overline: "AI Application",
    subtitle: "An argument mapping platform with fallacy detection, philosophical lens analysis, and RAG-powered citations",
    readTime: "6 min read",
    lastUpdated: "July 2025",
    sections: [
      {
        type: 'lead',
        content: "Most AI tools help you generate ideas. MindMesh helps you stress-test them. Give it an argument, and it generates counter-arguments. Claim those are weak? It analyzes them for logical fallacies. Want to see your idea through different philosophical lenses? It applies utilitarian, Kantian, Nietzschean, and empirical frameworks."
      },
      {
        type: 'paragraph',
        content: "The goal isn't to win debates - it's to think better. By externalizing the process of argument analysis, MindMesh makes it easier to identify weaknesses in your own reasoning before someone else does."
      },
      {
        title: "Argument Tree Generation",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Start with a claim. The system generates an argument tree: your root claim plus three counter-arguments, each with strength scores (0-100). Accept or reject counters. Accepted nodes spawn their own counters. The tree grows as you explore the argument space."
      },
      {
        type: 'card',
        content: "NodeSchema captures the structure: text, type (claim/counter), strength score, fallacy array, and hierarchical children. The tree is a proper data structure - you can export it, revisit it, extend it across sessions."
      },
      {
        title: "Fallacy Detection",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "The audit endpoint recursively analyzes the tree for logical fallacies. It identifies overgeneralization, ad hominem attacks, strawmen, circular reasoning, slippery slopes, false causes, and appeals to authority. Each finding includes the node ID, fallacy type, severity, and a suggestion for strengthening the argument."
      },
      {
        type: 'list',
        content: [
          "Ad hominem: attacking the person instead of the argument",
          "Strawman: misrepresenting the opposing position",
          "Circular reasoning: conclusion assumes premise",
          "Slippery slope: unjustified chain of consequences",
          "False cause: correlation confused with causation",
          "Appeal to authority: expertise in unrelated domain"
        ]
      },
      {
        title: "Multi-Lens Analysis",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Different philosophical frameworks evaluate arguments differently. The lens endpoint applies multiple perspectives to your claim: Utilitarian (what produces the most good?), Kantian (what if everyone did this?), Nietzschean (does this serve strength and self-actualization?), and Empirical (what does the evidence say?)."
      },
      {
        type: 'highlight',
        content: "This isn't just academic exercise. Understanding how different frameworks evaluate your idea reveals assumptions you might not have noticed. A utilitarian might approve what a Kantian rejects - and understanding why sharpens your thinking."
      },
      {
        title: "Citation Pipeline",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Arguments without evidence are just opinions. The research endpoint uses RAG (Retrieval-Augmented Generation) to find supporting citations. Results include URL, title, tier (A/B/C based on source credibility), and confidence score. The system distinguishes between peer-reviewed sources, reputable journalism, and blog posts."
      },
      {
        type: 'tech-grid',
        content: ["FastAPI", "Python", "GPT-4", "RAG Pipeline", "Pydantic", "React (planned)", "D3.js (planned)"]
      }
    ]
  },
  "versecraft": {
    overline: "Full-Stack Web",
    subtitle: "A literary social platform combining infinite-scroll poetry consumption with ambient audio and social discovery",
    readTime: "5 min read",
    lastUpdated: "December 2025",
    sections: [
      {
        type: 'lead',
        content: "What if you could doom-scroll through poetry? VerseCraft reimagines literary consumption for the attention-span-challenged generation - an infinite scroll of poems and prose fragments, each presented with the typographic care it deserves, accompanied by ambient music that sets the mood."
      },
      {
        type: 'paragraph',
        content: "This isn't just a poetry website. It's a complete social platform with authors, followers, likes, saves, and nested comments. The New Yorker-inspired aesthetic isn't decoration - it's a statement that digital literature deserves the same presentation quality as print."
      },
      {
        title: "Database Architecture",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Built on Drizzle ORM with PostgreSQL, the schema models a complete literary social network. Authors have biographies, eras, nationalities, and follower counts. Posts come in three types: poetry, prose, and quotes. Social relationships (follows, likes, saves) use composite primary keys to prevent duplicates."
      },
      {
        type: 'list',
        content: [
          "Authors table: biography, era, nationality, works count, followers count",
          "Posts table: type (poetry/prose/quote), linked to user or author, engagement metrics",
          "Social tables: authorFollows, likes, saves, follows - all with composite PKs",
          "Comments: nested structure with parent-child relationships",
          "User preferences: JSONB column for era/style preferences"
        ]
      },
      {
        title: "The Reading Experience",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Typography is the interface. The font stack, line height, and measure (line length) are all optimized for reading verse. Poems get different treatment than prose - stanza breaks matter, line breaks are intentional, the whitespace around the text creates breathing room."
      },
      {
        type: 'card',
        content: "The MusicPlayer component provides ambient audio - background tracks that match the mood of what you're reading. It's subtle, optional, and enhances rather than distracts. Think coffee shop ambiance, not distracting pop music."
      },
      {
        title: "PWA Capabilities",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "VerseCraft is a Progressive Web App - installable on mobile, works offline (for cached content), sends push notifications for new posts from followed authors. The manifest.json and service worker enable native-app-like experience without App Store gatekeeping."
      },
      {
        type: 'tech-grid',
        content: ["Next.js 14", "TypeScript", "Drizzle ORM", "PostgreSQL", "Tailwind CSS", "Framer Motion", "PWA"]
      }
    ]
  },
  "energy-demand-prediction": {
    overline: "Machine Learning",
    subtitle: "Weather-driven residential energy forecasting with appliance-level load profiling",
    readTime: "4 min read",
    lastUpdated: "October 2025",
    sections: [
      {
        type: 'lead',
        content: "Energy demand isn't random - it follows patterns driven by weather, time of day, and human behavior. Accurate forecasting helps utilities optimize grid operations, reduces costs, and enables better integration of renewable sources. This project builds predictive models using real sensor data combined with weather observations."
      },
      {
        type: 'paragraph',
        content: "The dataset contains detailed appliance-level consumption from residential smart meters. I can see when the HVAC kicks on, when the dryer runs, when lights turn off at bedtime. Combined with hourly weather data, this enables models that predict not just total demand but the contribution of specific load types."
      },
      {
        title: "Data Pipeline",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Raw sensor data is messy - missing readings, clock drift between meters and weather stations, outliers from malfunctioning sensors. The pipeline handles missing value imputation, temporal alignment, outlier detection, and feature scaling before any modeling begins."
      },
      {
        type: 'list',
        content: [
          "Missing value imputation: forward-fill for short gaps, interpolation for longer",
          "Temporal alignment: resample to common hourly resolution",
          "Outlier detection: statistical bounds based on historical patterns",
          "Feature scaling: standardization for comparable feature importance"
        ]
      },
      {
        title: "Feature Engineering",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Weather features go beyond temperature. Humidity affects perceived comfort (and thus HVAC usage). Wind chill and heat index capture actual comfort conditions. Solar radiation predicts lighting needs. Change features (temperature delta from previous hour) capture ramping behavior."
      },
      {
        type: 'highlight',
        content: "Temporal features encode cyclical patterns: hour of day (one-hot or cyclic encoding), day of week, weekend flag, holiday indicators. These capture the regularity of human routines - dinner cooking at 6 PM, heating ramping up before wake-up."
      },
      {
        type: 'tech-grid',
        content: ["Python", "Pandas", "scikit-learn", "Time Series", "Regression Analysis", "Feature Engineering"]
      }
    ]
  },
  "bigminds-email-scraper": {
    overline: "Freelance Project",
    subtitle: "From email chaos to AI-powered automation—turning a 4-hour daily copy-paste nightmare into a system that processes emails while everyone sleeps",
    readTime: "20 min read",
    lastUpdated: "January 2026",
    sections: [
      {
        type: 'lead',
        content: "It started with a simple observation: Sarah, the operations manager at a pediatric therapy staffing agency, was spending 4-6 hours every single day copying and pasting data from emails into spreadsheets. Let that sink in. Half a workday. Every day. Forever."
      },
      {
        type: 'paragraph',
        content: "Her inbox was drowning in referral emails from Service Coordinators across New York City, each containing case information for children needing early intervention services. Speech therapy. Occupational therapy. Physical therapy. Specialized instruction. Real kids, real families, real urgency."
      },
      {
        title: "The Problem",
        type: 'heading',
        content: ""
      },
      {
        type: 'list',
        content: [
          "4-6 hours daily spent on manual data entry",
          "Inconsistent email formats from different Service Coordinators",
          "Human error leading to typos and missed fields",
          "No audit trail to trace data back to source emails",
          "Cases could contain 1-15 children, each needing 26 columns of data"
        ]
      },
      {
        title: "The Solution",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Built a complete automation system using Express.js, Google Gemini AI, Microsoft Graph API (for Outlook), and Google Sheets API. The system runs on Render.com with an internal cron job that processes emails every 5 minutes, extracting case data with AI, detecting duplicates, filtering garbage data, and appending directly to the client's Google Sheet."
      },
      {
        title: "Key Features",
        type: 'subheading',
        content: ""
      },
      {
        type: 'list',
        content: [
          "AI-powered extraction using Gemini 2.5 Flash for structured data parsing",
          "Two-tier duplicate detection (case_id + service_type, fallback to name + service + borough)",
          "Multi-layer garbage filtering to catch invalid data before it reaches production",
          "Append-only architecture—never overwrites existing sheet data",
          "Comprehensive logging for debugging and audit trails",
          "Automatic processing every 5 minutes with redundant cron jobs"
        ]
      },
      {
        title: "Results",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "The system saves 4 hours of daily manual work, processes emails in 3-5 seconds (vs 15-20 minutes manually), and achieves ~98% extraction accuracy. Most importantly, it removes a soul-crushing task that made people dread Monday mornings."
      },
      {
        type: 'tech-grid',
        content: ["Express.js", "Google Gemini AI", "Microsoft Graph API", "Google Sheets API", "PostgreSQL", "Render.com", "node-cron"]
      }
    ]
  },
  "reddit-clone": {
    overline: "Full-Stack Web",
    subtitle: "A full-featured social platform with real-time updates, nested threading, and karma mechanics",
    readTime: "4 min read",
    lastUpdated: "July 2025",
    sections: [
      {
        type: 'lead',
        content: "Building a Reddit clone sounds like a CRUD tutorial, but the interesting problems emerge at scale: how do you implement infinite nested comments efficiently? How do real-time upvotes work without hammering the database? How does karma calculation avoid race conditions?"
      },
      {
        type: 'paragraph',
        content: "This clone implements the core Reddit experience: communities (subreddits), posts with upvotes/downvotes, infinitely nested comment threads, user karma tracking, and real-time updates via WebSockets."
      },
      {
        title: "Nested Comments",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Reddit's comment threading allows unlimited depth. Naive implementations make N database queries to render N comments. My approach uses materialized paths - each comment stores its full ancestry as a string (like '1.4.7.12'). Fetching all comments for a post is one query; rendering the tree is string manipulation."
      },
      {
        type: 'card',
        content: "Comment sorting by 'best' uses a Wilson score confidence interval - the same algorithm Reddit uses. It balances upvotes against total votes, giving appropriate uncertainty to comments with few votes. A 5/5 upvote comment doesn't beat a 100/110 comment."
      },
      {
        title: "Real-Time Updates",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Socket.io maintains persistent connections to all active clients. When someone upvotes a post, the server broadcasts the new score to everyone viewing that page. This creates the feeling of a live community without polling."
      },
      {
        type: 'tech-grid',
        content: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "JWT Auth", "Wilson Score"]
      }
    ]
  },
  "sam-academics": {
    overline: "Academic Software",
    subtitle: "A comprehensive academic lifecycle management platform built with concept-driven design",
    readTime: "4 min read",
    lastUpdated: "May 2025",
    sections: [
      {
        type: 'lead',
        content: "CSE 416 is Stony Brook's capstone software engineering course. Teams of five build a full-stack application over a semester. Our team built SAM - the Stony Brook Academics Manager - a platform that handles course registration, degree auditing, waitlist management, and academic planning."
      },
      {
        type: 'paragraph',
        content: "What made this project different was our design approach. We used Daniel Jackson's 'Essence of Software' methodology - identifying core concepts (Registration, Waitlist, Prerequisite, DegreeRequirement) and designing their interactions before writing code. The architecture emerged from the concepts rather than being imposed top-down."
      },
      {
        title: "Concept-Driven Architecture",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Each concept has a defined purpose, operational principle, and state. The Registration concept manages course enrollment. The Waitlist concept handles queue position when sections are full. The Prerequisite concept enforces course ordering. These compose naturally - attempting registration triggers prerequisite checking, which may result in waitlist placement."
      },
      {
        type: 'list',
        content: [
          "Concept identification: core abstractions in the domain",
          "Operational principles: how each concept behaves",
          "Composition: how concepts interact and constrain each other",
          "Synergy: emergent behavior from concept combinations"
        ]
      },
      {
        title: "Team Collaboration",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Five developers working on the same codebase for four months. We used feature branches, pull request reviews, and comprehensive testing (Jest for unit, Vitest for integration). The concept-driven design helped us work in parallel - each developer owned specific concepts without stepping on others."
      },
      {
        type: 'tech-grid',
        content: ["React", "Express", "PostgreSQL", "Google OAuth", "Jest", "Vitest", "Concept-Driven Design"]
      }
    ]
  }
};

// Default essay for projects without custom content
const defaultEssay = {
  overline: "Project",
  subtitle: "A technical deep-dive",
  readTime: "2 min read",
  lastUpdated: "2025",
  sections: [] as typeof projectEssays["prometheus"]["sections"]
};

export function ProjectEssay({ project }: ProjectEssayProps) {
  const essay = projectEssays[project.id] || defaultEssay;

  // Generate default sections if no essay exists
  const sections = essay.sections.length > 0 ? essay.sections : [
    {
      type: 'lead' as const,
      content: project.narrative || project.description
    },
    {
      type: 'paragraph' as const,
      content: project.description
    },
    {
      title: 'Technologies Used',
      type: 'heading' as const,
      content: ''
    },
    {
      type: 'tech-grid' as const,
      content: project.tech
    }
  ];

  const categoryLabels: Record<string, string> = {
    systems: "Systems Programming",
    ml: "Machine Learning",
    web: "Full-Stack Development",
    tools: "Tools & Experiments",
    ai: "AI & Infrastructure"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="pt-24 pb-32 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-sans text-sm text-foreground-muted hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16 pb-12 border-b border-border"
          >
            <p className="font-sans text-xs font-medium tracking-wider uppercase text-accent mb-4">
              {essay.overline || categoryLabels[project.category]}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-6 text-foreground">
              {project.title}
            </h1>
            <p className="font-body text-xl text-foreground-secondary leading-relaxed max-w-2xl">
              {essay.subtitle || project.narrative || project.description}
            </p>
            <div className="flex items-center gap-6 mt-8 text-foreground-muted font-sans text-sm">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {essay.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {essay.lastUpdated}
              </span>
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Source
                </Link>
              )}
              {project.live && (
                <Link
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live
                </Link>
              )}
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose-custom"
          >
            {sections.map((section, index) => (
              <EssaySection key={index} section={section} index={index} />
            ))}
          </motion.article>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-sans text-sm text-foreground-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}

function EssaySection({ section, index }: { section: typeof projectEssays["prometheus"]["sections"][0], index: number }) {
  const delay = 0.05 * index;

  switch (section.type) {
    case 'lead':
      return (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="font-body text-xl leading-relaxed text-foreground mb-8"
        >
          {section.content as string}
        </motion.p>
      );

    case 'heading':
      return (
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="font-display text-2xl font-medium tracking-tight mt-12 mb-6 text-foreground"
        >
          {section.title}
        </motion.h2>
      );

    case 'subheading':
      return (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="font-sans text-xs font-medium tracking-wider uppercase text-accent mt-10 mb-4"
        >
          {section.title}
        </motion.h3>
      );

    case 'paragraph':
      return (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="font-body text-foreground-secondary leading-relaxed mb-6"
        >
          {section.content as string}
        </motion.p>
      );

    case 'list':
      return (
        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="font-body text-foreground-secondary leading-relaxed mb-8 space-y-3 pl-0"
        >
          {(section.content as string[]).map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <ChevronRight className="w-4 h-4 text-accent mt-1.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </motion.ul>
      );

    case 'quote':
      return (
        <motion.blockquote
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="border-l-[3px] border-accent pl-6 my-10 italic text-foreground-secondary font-body text-lg"
        >
          {section.content as string}
        </motion.blockquote>
      );

    case 'card':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="bg-background-secondary border border-border rounded-lg p-6 my-8"
        >
          <p className="font-body text-foreground-secondary leading-relaxed m-0">
            {section.content as string}
          </p>
        </motion.div>
      );

    case 'highlight':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="bg-accent/10 border-l-4 border-accent pl-6 pr-6 py-5 my-8 rounded-r-lg"
        >
          <p className="font-body text-foreground leading-relaxed m-0">
            {section.content as string}
          </p>
        </motion.div>
      );

    case 'tech-grid':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="flex flex-wrap gap-2 mt-8 mb-6"
        >
          {(section.content as string[]).map((tech, i) => (
            <span
              key={tech}
              className="px-3 py-1.5 font-sans text-sm rounded-full bg-background-secondary text-foreground-muted border border-border"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      );

    case 'flow':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="flex flex-wrap items-center justify-center gap-2 my-10 font-sans text-sm"
        >
          {(section.content as string[]).map((step, i, arr) => (
            <span key={i} className="flex items-center gap-2">
              <span className="px-4 py-2 rounded-lg bg-background-secondary border border-border text-foreground">
                {step}
              </span>
              {i < arr.length - 1 && (
                <ChevronRight className="w-4 h-4 text-foreground-muted" />
              )}
            </span>
          ))}
        </motion.div>
      );

    default:
      return null;
  }
}
