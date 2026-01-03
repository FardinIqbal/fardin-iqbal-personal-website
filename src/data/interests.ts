import type { Book, Media, Course } from "@/types";

export const books: Book[] = [
  // Currently Reading
  {
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    status: "reading",
    thoughts: "Dostoevsky's magnum opus. The Grand Inquisitor chapter alone is worth the read.",
  },
  {
    title: "Godel, Escher, Bach",
    author: "Douglas Hofstadter",
    status: "reading",
    thoughts: "Strange loops, consciousness, and the nature of mind. Dense but rewarding.",
  },

  // Completed - Favorites
  {
    title: "Stoner",
    author: "John Williams",
    status: "completed",
    rating: 5,
    thoughts: "A quiet life lived fully. The kind of book that redefines what 'success' means.",
  },
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    status: "completed",
    rating: 5,
    thoughts: "The psychology of guilt and redemption. Dostoevsky sees into the soul.",
  },
  {
    title: "Notes from Underground",
    author: "Fyodor Dostoevsky",
    status: "completed",
    rating: 5,
    thoughts: "The original anti-hero. Uncomfortable because I recognized myself.",
  },
  {
    title: "One Hundred Years of Solitude",
    author: "Gabriel Garcia Marquez",
    status: "completed",
    rating: 5,
    thoughts: "Magical realism that feels more real than realism. Every page is a fever dream.",
  },
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    status: "completed",
    rating: 5,
    thoughts: "A Roman emperor's private journal. The original self-help book.",
  },
  {
    title: "Man's Search for Meaning",
    author: "Viktor Frankl",
    status: "completed",
    rating: 5,
    thoughts: "Suffering is inevitable; meaning is a choice. Perspective reset.",
  },
  {
    title: "The Stranger",
    author: "Albert Camus",
    status: "completed",
    rating: 5,
    thoughts: "Meursault's detachment is either terrifying or liberating.",
  },
  {
    title: "Siddhartha",
    author: "Hermann Hesse",
    status: "completed",
    rating: 5,
    thoughts: "Everyone must find their own path. The river metaphor stays with you.",
  },
  {
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    status: "completed",
    rating: 5,
    thoughts: "The ultimate revenge fantasy. 1000+ pages that never drag.",
  },
  {
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    status: "completed",
    rating: 5,
    thoughts: "The first modern novel. Mad, yes—but the only one truly alive.",
  },
];

export const media: Media[] = [
  // Currently Watching
  {
    title: "Shogun",
    type: "show",
    status: "watching",
    year: "2024",
    thoughts: "Epic historical drama. Patience and political intrigue at its finest.",
  },

  // Completed - Favorites
  {
    title: "Jiro Dreams of Sushi",
    type: "documentary",
    status: "completed",
    rating: 5,
    year: "2011",
    thoughts: "The pursuit of mastery. Watch this when you need to remember what dedication looks like.",
  },
  {
    title: "The Last Dance",
    type: "documentary",
    status: "completed",
    rating: 5,
    year: "2020",
    thoughts: "Jordan's relentless drive is both inspiring and terrifying.",
  },
  {
    title: "Whiplash",
    type: "movie",
    status: "completed",
    rating: 5,
    year: "2014",
    thoughts: "Is greatness worth destroying yourself? The ending still gives chills.",
  },
  {
    title: "Succession",
    type: "show",
    status: "completed",
    rating: 5,
    year: "2018-2023",
    thoughts: "Power, family dysfunction, Shakespearean tragedy. The writing is unreal.",
  },
  {
    title: "Mr. Robot",
    type: "show",
    status: "completed",
    rating: 5,
    year: "2015-2019",
    thoughts: "The most technically accurate hacking show ever made.",
  },
  {
    title: "The Social Network",
    type: "movie",
    status: "completed",
    rating: 5,
    year: "2010",
    thoughts: "Fincher's masterpiece. The loneliness at the top, captured perfectly.",
  },
  {
    title: "Fight Club",
    type: "movie",
    status: "completed",
    rating: 5,
    year: "1999",
    thoughts: "Masculinity, consumerism, identity. Dangerous if misunderstood.",
  },
  {
    title: "Free Solo",
    type: "documentary",
    status: "completed",
    rating: 5,
    year: "2018",
    thoughts: "Alex Honnold climbing El Capitan without ropes. Pure commitment.",
  },
  {
    title: "Stutz",
    type: "documentary",
    status: "completed",
    rating: 5,
    year: "2022",
    thoughts: "Phil Stutz's tools for living. The 'Life Force' concept hit different.",
  },
];

export const courses: Course[] = [
  // In Progress
  {
    title: "BJJ Blue Belt Curriculum",
    platform: "Stony Brook BJJ Club",
    instructor: "Self-directed",
    status: "in-progress",
    topics: ["Guard Passing", "Submissions", "Competition Strategy"],
    thoughts: "Teaching beginners has refined my own fundamentals.",
  },
  {
    title: "Philosophy of Mind",
    platform: "Self-study",
    instructor: "Dennett, Chalmers, Hofstadter",
    status: "in-progress",
    topics: ["Consciousness", "Free Will", "Identity", "AI"],
    thoughts: "What is a mind? These questions don't have answers, but asking them changes you.",
  },
  {
    title: "Market Structure & Trading",
    platform: "Self-study + Paper Trading",
    status: "in-progress",
    topics: ["Technical Analysis", "Risk Management", "Psychology"],
    thoughts: "Markets as a teacher of humility. Every trade is a lesson.",
  },

  // Completed
  {
    title: "Full Stack Open",
    platform: "University of Helsinki",
    status: "completed",
    topics: ["React", "Node.js", "MongoDB", "GraphQL", "TypeScript"],
    link: "https://fullstackopen.com",
    thoughts: "The foundation for everything I build now. Free and better than bootcamps.",
  },
  {
    title: "CS50: Introduction to Computer Science",
    platform: "Harvard/edX",
    instructor: "David Malan",
    status: "completed",
    topics: ["C", "Python", "SQL", "Web Development"],
    link: "https://cs50.harvard.edu",
    thoughts: "Where it all started. David Malan made CS feel like magic.",
  },
];

export const currentlyReading = books.filter((b) => b.status === "reading");
export const currentlyWatching = media.filter((m) => m.status === "watching");
export const currentlyLearning = courses.filter((c) => c.status === "in-progress");
