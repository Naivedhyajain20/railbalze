// RailBlaze site loaded
console.log("RailBlaze AI Railway Control System loaded.");

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

// Open modal with railway-themed animation
signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "block";
  modal.style.animation = "fadeIn 0.3s ease";
  isSignUp = false;
  updateForm();
});

// Close modal with fade out
closeBtn.onclick = () => {
  modal.style.animation = "fadeOut 0.3s ease";
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
};

// Click outside closes modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.animation = "fadeOut 0.3s ease";
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  }
};

// Toggle between sign in/up
toggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  isSignUp = !isSignUp;
  updateForm();
});

function updateForm() {
  modalTitle.textContent = isSignUp ? "Join RailBlaze" : "Access RailBlaze";
  emailInput.style.display = isSignUp ? "block" : "none";
  submitBtn.textContent = isSignUp ? "Create Account" : "Sign In";
  toggleLink.textContent = isSignUp ? "Sign In" : "Sign Up";
  toggleLink.previousSibling.textContent = isSignUp
    ? "Already have access? "
    : "Need access? ";
}

// Handle form submission with railway-themed messages
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!username || !password || (isSignUp && !email)) {
    showNotification("Please fill out all required fields to access RailBlaze.", "warning");
    return;
  }

  // Email validation for sign up
  if (isSignUp && !isValidEmail(email)) {
    showNotification("Please enter a valid email address.", "warning");
    return;
  }

  // Password strength check
  if (password.length < 6) {
    showNotification("Password must be at least 6 characters for security.", "warning");
    return;
  }

  if (isSignUp) {
    showNotification(`🚂 Welcome aboard RailBlaze!\nAccount created for: ${username}\nEmail: ${email}\n\nYou can now access the AI Railway Control System.`, "success");
  } else {
    showNotification(`🚂 Access granted!\nWelcome back to RailBlaze, ${username}!\n\nRedirecting to control dashboard...`, "success");
    
    // Simulate redirect to dashboard after successful login
    setTimeout(() => {
      // You can replace this with actual redirect logic
      console.log("Redirecting to RailBlaze dashboard...");
    }, 2000);
  }

  form.reset();
  modal.style.animation = "fadeOut 0.3s ease";
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
});

// Helper function for email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Enhanced notification system
function showNotification(message, type) {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <span class="notification-close">&times;</span>
    </div>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    max-width: 400px;
    padding: 15px 20px;
    border-radius: 10px;
    color: white;
    font-weight: 600;
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    ${type === 'success' ? 'background: linear-gradient(135deg, #28A745, #20C997);' : ''}
    ${type === 'warning' ? 'background: linear-gradient(135deg, #FD7E14, #FF8C00);' : ''}
  `;

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }, 5000);

  // Manual close
  notification.querySelector('.notification-close').onclick = () => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      notification.remove();
    }, 300);
  };
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  .notification-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
  }
  
  .notification-close {
    cursor: pointer;
    font-size: 20px;
    line-height: 1;
    opacity: 0.8;
  }
  
  .notification-close:hover {
    opacity: 1;
  }
  
  .notification-message {
    white-space: pre-line;
    line-height: 1.4;
  }
`;
document.head.appendChild(style);

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Initialize any additional railway-themed features
document.addEventListener('DOMContentLoaded', function() {
  console.log("🚂 RailBlaze systems initialized and ready for railway traffic optimization!");
});
