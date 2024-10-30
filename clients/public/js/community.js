const userRegistered = true;

if (!userRegistered) {
  alert("Please register to access the community page.");
  window.location.href = "/register";
}

async function loadProfiles() {
  const profiles = [
    {
      id: 1,
      name: "D. Savio M ",
      skills: ["JavaScript", "React"],
      image: "images/savio.jpg",
    },
    {
      id: 2,
      name: "Bob Smith",
      skills: ["Python", "Django"],
      image:
        "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  const profilesContainer = document.getElementById("profiles-container");

  profiles.forEach((profile) => {
    const profileCard = document.createElement("div");
    profileCard.classList.add("profile-card");
    profileCard.innerHTML = `
      <img src="${profile.image}" alt="${profile.name}" />
      <h3>${profile.name}</h3>
      <p>Skills: ${profile.skills.join(", ")}</p>
    `;
    profilesContainer.appendChild(profileCard);
  });
}

async function loadDiscussions() {
  const discussions = [
    { id: 1, user: "Savio", text: "Anyone working on React projects?" },
    { id: 2, user: "Bob", text: "Looking for Django experts!" },
  ];
  const discussionContainer = document.getElementById("discussion-container");

  discussions.forEach((discussion) => {
    const discussionThread = document.createElement("div");
    discussionThread.classList.add("discussion-thread");
    discussionThread.innerHTML = `
      <strong>${discussion.user}</strong>: ${discussion.text}
    `;
    discussionContainer.appendChild(discussionThread);
  });
}

function postThread() {
  const newThread = document.getElementById("new-thread").value;
  if (newThread.trim() !== "") {
    const discussionContainer = document.getElementById("discussion-container");
    const newThreadElement = document.createElement("div");
    newThreadElement.classList.add("discussion-thread");
    newThreadElement.innerHTML = `<strong>You</strong>: ${newThread}`;
    discussionContainer.appendChild(newThreadElement);
    document.getElementById("new-thread").value = "";
  }
}

async function loadResources() {
  const resources = [
    { id: 1, title: "React Basics", link: "/resources/react-basics" },
    {
      id: 2,
      title: "Advanced Python",
      link: "/resources/advanced-python",
    },
  ];
  const resourceList = document.getElementById("resource-list");

  resources.forEach((resource) => {
    const resourceItem = document.createElement("div");
    resourceItem.classList.add("resource-item");
    resourceItem.innerHTML = `
      <h3>${resource.title}</h3>
      <a href="${resource.link}">View Resource</a>
    `;
    resourceList.appendChild(resourceItem);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadProfiles();
  loadDiscussions();
  loadResources();
});

function toggleMenu() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("active");
}
