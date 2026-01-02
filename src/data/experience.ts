import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    company: "Beyer Blinder Belle",
    role: "Design & Construction Technology Intern",
    period: "June 2024 - August 2024",
    location: "New York, NY",
    description: [
      "Automated BIM file management using Python (Tkinter GUI) to replace Excel Macros and MS Power Automate flows",
      "Scheduled Python scripts with Windows Task Scheduler for enhanced reliability, complete with logging and alerts",
      "Integrated SQLite and PowerBI for streamlined data storage, documentation, and meta-health dashboards",
    ],
    tech: ["Python", "Tkinter", "SQLite", "PowerBI", "Automation"],
  },
  {
    company: "The Hardy Group",
    role: "Marketing Intern",
    period: "October 2023 - December 2023",
    location: "New York, NY",
    description: [
      "Migrated customer data to Airtable for improved data management and accuracy",
      "Analyzed duplicate records in a 13,000-client database to enhance data integrity",
      "Streamlined marketing workflows through automation and data organization",
    ],
    tech: ["Airtable", "Excel", "Data Analysis"],
  },
  {
    company: "International Socioeconomic Laboratory & Finxerunt",
    role: "Web Developer",
    period: "May 2022 - April 2023",
    location: "Remote",
    description: [
      "Led a Harvard-affiliated research project focused on socioeconomic issues and civic activism",
      "Transitioned ISL's website from SquareSpace to a self-hosted domain, cutting costs and boosting performance",
      "Mentored a team of 10 in React, HTML, and CSS to design Finxerunt's website",
    ],
    tech: ["React", "HTML", "CSS", "JavaScript", "WordPress"],
  },
];
