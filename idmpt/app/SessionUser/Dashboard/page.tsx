"use client";
import { useState } from "react";
import Profile from "../../../public/images/profile.jpg";

type SectionKey = "Home" | "Inbox" | "Mentors" | "Profile" | "Frontend" | "Backend" | "DataScience"  | "Mobile" | "Security";

const sections: Record<SectionKey, { title: string; description: string; cards: Array<{ title: string; description: string; image?: string }> }> = {
  Home: {
    title: "Home",
    description: "Your starting page overview. Here you can get quick access to your latest updates.",
    cards: [
      { title: "Latest News", description: "Stay updated with the latest news and announcements." },
      { title: "Upcoming Events", description: "Check out the upcoming events and webinars." },
      { title: "Dashboard Overview", description: "Quick access to your personalized dashboard." },
    ],
  },
  Inbox: {
    title: "Inbox",
    description: "Check your latest messages.",
    cards: [],
  },
  Mentors: {
    title: "Mentors",
    description: "Find guidance from experts. Connect with mentors to accelerate your learning.",
    cards: [
      { title: "John Doe", description: "Expert in Web Development and Frontend Technologies.", image: "/images/1.jpg" },
      { title: "Jane Smith", description: "Data Science and Machine Learning Specialist.", image: "/images/2.jpg" },
      { title: "Alex Johnson", description: "Backend Developer and DevOps Expert.", image: "/images/3.jpg" },
      { title: "Dominique Savio M", description: "Data Science, Backend Developer and DevOps Expert.", image: "/images/profile.jpg" },
    ],
  },
  Profile: {
    title: "Profile",
    description: "Update your account details, change your preferences, and more.",
    cards: [
  
      { title: "User Information", description: "View and edit your personal details, such as name, email, and password." },
      { title: "Skills", description: "Manage and update the skills that represent your expertise in various fields." },
      { title: "Contact", description: "Update your contact details, such as phone number or social media profiles." },
      { title: "Recent Activities", description: "View your recent activities and achievements." },
    ],
  },
  Frontend: {
    title: "Frontend Development",
    description: "Learn HTML, CSS, JavaScript, and modern frameworks like React.",
    cards: [
      { title: "HTML Basics", description: "Learn the structure of web pages." },
      { title: "CSS Styling", description: "Master styling with CSS." },
      { title: "JavaScript Fundamentals", description: "Get a grip on JavaScript basics." },
      { title: "React Framework", description: "Build interactive user interfaces with React." },
    ],
  },
  Backend: {
    title: "Backend Development",
    description: "Master Node.js, Express, Django, or Ruby on Rails.",
    cards: [
      { title: "Node.js Basics", description: "Learn server-side JavaScript with Node.js." },
      { title: "Express Framework", description: "Simplify web app development with Express." },
      { title: "Django Framework", description: "Develop Python-based applications with Django." },
      { title: "Ruby on Rails", description: "Create web apps with Ruby on Rails." },
    ],
  },
  DataScience: {
    title: "Data Science",
    description: "Focus on Python, machine learning, and data analysis.",
    cards: [
      { title: "Python for Data", description: "Get started with Python for data analysis." },
      { title: "Data Visualization", description: "Create visualizations using Matplotlib." },
      { title: "Machine Learning Basics", description: "Understand the fundamentals of machine learning." },
    ],
  },
 
  Mobile: {
    title: "Mobile Development",
    description: "Learn Flutter, React Native, Swift, and Kotlin.",
    cards: [
      { title: "Flutter Basics", description: "Build cross-platform apps with Flutter." },
      { title: "React Native", description: "Develop mobile apps using React Native." },
      { title: "Swift Programming", description: "Develop iOS applications using Swift." },
      { title: "Kotlin for Android", description: "Create Android apps with Kotlin." },
    ],
  },
  Security: {
    title: "Cybersecurity",
    description: "Understand ethical hacking and securing apps.",
    cards: [
      { title: "Ethical Hacking", description: "Learn the basics of ethical hacking." },
      { title: "Web Security", description: "Secure web applications from attacks." },
      { title: "API Security", description: "Protect APIs with OAuth and JWT." },
    ],
  },
};

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<SectionKey>("Home");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col sm:flex-row">
      {/* Sidebar */}
      <aside className="bg-white-600 text-black w-full sm:w-64 p-4">
        <h1 className="text-xl font-bold mb-6 text-left text-blue-600">idempotent</h1>
        <nav>
          <ul className="space-y-4 text-left">
            {Object.keys(sections).map((section) => (
              <li key={section}>
                <button
                  onClick={() => setActiveSection(section as SectionKey)}
                  className={`block px-3 py-2 rounded-lg text-left ${
                    activeSection === section
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  {sections[section as SectionKey].title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow bg-white p-6 shadow-lg sm:ml-auto sm:mr-0 sm:rounded-l-lg">
        {/* Profile section aligned to the left */}
        <div className="flex justify-end items-center mb-6 space-x-3">
          <p className="text-sm font-medium text-gray-700">Savio</p>
          <div className="w-10 h-10">
            <img
              src={Profile.src}
              alt="User Profile"
              className="object-cover w-full h-full rounded-full p-1 bg-blue-100"
            />
          </div>
        </div>

   {/* Main Content Area */}
<div className="bg-gray-50 shadow rounded-lg p-4">
  <h2 className="text-lg font-semibold text-left">{sections[activeSection].title}</h2>
  <p className="text-gray-600 text-left mb-4">{sections[activeSection].description}</p>

  {/* Grid Layout for Cards with Fixed Width */}
  <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {sections[activeSection].cards.map((card, index) => (
      <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        {/* Conditional rendering of image for Mentors section only */}
        {activeSection === "Mentors" && card.image && (
          <img
            src={card.image}
            alt={card.title}
            className="object-cover w-full h-32 rounded-lg mb-4"
          />
        )}
        <h3 className="text-lg font-semibold text-left">{card.title}</h3>
        <p className="text-gray-600 text-left">{card.description}</p>
      </div>
    ))}
  </div>
</div>

      </main>
    </div>
  );
}
