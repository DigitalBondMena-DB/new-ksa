/**
 * KSA Students 2030 - Main JS
 * Optimized for performance and readability.
 */

document.addEventListener("DOMContentLoaded", () => {
  handleLoadingScreen();
  handleDesktopNavigation();
  handleMobileNavigation();
  handleSocialSidebar();
  handleGlobalEvents();
});

/* -------------------------------------------------------------------------- */
/* 1. Loading Screen Logic
/* -------------------------------------------------------------------------- */

function handleLoadingScreen() {
  const loader = document.getElementById("loading-screen");
  const progressBar = document.querySelector(".loader-progress-bar");

  if (!loader || !progressBar) return;

  let progress = 0;
  const progressInterval = setInterval(() => {
    if (progress < 85) {
      progress += Math.random() * 15;
      if (progress > 85) progress = 85;
      progressBar.style.width = `${progress}%`;
    }
  }, 150);

  const hideLoader = () => {
    progressBar.style.width = "100%";
    
    setTimeout(() => {
      loader.classList.add("fade-out");
      setTimeout(() => {
        loader.remove();
        document.body.style.overflow = "";
      }, 500);
    }, 400);

    clearInterval(progressInterval);
  };

  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", hideLoader);
  }

  // Fallback
  setTimeout(() => {
    if (document.getElementById("loading-screen")) hideLoader();
  }, 5000);
}

/* -------------------------------------------------------------------------- */
/* 2. Desktop Navigation (Dropdowns)
/* -------------------------------------------------------------------------- */

let activeDropdown = null;

function handleDesktopNavigation() {
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-dropdown-trigger]");
    const link = e.target.closest(".dropdown-menu a");

    if (trigger) {
      e.preventDefault();
      e.stopPropagation();
      toggleDropdown(trigger);
    } else if (link) {
      closeAllDropdowns();
    } else if (activeDropdown && !e.target.closest(".dropdown-menu")) {
      closeAllDropdowns();
    }
  });
}

function toggleDropdown(trigger) {
  const menu = trigger.querySelector(".dropdown-menu");
  const icon = trigger.querySelector("svg, img");

  if (activeDropdown && activeDropdown !== menu) {
    closeDropdown(activeDropdown);
  }

  if (!menu) return;

  const isOpen = menu.classList.contains("visible");
  isOpen ? closeDropdown(menu) : openDropdown(menu, icon);
}

function openDropdown(menu, icon) {
  menu.classList.remove("invisible", "opacity-0", "translate-y-4");
  menu.classList.add("visible", "opacity-100", "translate-y-0");
  if (icon) icon.classList.add("rotate-180");
  activeDropdown = menu;
}

function closeDropdown(menu) {
  if (!menu) return;
  const trigger = menu.closest("[data-dropdown-trigger]");
  const icon = trigger ? trigger.querySelector("svg, img") : null;

  menu.classList.add("invisible", "opacity-0", "translate-y-4");
  menu.classList.remove("visible", "opacity-100", "translate-y-0");
  if (icon) icon.classList.remove("rotate-180");
  if (activeDropdown === menu) activeDropdown = null;
}

function closeAllDropdowns() {
  document
    .querySelectorAll(".dropdown-menu.visible")
    .forEach((menu) => closeDropdown(menu));
}

/* -------------------------------------------------------------------------- */
/* 3. Mobile Navigation (Sidenav & Dropdowns)
/* -------------------------------------------------------------------------- */

function handleMobileNavigation() {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const sidenavOverlay = document.getElementById("sidenav-overlay");
  const mobileDropdowns = document.querySelectorAll(".mobile-dropdown");

  // Sidenav Toggles
  mobileMenuToggle?.addEventListener("click", (e) => {
    e.preventDefault();
    setSidenavState(true);
  });

  mobileMenuClose?.addEventListener("click", (e) => {
    e.preventDefault();
    setSidenavState(false);
  });

  sidenavOverlay?.addEventListener("click", () => setSidenavState(false));

  // Mobile Dropdowns
  mobileDropdowns.forEach((container) => {
    const btn = container.querySelector("button");
    btn?.addEventListener("click", (e) => {
      e.preventDefault();
      toggleMobileDropdown(container);
    });
  });
}

function setSidenavState(isOpen) {
  const mobileSidenav = document.getElementById("mobile-sidenav");
  const sidenavContent = document.getElementById("sidenav-content");
  const sidenavOverlay = document.getElementById("sidenav-overlay");

  if (isOpen) {
    mobileSidenav.classList.remove("invisible");
    sidenavOverlay.classList.remove("opacity-0");
    sidenavOverlay.classList.add("opacity-100");
    sidenavContent.classList.remove("translate-x-full");
    sidenavContent.classList.add("translate-x-0");
    document.body.style.overflow = "hidden";
  } else {
    sidenavOverlay.classList.remove("opacity-100");
    sidenavOverlay.classList.add("opacity-0");
    sidenavContent.classList.remove("translate-x-0");
    sidenavContent.classList.add("translate-x-full");
    setTimeout(() => {
      mobileSidenav.classList.add("invisible");
      document.body.style.overflow = "";
    }, 300);
  }
}

function toggleMobileDropdown(container) {
  const menu = container.querySelector("div");
  const icon = container.querySelector("i");
  const isHidden = menu.classList.contains("hidden");

  if (isHidden) {
    menu.classList.remove("hidden");
    menu.classList.add("flex");
    icon.classList.add("rotate-180");
  } else {
    menu.classList.add("hidden");
    menu.classList.remove("flex");
    icon.classList.remove("rotate-180");
  }
}

/* -------------------------------------------------------------------------- */
/* 4. Social Sidebar
/* -------------------------------------------------------------------------- */

function handleSocialSidebar() {
  const socialToggle = document.getElementById("social-toggle");
  const socialBar = document.getElementById("social-bar");
  
  if (!socialToggle || !socialBar) return;

  const toggleClass = document.dir === "rtl" ? "-translate-x-[100px]" : "translate-x-[100px]";

  socialToggle.addEventListener("click", () => {
    socialBar.classList.toggle(toggleClass);
    socialToggle.classList.toggle("rotate-180");
  });
}

/* -------------------------------------------------------------------------- */
/* 5. Global Events (Keys, Resize)
/* -------------------------------------------------------------------------- */

function handleGlobalEvents() {
  // ESC key to close all overlays
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllDropdowns();
      setSidenavState(false);
    }
  });

  // Close sidenav on large screen resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 1280) {
        setSidenavState(false);
      }
    }, 250);
  });
}
