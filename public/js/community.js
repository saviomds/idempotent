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
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQHJALbx_c7lHg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1719899782933?e=1735776000&v=beta&t=0ZKSUOFXhi09lhYdEANHqK9nuE6gBfScYIqkRqOEvE0" ||
        "images/savio.jpg",
    },
    {
      id: 2,
      name: "I. Eddy",
      skills: ["C", "C++"],
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQHhYDX5ITjDVA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1707209615107?e=1735776000&v=beta&t=Ljn5Dvqe_nYe802daDk5wZIKDxRa_KFS4GZ7hDTqbOA" ||
        "images/eddy.jpeg",
    },
    {
      id: 2,
      name: "N. Gad",
      skills: ["Python", "Django"],
      image:
        "images/gad.webp" ||
        "https://media.licdn.com/dms/image/v2/D4D35AQEmsuwTq_zEfA/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1719445095864?e=1731060000&v=beta&t=jSyjH_UoLxkqnDEgy0IVOQ1dnnSBMflB7LOts9N4jmA",
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
    { id: 2, user: "Gad", text: "Looking for Django experts!" },
    { id: 3, user: "Eddy", text: "Learn C++ programming!" },
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
