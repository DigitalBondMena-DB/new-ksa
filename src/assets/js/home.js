document.addEventListener("DOMContentLoaded", () => {
  initSpecializationsSwiper();
  initStoriesSwiper();
  initContactForm();
});

function initSpecializationsSwiper() {
  const swiperContainer = document.querySelector(".specializations-swiper");
  if (!swiperContainer) return;

  new Swiper(swiperContainer, {
    // Mobile first: default to 1 slide
    slidesPerView: 1.2,
    spaceBetween: 16,
    centeredSlides: true,

    // Accessibility
    a11y: {
      enabled: true,
      prevSlideMessage: "السابق",
      nextSlideMessage: "التالي",
    },

    // Performance optimization
    grabCursor: true,
    watchSlidesProgress: true,

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-spec-next",
      prevEl: ".swiper-spec-prev",
    },

    // Responsive breakpoints
    breakpoints: {
      // Small Tablets
      640: {
        slidesPerView: 2,
        spaceBetween: 24,
        centeredSlides: false,
      },
      // Desktop
      1024: {
        slidesPerView: 3,
        spaceBetween: 32,
        centeredSlides: false,
      },
    },

    // Edge case handling / Graceful UX
    on: {
      init: function () {
        // Remove focus outlines for mouse users while keeping for keyboard
        const prevBtn = document.querySelector(".swiper-spec-prev");
        const nextBtn = document.querySelector(".swiper-spec-next");

        [prevBtn, nextBtn].forEach((btn) => {
          if (!btn) return;
          btn.addEventListener("mousedown", function () {
            this.style.outline = "none";
          });
        });
      },
    },
  });
}

/**
 * Initializes the Our Students' Stories Carousel
 * Uses Creative Effect for vertical stack/shuffle look
 */
function initStoriesSwiper() {
  const swiperElement = document.querySelector(".stories-swiper");
  if (!swiperElement) return;

  const fractionEl = document.getElementById("stories-fraction");
  const progressBarFill = document.querySelector(".stories-progressbar-fill");
  const prevBtn = document.querySelector(".stories-prev-btn");
  const nextBtn = document.querySelector(".stories-next-btn");

  new Swiper(swiperElement, {
    effect: "creative",
    grabCursor: true,
    loop: false,
    allowTouchMove: false,
    speed: 600,
    creativeEffect: {
      prev: {
        shadow: false,
        translate: ["-120%", 0, 0],
      },
      next: {
        translate: [0, 20, -20],
        scale: 0.95,
        opacity: 0.5,
      },
    },
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
    on: {
      init: function () {
        updateProgress(this);
      },
      slideChange: function () {
        updateProgress(this);
      },
    },
  });

  function updateProgress(s) {
    const total = s.slides.length;
    const current = s.activeIndex + 1;

    // Update fraction text (e.g., 1/3)
    if (fractionEl) {
      fractionEl.textContent = `${current}/${total}`;
    }

    // Update progress bar fill
    if (progressBarFill) {
      const progressPercent = (current / total) * 100;
      progressBarFill.style.width = `${progressPercent}%`;
    }

    // Navigation button states handled by swiper via classes,
    // but we can add manual styling if needed.
    // Swiper adds .swiper-button-disabled automatically.
  }
}

/**
 * Initializes and handles validation for the Contact Us Form
 */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const name = document.getElementById("nameInput");
  const email = document.getElementById("emailInput");
  const phone = document.getElementById("phoneInput");
  const message = document.getElementById("message");
  const actualPhone = document.getElementById("actualPhone");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("validMsg");
  const messageError = document.getElementById("messageError");

  // Initialize intlTelInput
  const iti = window.intlTelInput(phone, {
    initialCountry: "sa",
    preferredCountries: ["sa", "eg", "ae", "kw", "qa", "jo"],
    separateDialCode: true,
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js",
  });

  // Restriction: Digits only for phone
  phone.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });

  // Validation functions
  function validateName() {
    const value = name.value.trim();
    const hasNumber = /\d/.test(value);

    // Reset hidden states
    nameError.classList.add("hidden");
    nameError.children[0].classList.add("hidden");
    nameError.children[1].classList.add("hidden");

    if (value.length < 3) {
      nameError.classList.remove("hidden");
      nameError.children[0].classList.remove("hidden");
      return false;
    }
    if (hasNumber) {
      nameError.classList.remove("hidden");
      nameError.children[1].classList.remove("hidden");
      return false;
    }
    return true;
  }

  function validateEmail() {
    const value = email.value.trim();
    const regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/i;
    if (!regex.test(value)) {
      emailError.classList.remove("hidden");
      return false;
    }
    emailError.classList.add("hidden");
    return true;
  }

  function validatePhone() {
    const value = phone.value.trim();
    phoneError.classList.add("hidden");

    if (!value) {
      phoneError.textContent = "الرجاء إدخال رقم الجوال";
      phoneError.classList.remove("hidden");
      return false;
    }

    if (!iti.isValidNumber()) {
      phoneError.textContent = "الرجاء إدخال رقم جوال صحيح";
      phoneError.classList.remove("hidden");
      return false;
    }

    return true;
  }

  function validateMessage() {
    const value = message.value.trim();
    if (value.length < 10) {
      messageError.classList.remove("hidden");
      return false;
    }
    messageError.classList.add("hidden");
    return true;
  }

  // Real-time validation
  name.addEventListener("input", validateName);
  email.addEventListener("input", validateEmail);
  phone.addEventListener("input", validatePhone);
  phone.addEventListener("blur", validatePhone);
  message.addEventListener("input", validateMessage);

  // Form Submission
  form.addEventListener("submit", function (e) {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
      const countryData = iti.getSelectedCountryData();
      const dialCode = countryData.dialCode;
      const phoneNumber = phone.value.trim();

      // Store full phone number in hidden input
      actualPhone.value = +(+dialCode) + phoneNumber;

      console.log("Form is valid. Full Phone:", actualPhone.value);
      // Form proceeds with submission
    } else {
      e.preventDefault();
      console.log("Form validation failed.");
    }
  });
}
