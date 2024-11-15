const socket = io();

let editingMessageId = null;

// Show edit form for a specific message
function editMessage(messageId) {
  editingMessageId = messageId;

  const messageElement = document.querySelector(
    `#message-${messageId} .message-text`
  );
  const messageText = messageElement.textContent;

  const editFormContainer = document.getElementById("edit-form-container");
  const editMessageInput = document.getElementById("edit-message-input");

  editMessageInput.value = messageText;
  editFormContainer.style.display = "block";

  const editForm = document.getElementById("edit-form");
  editForm.action = `/edit-message/${messageId}`;
}

// Cancel editing
function cancelEdit() {
  document.getElementById("edit-form-container").style.display = "none";
  editingMessageId = null;
}

// Listen for new messages
socket.on("newMessage", (data) => {
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `
    <div class="message" id="message-${data.id}">
      <strong>${data.username}:</strong>
      <span class="message-text">${data.message}</span>
      <button class="edit-btn" onclick="editMessage('${data.id}')">Edit</button>
    </div>`;
});

// Listen for message updates
socket.on("messageUpdated", (data) => {
  const messageElement = document.querySelector(
    `#message-${data.id} .message-text`
  );
  if (messageElement) {
    messageElement.textContent = data.newMessage;
  }
});
