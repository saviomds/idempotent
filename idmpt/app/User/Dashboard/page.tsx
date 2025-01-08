"use client";
import { useEffect, useState } from "react";
import Profile from "../../../public/images/profile.jpg";

type SectionKey = "Home" | "Inbox" | "Mentors" | "Profile" | "Settings";

type SectionData = {
  title: string;
  description: string;
  cards: Array<{ title: string; description: string; image?: string }>;
};

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<SectionKey>("Home");
  const [sections, setSections] = useState<Record<SectionKey, SectionData>>({} as Record<SectionKey, SectionData>);
  const [followingMentors, setFollowingMentors] = useState<Record<string, boolean>>({}); // Track follow state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({ name: "Savio", email: "savio@example.com", contact: '', password: '' });
  const [formData, setFormData] = useState(profileData);
  const [inboxMessages, setInboxMessages] = useState<InboxMessage[]>([]);
  const [filterOptions, setFilterOptions] = useState({ status: "", category: "" });

  type InboxMessage = {
    title: string;
    description: string;
    status: string;
    timestamp: string;
    image?: string;
    category?: string; // New optional category field
  };

  useEffect(() => {
    // Load sections
    fetch("/data/sections.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch sections data");
        }
        return response.json();
      })
      .then((data) => setSections(data))
      .catch((error) => console.error("Error loading sections:", error));

    // Fetch inbox messages
    fetch("/data/inbox.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch inbox messages");
        }
        return response.json();
      })
      .then((data) => setInboxMessages(data))
      .catch((error) => console.error("Error loading inbox messages:", error));
  }, []);

  const handleFollow = (mentor: string) => {
    setFollowingMentors((prev) => ({
      ...prev,
      [mentor]: !prev[mentor],
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setProfileData(formData);
    setIsEditingProfile(false);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterOptions((prev) => ({ ...prev, [name]: value }));
  };

  const filteredMessages = inboxMessages.filter(
    (message) =>
      (filterOptions.status ? message.status === filterOptions.status : true) &&
      (filterOptions.category ? message.category === filterOptions.category : true)
  );

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
            <p className="text-sm font-medium text-gray-700">{profileData.name}</p>
            <div className="w-10 h-10">
              <img
                src={Profile.src}
                alt="User Profile"
                className="object-cover w-full h-full rounded-full border-2 border-blue-500"
              />
            </div>
            {activeSection === "Profile" && (
              <button
                onClick={() => setIsEditingProfile((prev) => !prev)}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
              >
                {isEditingProfile ? "Cancel" : "Edit Profile"}
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-gray-50 shadow rounded-lg p-4">
          {activeSection === "Profile" && isEditingProfile ? (
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <button
                type="button"
                onClick={handleSaveProfile}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
              >
                Save
              </button>
            </form>
          ) : (
            <div>
              {activeSection === "Inbox" && (
                <div className="space-y-4">
                  <div className="flex justify-between mb-4">
                    <select
                      name="status"
                      value={filterOptions.status}
                      onChange={handleFilterChange}
                      className="p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">All Status</option>
                      <option value="Unread">Unread</option>
                      <option value="Read">Read</option>
                    </select>
                    <select
                      name="category"
                      value={filterOptions.category}
                      onChange={handleFilterChange}
                      className="p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">All Categories</option>
                      <option value="Work">Work</option>
                      <option value="Personal">Personal</option>
                    </select>
                  </div>
                  {filteredMessages.map((message, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg flex items-start space-x-4">
                      <div className="w-10 h-10 flex-shrink-0">
                        {message.image ? (
                          <img
                            src={message.image}
                            alt={message.title}
                            className="object-cover w-full h-full rounded-full border-2 border-blue-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-300 rounded-full border-2 border-gray-500">
                            No Image
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{message.title}</h3>
                        <p className="text-gray-600">{message.description}</p>
                        <div className="text-sm text-gray-500 flex justify-between items-center">
                          <span>{message.status}</span>
                          <span>{message.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
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
                          ? "bg-gray-800 text-white"
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
