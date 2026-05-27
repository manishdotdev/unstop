export const getUserData = () => {
  // Mock user data based on what we see in the UserProfile component
  return {
    id: 1,
    firstName: "Divyansh",
    lastName: "Choudhary",
    username: "gpdfaqxk67258",
    email: "manishsharma.dev56@gmail.com",
    phone: "+91 98765 43210",
    gender: "male",
    userType: "college",
    domain: "Engineering",
    course: "B.Tech (Bachelor of Technology)",
    startYear: "2022",
    endYear: "2026",
    org: "ICFAI University, Jaipur",
    purposes: {
      job: true,
      compete: false,
      host: false,
      mentor: false,
    },
    role: "Software Engineer",
    prefLoc: "Remote",
    currLoc: "Jaipur, Rajasthan, India",
    skills: ["React", "JavaScript", "HTML", "CSS", "Node.js"],
    education: [
      {
        degree: "B.Tech",
        field: "Computer Science",
        institution: "ICFAI University, Jaipur",
        year: "2022-2026",
        grade: "8.5 CGPA"
      }
    ],
    experience: [
      {
        title: "Web Development Intern",
        company: "Tech Solutions Ltd.",
        duration: "Jan 2025 - Present",
        description: "Developed responsive websites using React and Tailwind CSS"
      }
    ]
  };
};

export const getUserProfileSummary = () => {
  const user = getUserData();
  return {
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    phone: user.phone,
    currentLocation: user.currLoc,
    education: user.education[0],
    skills: user.skills,
    experience: user.experience
  };
};