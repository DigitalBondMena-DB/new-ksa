const Animations = (() => {
  const t = {
      threshold: 0.5,
      rootMargin: "0px 0px -100px 0px",
      distance: "150px",
      duration: "1.2s",
      timing: "cubic-bezier(0.22, 1, 0.36, 1)",
    },
    e = (t, e) => {
      t.forEach((t) => {
        t.isIntersecting && (a(t.target), e.unobserve(t.target));
      });
    },
    n = (e) => {
      const n = e.dataset.animationDirection || "start",
        a = e.dataset.animationDistance || t.distance,
        i = e.dataset.animationDuration || t.duration,
        o = e.dataset.animationDelay || "0s";
      ((e.style.opacity = "0"),
        (e.style.transition = `transform ${i} ${t.timing}, opacity ${i} ${t.timing}`),
        (e.style.transitionDelay = o),
        (e.style.willChange = "transform, opacity"));
      let s = "0",
        r = "0";
      const c =
        "rtl" === document.dir || "rtl" === document.documentElement.dir;
      switch (n) {
        case "start":
          s = c ? a : `-${a}`;
          break;
        case "end":
          s = c ? `-${a}` : a;
          break;
        case "top":
          r = `-${a}`;
          break;
        case "bottom":
          r = a;
          break;
        case "fade-out":
          ((s = "0"), (r = "0"));
      }
      e.style.transform = `translate3d(${s}, ${r}, 0)`;
    },
    a = (t) => {
      ((t.style.opacity = "1"), (t.style.transform = "translate3d(0, 0, 0)"));
      const e = () => {
        ((t.style.willChange = "auto"),
          t.removeEventListener("transitionend", e));
      };
      t.addEventListener("transitionend", e);
    };
  return {
    init: (a = {}) => {
      try {
        const i = { ...t, ...a },
          o = document.querySelectorAll("[data-animate]");
        if (0 === o.length) return;
        const s = new IntersectionObserver(e, {
          threshold: i.threshold,
          rootMargin: i.rootMargin,
        });
        o.forEach((t) => {
          (n(t), s.observe(t));
        });
      } catch (t) {
        console.warn("Animations.js: Initialization failed", t);
      }
    },
  };
})();

Animations.init();