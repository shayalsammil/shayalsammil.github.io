// All portfolio text lives here. Edit this file to update the site; the layout reads from it.
// Section order and contents follow the PROCOMM "Preparing a Portfolio" lesson.
// Online, share only your email and LinkedIn (no IC number, address, date of birth, race,
// religion or expected salary).

export const profile = {
  name: "Shayal Sammil",
  headline: "Information Technology Junior @ Temasek Polytechnic", // typed out on load
  email: "shayal.sammil@gmail.com",
  linkedin: "https://linkedin.com/in/shayal-sammil",
  linkedinLabel: "linkedin.com/in/shayal-sammil",
  // Put your résumé PDF in /public (e.g. public/resume.pdf) and set this to "/resume.pdf".
  resumeUrl: "",
  // Your photo, shown beside your name. Save it in public/images
  // (or change this path to match your file, e.g. "/images/profile.png").
  photo: "/images/profile.jpeg",
};

// Lesson: "Professional goals and objectives" come first.
// Review this wording and make it your own.
export const goals = {
  statement:
    "I study Information Technology at Temasek Polytechnic and want to build a career in FinTech, where Software Engineering meets finance. I'm looking for an internship where I can work on real products with an experienced team.",
  objectives: [
    "Deepen my technical knowledge beyond the classroom, strengthening my foundations in Software Engineering and Artificial Intelligence through hands-on projects and industry certifications.",
    "Work in FinTech, building secure and reliable systems such as payments and digital banking that people trust with their money every day.",
    "Apply what I learn in FinTech and Software Engineering to start a business of my own one day, a digital marketplace platform that connects buyers and sellers through secure, seamless transactions.",
  ],
};

export const education = [
  {
    period: "2025 to present",
    title: "Diploma in Information Technology",
    school: "School of Informatics & IT, Temasek Polytechnic",
    detail: "GPA 3.89 / 4.0",
  },
  {
    period: "2021 to 2024",
    title: "Singapore-Cambridge GCE Ordinary Level",
    school: "Changkat Changi Secondary School",
    detail: "",
  },
];

// Lesson: "Fundamental skills", a list of work-related competencies.
export const technicalSkills = [
  { title: "Languages", items: ["JavaScript", "Python", "Dart", "HTML", "CSS"] },
  { title: "Frameworks & platforms", items: ["Node.js", "Flutter", "AWS"] },
  { title: "Databases", items: ["MySQL", "MongoDB"] },
  { title: "Practices", items: ["Agile", "Scrum", "UI/UX design"] },
  { title: "Data & analytics", items: ["Excel", "Power BI", "KNIME", "Jupyter Notebook"] },
  { title: "Tools", items: ["Figma", "draw.io", "Postman", "Jira", "Cisco Packet Tracer"] },
];

export const certifications = [
  { title: "NETS QR Payment Gateway Integration", issuer: "NETS & Temasek Polytechnic" },
  { title: "Python Essential Training", issuer: "LinkedIn Learning" },
  { title: "Basic Proficiency in KNIME Analytics Platform", issuer: "KNIME" },
  { title: "Windows 11: Security", issuer: "LinkedIn Learning" },
];

// Lesson: "Project work showcasing your achievements".
// Shown on the homepage as alternating rows (image left, then right). Order here is display order.
// Images go in public/images (e.g. public/images/projects/my-app.png -> "/images/projects/my-app.png").
// The longer write-ups for each project are kept in project-case-studies.md (not shown on the site).
export type Project = {
  title: string;
  period: string;
  role: string;
  summary: string; // two or three sentences
  tools: string[];
  image: string;
  imageAlt: string;
  link?: { label: string; url: string }; // optional, e.g. { label: "View code", url: "https://github.com/..." }
};

export const projects: Project[] = [
  {
    title: "Secure Login Portal",
    period: "AY 2026/2027",
    role: "Full-stack developer",
    summary:
      "A role-based login portal for three types of users, built on Node.js with JSON Web Tokens. I hardened it with two OWASP controls: multi-factor authentication through an authenticator app such as Microsoft Authenticator, and automatic session timeouts after inactivity.",
    tools: ["Node.js", "JWT", "MFA (TOTP)", "HTML", "CSS", "JavaScript"],
    image: "/images/projects/owasp-portal/registration.png",
    imageAlt: "Secure Login Portal registration page with role selection",
  },
  {
    title: "Lost & Found",
    period: "AY 2026/2027",
    role: "Mobile app developer",
    summary:
      "A Flutter app that helps the campus community report and recover lost items. Groq AI writes the listing from a photo, users search and filter by category and time, and a $1 NETS QR payment boosts urgent items to the top for 7 days.",
    tools: ["Flutter", "Dart", "Firebase", "Riverpod", "Groq AI", "NETS QR"],
    image: "/images/projects/lost-and-found/screens.png",
    imageAlt: "Four Lost & Found app screens: home feed, item details, create listing and NETS QR boost",
  },
  {
    title: "EventFlow",
    period: "AY 2026/2027",
    role: "Cloud application developer",
    summary:
      "A serverless event booking platform on AWS where organisers publish events and attendees book tickets. Four Lambda microservices use MySQL and DynamoDB, with seat reservation and rollback to prevent overselling and EventBridge-driven email confirmations.",
    tools: ["AWS Lambda", "API Gateway", "Amazon Cognito", "Amazon RDS (MySQL)", "DynamoDB", "Next.js"],
    image: "/images/projects/eventflow/home.png",
    imageAlt: "EventFlow Discover Events page with category and date search",
  },
  {
    title: "CalmClarity",
    period: "AY 2026/2027",
    role: "Product designer and product owner",
    summary:
      "A mobile app concept that brings every academic deadline into one urgency-sorted view, paired with daily wellness check-ins and support. I took it from research and personas to a tested Figma prototype, planned across three Agile sprints in Jira.",
    tools: ["Figma", "Jira", "Design Thinking", "Scrum", "User Testing"],
    image: "/images/projects/calmclarity/wireframes.png",
    imageAlt: "Four CalmClarity screens: deadline dashboard, add deadline, wellness check-in and support resources",
  },
  {
    title: "Food Outlet Queue Simulation",
    period: "AY 2025/2026",
    role: "Developer and analyst",
    summary:
      "A Python simulation of lunch-hour queues at a campus food outlet, comparing one queue with two using Big-O analysis. I used the results to weigh linked lists and design the layout of a new outlet, CafeX, alongside Subway and Triplets.",
    tools: ["Python", "Jupyter Notebook", "Queues", "Linked Lists", "Big-O Analysis", "draw.io"],
    image: "/images/projects/food-outlet-queues/layout.png",
    imageAlt: "Floor plan of Subway, Triplets and CafeX with queues, counters and seating areas",
  },
];

// Lesson: "Co-curricular activities" and "Community involvement".
export const involvement = [
  {
    period: "AY 2026/2027",
    roles: [
      "Quartermaster, Information Technology Student Interest Group",
      "Class Representative (C25B03)",
      "STAR Ambassador",
      "Temasek LEAD",
      "Sub-Committee Member, Informatics and IT Studies Club",
      "Sub-Committee Member, Temasek Polytechnic Institute of Public Relations of Singapore Student Chapter",
    ],
  },
  { period: "AY 2025/2026", roles: ["Temasek LEAD"] },
  {
    period: "Secondary school",
    roles: [
      "Staff Sergeant | Flight Sergeant, National Cadet Corps (Air)",
      "Upper Secondary CCA Executive Committee",
      "Peer Support Leader, Student Leadership Committee",
      "Touch Rugby School Team",
    ],
  },
];

// Shown in the same alternating layout as Projects, with a photo of each certificate.
export const achievements = [
  {
    title: "Edusave Certificate of Academic Achievement",
    detail: "AY 2025/2026",
    stat: { value: "Top 25%", label: "of students in my level and course" },
    description: "Awarded by the Ministry of Education for good academic performance and conduct.",
    image: "/images/awards/edusave-certificate.jpg",
    imageAlt: "Edusave Certificate of Academic Achievement 2026 presented to Shayal Sammil",
  },
  {
    title: "Director's List",
    detail: "AY 2025/2026",
    stat: { value: "Top 10%", label: "of students" },
    description:
      "Recognised by Temasek Polytechnic's School of Informatics & IT for excellent academic performance and consistent effort.",
    image: "/images/awards/directors-list.jpg",
    imageAlt: "Temasek Polytechnic Director's List certificate for Academic Year 2025/2026",
  },
];

// Lesson: "References" and "Testimonials". Add short quotes here once a lecturer or
// CCA advisor agrees to be quoted. Keep their contact details off the site.
export const testimonials: { quote: string; name: string; role: string }[] = [];
