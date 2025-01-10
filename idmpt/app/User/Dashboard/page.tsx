"use client";
import React, { useEffect, useState } from "react";
import Profile from "../../../public/images/profile.jpg"; // Ensure correct image path

type SectionKey = "Home" | "Inbox" | "Mentors" | "Profile" | "Settings";

type SectionData = {
  title: string;
  description: string;
  cards: Array<{ title: string; description: string; image?: string; id: string }>;
};

type InboxMessage = {
  title: string;
  description: string;
  status: string;
  timestamp: string;
  image?: string;
  category?: string;
};

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<SectionKey>("Profile");
  const [sections, setSections] = useState<Record<SectionKey, SectionData>>({
    Home: { title: "", description: "", cards: [] },
    Inbox: { title: "", description: "", cards: [] },
    Mentors: { title: "", description: "", cards: [] },
    Profile: { title: "", description: "", cards: [] },
    Settings: { title: "", description: "", cards: [] }
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Savio",
    email: "savio@example.com",
    contact: '',
    password: '',
    profilePicture: Profile.src
  });
  
  const [formData, setFormData] = useState<typeof profileData>(profileData);
  const [inboxMessages, setInboxMessages] = useState<InboxMessage[]>([]);
  const [filterOptions, setFilterOptions] = useState({ status: "", category: "" });

  useEffect(() => {
    fetch("/data/sections.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch sections data");
        }
        return response.json();
      })
      .then((data) => {
        setSections(data);
        if (data.Inbox?.cards) {
          setInboxMessages(
            data.Inbox.cards.map((card: InboxMessage) => ({
              ...card,
              timestamp: "Jan 8, 2025"
            }))
          );
        }
      })
      .catch((error) => console.error("Error loading sections:", error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          const imagePath = `uploads/${file.name}`;
          setProfileData(prev => ({ ...prev, profilePicture: imagePath }));

          try {
            const response = await fetch("../../User/api/upload", {
              method: "POST",
              body: JSON.stringify({ imagePath, file: e.target.result }),
              headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) {
              throw new Error(`Failed to upload the profile picture: ${response.statusText}`);
            }
          } catch (error) {
            console.error(error);
            alert("An error occurred while uploading the profile picture. Please try again.");
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setProfileData(formData);
    setIsEditingProfile(false);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterOptions(prev => ({ ...prev, [name]: value }));
  };

  const filteredMessages = inboxMessages.filter(
    (message) =>
      (filterOptions.status ? message.status === filterOptions.status : true) &&
      (filterOptions.category ? message.category === filterOptions.category : true)
  );

  const handleFollow = (id: string) => {
    // Handle following/unfollowing logic here
  };

  if (!sections[activeSection]) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gradient-to-br from-gray-100 to-blue-100">
      <aside className="bg-white text-black w-full sm:w-64 p-4 shadow-lg sm:rounded-r-lg">
        <h1 className="text-2xl font-bold mb-6 text-left text-blue-600">idempotent</h1>
        <nav>
          <ul className="space-y-4 text-left">
            {Object.keys(sections).map(section => (
              <li key={section}>
                <button
                  onClick={() => setActiveSection(section as SectionKey)}
                  className={`block px-4 py-2 rounded-lg text-left font-medium transition-all ${activeSection === section ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-blue-600 hover:text-white"}`}
                >
                  {sections[section as SectionKey]?.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-grow p-6 sm:rounded-l-lg bg-white shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">{sections[activeSection].title}</h2>
          <div className="flex items-center space-x-3">
            <p className="text-sm font-medium text-gray-700">{profileData.name}</p>
            <div className="w-10 h-10">
            <img src={profileData.profilePicture} alt="User Profile" className="object-cover w-full h-full rounded-full border-2 border-blue-500" />

            </div>
            {activeSection === "Profile" && (
              <button onClick={() => setIsEditingProfile(prev => !prev)} className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                {isEditingProfile ? "Cancel" : "Edit Profile"}
              </button>
            )}
            {isEditingProfile && (
              <input
                type="file"
                id="profile-picture"
                className="hidden"
                onChange={handleFileChange}
              />
            )}
          </div>
        </div>

        <div className="bg-gray-50 shadow rounded-lg p-4">
          {activeSection === "Profile" && (
            <div className="bg-white shadow-lg rounded-lg p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3 flex flex-col items-center text-center">
                <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                  <img
                    src={profileData.profilePicture}
                    alt="User Profile"
                    className="rounded-full border-4 border-blue-500 shadow-lg object-cover w-full h-full"
                  />
                  {isEditingProfile && (
                    <label
                      htmlFor="profile-picture"
                      className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center shadow cursor-pointer hover:bg-blue-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.232 5.232l3.536 3.536M16.5 4.5l-9 9M6 18.75v.75h.75L17.25 8.25a.75.75 0 00-1.06-1.06L6 18.75z"
                        />
                      </svg>
                    </label>
                  )}
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mt-4">
                  {profileData.name}
                </h3>
                <p className="text-sm text-gray-600">{profileData.email}</p>
                {isEditingProfile ? (
                  <button
                    onClick={handleSaveProfile}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all"
                  >
                    Save Profile
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="lg:w-2/3">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {isEditingProfile ? "Edit Your Information" : "Profile Details"}
                </h3>
                <form
                  className={`grid grid-cols-1 gap-6 ${isEditingProfile ? "sm:grid-cols-2" : ""}`}
                >
                  {(['name', 'email', 'contact', 'password'] as Array<keyof typeof formData>).map((field) => (
                    <div key={field}>
                      <label
                        htmlFor={field}
                        className="block text-sm font-medium text-gray-700 capitalize"
                      >
                        {field}
                      </label>
                      <input
                        type={field === "password" ? "password" : "text"}
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        disabled={!isEditingProfile}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${
                          isEditingProfile
                            ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            : "bg-gray-100 cursor-not-allowed border-gray-200"
                        }`}
                      />
                    </div>
                  ))}
                </form>
              </div>
            </div>
          )}

          {activeSection === "Inbox" && (
            <div className="space-y-4">
              <div className="flex justify-between mb-4">
                <select name="status" value={filterOptions.status} onChange={handleFilterChange} className="p-2 border border-gray-300 rounded-md">
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <select name="category" value={filterOptions.category} onChange={handleFilterChange} className="p-2 border border-gray-300 rounded-md">
                  <option value="">All Categories</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg flex items-start space-x-4">
                    <div className="w-10 h-10 flex-shrink-0">
                      {message.image ? (
                        <img src={message.image} alt={message.title} className="object-cover w-full h-full rounded-full border-2 border-blue-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300 rounded-full border-2 border-gray-500">
                          No Image
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{message.title}</h3>
                      <p className="text-gray-600">{message.description}</p>
                      <div className="text-sm text-gray-500">
                        <span>Status: {message.status}</span>
                        <br />
                        <span>Category: {message.category}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No messages found for the selected filters.</p>
              )}
            </div>
          )}

          {activeSection !== "Profile" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(sections[activeSection] as SectionData).cards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg flex flex-col"
                >
                  <img
                    src={card.image ?? ""}
                    alt={card.title}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  <div className="mt-auto flex justify-between items-center">
                    {activeSection === "Mentors" ? (
                      <button
                        onClick={() => handleFollow(card.id)}
                        className="px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400"
                      >
                        Follow
                      </button>
                    ) : activeSection === "Home" ? (
                      <button
                        onClick={() => console.log(`Learn more about ${card.title}`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                      >
                        Learn More
                      </button>
                    ) : null}
                    <a
                      href={`/profile/${card.id}`}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
