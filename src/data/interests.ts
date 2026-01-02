import type { Book, Media, Course } from "@/types";

export const books: Book[] = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    status: "completed",
    rating: 5,
    thoughts: "Essential reading for any developer. Changed how I think about writing maintainable code.",
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    status: "reading",
    thoughts: "Deep dive into distributed systems. Dense but incredibly valuable.",
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    status: "completed",
    rating: 5,
    thoughts: "Timeless wisdom on software craftsmanship.",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    status: "completed",
    rating: 4,
    thoughts: "Practical framework for building good habits and breaking bad ones.",
  },
  {
    title: "System Design Interview",
    author: "Alex Xu",
    status: "reading",
    thoughts: "Great for understanding large-scale system architecture.",
  },
];

export const media: Media[] = [
  {
    title: "Mr. Robot",
    type: "show",
    status: "completed",
    rating: 5,
    year: "2015-2019",
    thoughts: "The most technically accurate hacking show ever made. Incredible storytelling.",
  },
  {
    title: "Silicon Valley",
    type: "show",
    status: "completed",
    rating: 4,
    year: "2014-2019",
    thoughts: "Hilariously accurate satire of tech startup culture.",
  },
  {
    title: "The Social Network",
    type: "movie",
    status: "completed",
    rating: 5,
    year: "2010",
    thoughts: "Fincher's masterpiece about the birth of Facebook.",
  },
  {
    title: "Black Mirror",
    type: "show",
    status: "watching",
    year: "2011-present",
    thoughts: "Thought-provoking exploration of technology's dark side.",
  },
  {
    title: "Severance",
    type: "show",
    status: "completed",
    rating: 5,
    year: "2022-present",
    thoughts: "Mind-bending workplace thriller. Absolutely brilliant.",
  },
];

export const courses: Course[] = [
  {
    title: "CS50: Introduction to Computer Science",
    platform: "Harvard/edX",
    instructor: "David Malan",
    status: "completed",
    topics: ["C", "Python", "SQL", "Web Development"],
    thoughts: "The best intro CS course. David Malan is an incredible educator.",
  },
  {
    title: "Full Stack Open",
    platform: "University of Helsinki",
    status: "completed",
    topics: ["React", "Node.js", "MongoDB", "GraphQL", "TypeScript"],
    link: "https://fullstackopen.com",
    thoughts: "Comprehensive modern web development curriculum.",
  },
  {
    title: "Machine Learning Specialization",
    platform: "Coursera",
    instructor: "Andrew Ng",
    status: "in-progress",
    topics: ["Supervised Learning", "Neural Networks", "Decision Trees"],
    thoughts: "The gold standard for learning ML fundamentals.",
  },
  {
    title: "Nand to Tetris",
    platform: "Coursera",
    status: "want-to-take",
    topics: ["Computer Architecture", "Hardware", "Compilers"],
    thoughts: "Build a computer from first principles. On my list!",
  },
];

export const currentlyReading = books.filter((b) => b.status === "reading");
export const currentlyWatching = media.filter((m) => m.status === "watching");
export const currentlyLearning = courses.filter((c) => c.status === "in-progress");
