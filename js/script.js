// ========================
// Username & Enter Button
// ========================
const usernameInput = document.getElementById("username");
const enterBtn = document.getElementById("enterBtn");

// Enable/disable Enter button
if (usernameInput && enterBtn) {
  usernameInput.addEventListener("input", () => {
    enterBtn.disabled = !usernameInput.value.trim();
  });

  // Klik tombol Enter
  enterBtn.addEventListener("click", enterWebsite);

  // Tekan Enter pada input
  usernameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !enterBtn.disabled) {
      enterWebsite();
    }
  });
}

function enterWebsite() {
  const name = document.getElementById("username").value;
  if (name.trim() !== "") {
    localStorage.setItem("visitorName", name);
    window.location.href = "/pages/home.html"; // pindah ke halaman home
  } else {
    alert("Please enter your name first.");
  }
}

// Tampilkan nama visitor di halaman Home
window.onload = function () {
  const name = localStorage.getItem("visitorName");
  const welcomeEl = document.getElementById("welcome-name");
  if (welcomeEl && name) {
    welcomeEl.textContent = name;
  }
};

// ========================
// Navbar Loader
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar-container");
  if (navbarContainer) {
    fetch("/components/navbar.html")
      .then((response) => response.text())
      .then((data) => {
        navbarContainer.innerHTML = data;

        // Highlight active link
        const path = window.location.pathname.split("/").pop();
        const links = navbarContainer.querySelectorAll("nav a");
        links.forEach((link) => {
          if (link.dataset.path === path) {
            link.classList.add("active");
          }
        });

        // Mobile menu toggle
        const menuBtn = navbarContainer.querySelector(".menu-btn");
        const navLinks = navbarContainer.querySelector(".links");
        if (menuBtn && navLinks) {
          menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");
          });
        }
      })
      .catch((err) => console.error("Error loading navbar:", err));
  }
});

function updateTime() {
  const now = new Date();
  document.getElementById("current-time").textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// Contact form validation
const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  // Name validation
  if (nameInput.value.trim().length < 3) {
    nameError.style.display = "block";
    isValid = false;
  } else {
    nameError.style.display = "none";
  }

  // Email validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailInput.value.match(emailPattern)) {
    emailError.style.display = "block";
    isValid = false;
  } else {
    emailError.style.display = "none";
  }

  // Message validation
  if (messageInput.value.trim().length < 10) {
    messageError.style.display = "block";
    isValid = false;
  } else {
    messageError.style.display = "none";
  }

  // Show popup if valid
  if (isValid) {
    document.getElementById("successPopup").style.display = "flex";
    form.reset();
  }
});

function closePopup() {
  document.getElementById("successPopup").style.display = "none";
}