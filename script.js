"use strict";

/* ========================================
   1. SELECT HTML ELEMENTS
======================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = themeToggle?.querySelector("span");

const projectModal = document.querySelector(".project-modal");
const modalClose = document.querySelector(".modal-close");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const modalTechList = document.querySelector(".modal-tech-list");
const modalProjectLink = document.querySelector(".modal-project-link");

const projectButtons = document.querySelectorAll(".project-details");
const currentYear = document.querySelector("#current-year");

/* ========================================
   2. MOBILE NAVIGATION
======================================== */

function closeMobileMenu() {
  if (!menuToggle || !navMenu) return;

  navMenu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

/* ========================================
   3. DARK / LIGHT THEME
======================================== */

const THEME_STORAGE_KEY = "portfolio-theme";

function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    // The theme still works if browser storage is unavailable.
  }
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  const selectedTheme = isDark ? "dark" : "light";

  document.documentElement.dataset.theme = selectedTheme;
  document.documentElement.style.colorScheme = selectedTheme;

  if (themeIcon) {
    themeIcon.textContent = isDark ? "☀" : "☾";
  }

  themeToggle?.setAttribute(
    "aria-label",
    isDark ? "Switch to light theme" : "Switch to dark theme",
  );

  themeToggle?.setAttribute("aria-pressed", String(isDark));
}

const initialTheme = getSavedTheme();

applyTheme(initialTheme === "dark" ? "dark" : "light");

themeToggle?.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);
  saveTheme(nextTheme);
});

/* ========================================
   4. PROJECT DATA
======================================== */

const projects = {
  employee: {
    title: "Employee Management System",

    description:
      "A C# and ASP.NET Core project focused on employee information management. Explore the source code and implementation in the GitHub repository.",

    technologies: ["C#", "ASP.NET Core", "JSON"],

    url: "https://github.com/Chrisjohanes/csharp-employee-management-system",
  },

  laundry: {
    title: "Laundry Service Website",

    description:
      "A laundry service website project designed to present services through a clear interface and structured web experience. Explore the source code in the GitHub repository.",

    technologies: ["HTML", "CSS", "Laravel"],

    url: "https://github.com/Chrisjohanes/solusi-bersih-laundry",
  },

  portfolio: {
    title: "Personal Portfolio",

    description:
      "My personal developer portfolio built with HTML, CSS, and JavaScript.",

    technologies: ["HTML", "CSS", "JavaScript"],

    url: "https://github.com/Chrisjohanes/joh-stack",
  },
};

/* ========================================
   5. PROJECT MODAL
======================================== */

function openProjectModal(projectKey) {
  const project = projects[projectKey];

  if (
    !project ||
    !projectModal ||
    !modalTitle ||
    !modalDescription ||
    !modalTechList
  ) {
    return;
  }

  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;

  // Clear the previous project's technology list.
  modalTechList.replaceChildren();

  project.technologies.forEach((technology) => {
    const item = document.createElement("li");

    item.textContent = technology;
    modalTechList.appendChild(item);
  });

  // Only show the source-code link when a URL exists.
  if (modalProjectLink) {
    if (project.url) {
      modalProjectLink.href = project.url;
      modalProjectLink.hidden = false;
    } else {
      modalProjectLink.hidden = true;
      modalProjectLink.removeAttribute("href");
    }
  }

  if (!projectModal.open) {
    projectModal.showModal();
  }
}

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openProjectModal(button.dataset.project);
  });
});

/* ========================================
   6. CLOSE PROJECT MODAL
======================================== */

modalClose?.addEventListener("click", () => {
  if (projectModal?.open) {
    projectModal.close();
  }
});

projectModal?.addEventListener("click", (event) => {
  // Close the modal when the backdrop is clicked.
  if (event.target === projectModal) {
    projectModal.close();
  }
});

/* ========================================
   7. DYNAMIC FOOTER YEAR
======================================== */

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
