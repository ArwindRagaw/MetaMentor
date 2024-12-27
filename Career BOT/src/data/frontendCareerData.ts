export interface SalaryRange {
  level: string;
  experience: string;
  salaryRange: string;
  skills: string[];
}

export interface AgeGuidance {
  ageRange: string;
  recommendations: string[];
  learningPath: string[];
}

export const frontendSalaryData: SalaryRange[] = [
  {
    level: "Beginner",
    experience: "0-2 years",
    salaryRange: "$50,000 - $75,000",
    skills: ["HTML", "CSS", "JavaScript", "Basic React", "Responsive Design"]
  },
  {
    level: "Intermediate",
    experience: "2-5 years",
    salaryRange: "$75,000 - $120,000",
    skills: ["Advanced React", "TypeScript", "State Management", "Testing", "Performance Optimization"]
  },
  {
    level: "Senior",
    experience: "5+ years",
    salaryRange: "$120,000 - $180,000",
    skills: ["Architecture Design", "Team Leadership", "Advanced Performance", "System Design", "Mentoring"]
  },
  {
    level: "Lead/Architect",
    experience: "8+ years",
    salaryRange: "$150,000 - $250,000",
    skills: ["Technical Leadership", "Architecture Planning", "Team Management", "Strategic Planning", "Cross-team Collaboration"]
  }
];

export const ageBasedGuidance: AgeGuidance[] = [
  {
    ageRange: "13-17",
    recommendations: [
      "Focus on basic web development fundamentals",
      "Start with HTML, CSS, and basic JavaScript",
      "Build simple personal projects",
      "Join coding communities and forums",
      "Consider taking free online courses"
    ],
    learningPath: [
      "Learn basic HTML and CSS",
      "Introduction to JavaScript",
      "Basic responsive design",
      "Simple project building",
      "Version control basics"
    ]
  },
  {
    ageRange: "18-24",
    recommendations: [
      "Pursue formal education or bootcamps",
      "Build a strong portfolio",
      "Learn modern frameworks like React",
      "Start contributing to open source",
      "Network with other developers"
    ],
    learningPath: [
      "Advanced JavaScript concepts",
      "React fundamentals",
      "State management",
      "Testing basics",
      "Portfolio development"
    ]
  },
  {
    ageRange: "25+",
    recommendations: [
      "Focus on specialized skills",
      "Learn enterprise-level development",
      "Develop leadership abilities",
      "Consider consulting opportunities",
      "Build expertise in specific domains"
    ],
    learningPath: [
      "Advanced frameworks",
      "Architecture patterns",
      "Team leadership",
      "System design",
      "Technical writing"
    ]
  }
];