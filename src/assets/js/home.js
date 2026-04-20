document.addEventListener("DOMContentLoaded", () => {
  initSpecializationsSwiper();
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
        
        [prevBtn, nextBtn].forEach(btn => {
          if(!btn) return;
          btn.addEventListener("mousedown", function() {
            this.style.outline = "none";
          });
        });
      }
    }
  });
}
