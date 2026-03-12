document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const siteHeader = document.querySelector(".site-header");
  const progressBar = document.querySelector(".scroll-progress");
  const stickyPhoneCta = document.querySelector("[data-sticky-phone-cta]");
  const parallaxNodes = document.querySelectorAll(".hero__shot, .feature-band__media figure, [data-tilt]");
  const calmMotionRoot = document.body.dataset.phase4Motion === "calm";
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealSelectors = [
    ".hero__copy",
    ".hero__panel",
    ".page-hero",
    ".feature-band",
    ".contact-banner",
    ".service-detail__card",
    ".process-proof",
    ".process-stage",
    "[data-phase4-marker='scan-rhythm']"
  ];
  const nodes = [...new Set(document.querySelectorAll(revealSelectors.join(", ")))];
  const stickyMediaQuery = window.matchMedia("(max-width: 900px)");

  if (menuToggle && siteHeader) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      siteHeader.classList.toggle("is-open", !expanded);
    });
  }

  const updateProgress = () => {
    if (!progressBar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? (window.scrollY / max) * 100 : 0;
    progressBar.style.transform = `scaleX(${Math.min(Math.max(value / 100, 0), 1)})`;
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });

  const syncStickyPhoneCta = () => {
    const enabled = Boolean(stickyPhoneCta) && stickyMediaQuery.matches;
    document.body.classList.toggle("has-sticky-phone-cta", enabled);
    if (stickyPhoneCta) {
      stickyPhoneCta.hidden = !enabled;
    }
  };

  syncStickyPhoneCta();
  if (typeof stickyMediaQuery.addEventListener === "function") {
    stickyMediaQuery.addEventListener("change", syncStickyPhoneCta);
  } else if (typeof stickyMediaQuery.addListener === "function") {
    stickyMediaQuery.addListener(syncStickyPhoneCta);
  }
  window.addEventListener("resize", syncStickyPhoneCta, { passive: true });

  nodes.forEach((node) => node.setAttribute("data-reveal", ""));
  nodes.forEach((node, index) => node.style.setProperty("--reveal-delay", `${Math.min(index * 55, 220)}ms`));

  if (reduceMotionQuery.matches) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  parallaxNodes.forEach((node) => {
    node.addEventListener("pointermove", (event) => {
      if (!calmMotionRoot || window.innerWidth < 901) return;
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 5;
      node.style.setProperty("--tilt-x", `${x}px`);
      node.style.setProperty("--tilt-y", `${y}px`);
    });

    node.addEventListener("pointerleave", () => {
      node.style.setProperty("--tilt-x", "0px");
      node.style.setProperty("--tilt-y", "0px");
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: calmMotionRoot ? 0.24 : 0.2, rootMargin: "0px 0px -6% 0px" }
  );

  nodes.forEach((node) => observer.observe(node));
});
