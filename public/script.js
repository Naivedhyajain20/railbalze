// Original log
console.log("Rhythmix site loaded.");

// Modal logic
const modal = document.getElementById("authModal");
const signInBtn = document.querySelector(".sign-in-button");
const closeBtn = document.querySelector(".close");
const toggleLink = document.getElementById("toggleLink");
const modalTitle = document.getElementById("modalTitle");
const emailInput = document.getElementById("email");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("authForm");

let isSignUp = false;

// Open modal
signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "block";
  isSignUp = false;
  updateForm();
});

// Close modal
closeBtn.onclick = () => {
  modal.style.display = "none";
};

// Click outside closes modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Toggle between sign in/up
toggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  isSignUp = !isSignUp;
  updateForm();
});

function updateForm() {
  modalTitle.textContent = isSignUp ? "Sign Up" : "Sign In";
  emailInput.style.display = isSignUp ? "block" : "none";
  submitBtn.textContent = isSignUp ? "Sign Up" : "Sign In";
  toggleLink.textContent = isSignUp ? "Sign In" : "Sign Up";
  toggleLink.previousSibling.textContent = isSignUp
    ? "Already have an account? "
    : "Don't have an account? ";
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!username || !password || (isSignUp && !email)) {
    alert("Please fill out all required fields.");
    return;
  }

  if (isSignUp) {
    alert(`Signed up successfully!\nUsername: ${username}\nEmail: ${email}`);
  } else {
    alert(`Signed in successfully!\nWelcome back, ${username}!`);
  }

  form.reset();
  modal.style.display = "none";
});
