"use client";
import { useEffect, useState } from "react";
import Profile from "../../../public/images/profile.jpg";

type SectionKey = "Home" | "Inbox" | "Mentors" | "Profile" | "Frontend" | "Backend" | "DataScience" | "Mobile" | "Security";

type SectionData = {
  title: string;
  description: string;
  cards: Array<{ title: string; description: string; image?: string }>;
};

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<SectionKey>("Home");
  const [sections, setSections] = useState<Record<SectionKey, SectionData>>({} as Record<SectionKey, SectionData>);
  const [followingMentors, setFollowingMentors] = useState<Record<string, boolean>>({}); // Track follow state

  useEffect(() => {
    fetch("/data/sections.json")
      .then((response) => response.json())
      .then((data) => setSections(data))
      .catch((error) => console.error("Error loading sections:", error));
  }, []);

  const handleFollow = (mentor: string) => {
    setFollowingMentors((prev) => ({
      ...prev,
      [mentor]: !prev[mentor],
    }));
  };

  if (!sections[activeSection]) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gradient-to-br from-gray-100 to-blue-100">
      {/* Sidebar */}
      <aside className="bg-white text-black w-full sm:w-64 p-4 shadow-lg sm:rounded-r-lg">
        <h1 className="text-2xl font-bold mb-6 text-left text-blue-600">idempotent</h1>
        <nav>
          <ul className="space-y-4 text-left">
            {Object.keys(sections).map((section) => (
              <li key={section}>
                <button
                  onClick={() => setActiveSection(section as SectionKey)}
                  className={`block px-4 py-2 rounded-lg text-left font-medium transition-all ${
                    activeSection === section
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  {sections[section as SectionKey]?.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 sm:rounded-l-lg bg-white shadow-lg">
        {/* Profile Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">{sections[activeSection].title}</h2>
          <div className="flex items-center space-x-3">
            <p className="text-sm font-medium text-gray-700">Savio</p>
            <div className="w-10 h-10">
              <img
                src={Profile.src}
                alt="User Profile"
                className="object-cover w-full h-full rounded-full border-2 border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-gray-50 shadow rounded-lg p-4">
          <p className="text-gray-600 text-left mb-4">{sections[activeSection].description}</p>

          {/* Grid Layout for Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sections[activeSection].cards.map((card, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:scale-105"
              >
                {activeSection === "Mentors" && card.image && (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="object-cover w-full h-32 rounded-lg mb-4"
                  />
                )}
                <h3 className="text-lg font-semibold text-left text-gray-800">{card.title}</h3>
                <p className="text-gray-600 text-left">{card.description}</p>

                {/* Home Section: Add "Learn More" button */}
                {activeSection === "Home" && (
                  <button className="mt-4 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                    Learn More
                  </button>
                )}

                {/* Mentors Section: Add "Follow" button and "View Profile" link */}
                {activeSection === "Mentors" && (
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={() => handleFollow(card.title)}
                      className={`px-3 py-2 text-sm rounded-lg transition-all ${
                        followingMentors[card.title]
                          ? "bg-green-500 text-white"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      {followingMentors[card.title] ? "Following" : "Follow"}
                    </button>
                    <a
                      href={`/mentors/${card.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-blue-500 text-sm underline hover:text-blue-600"
                    >
                      View Profile
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
