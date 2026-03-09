document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const siteHeader = document.querySelector(".site-header");
  const progressBar = document.querySelector(".scroll-progress");
  const parallaxNodes = document.querySelectorAll(".hero__shot, .service-card, .feature-band__media figure");
  const nodes = document.querySelectorAll(".service-card, .process-card, .proof-card, .feature-band, .work-category, .contact-banner, .page-hero, .service-detail__card, .service-hero__copy, .service-hero__media, .process-stage, .process-proof, .process-metric");

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

  parallaxNodes.forEach((node) => {
    node.addEventListener("pointermove", (event) => {
      if (window.innerWidth < 901) return;
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
      node.style.setProperty("--tilt-x", `${x}px`);
      node.style.setProperty("--tilt-y", `${y}px`);
    });

    node.addEventListener("pointerleave", () => {
      node.style.setProperty("--tilt-x", "0px");
      node.style.setProperty("--tilt-y", "0px");
    });
  });

  nodes.forEach((node) => node.setAttribute("data-reveal", ""));
  nodes.forEach((node, index) => node.style.setProperty("--reveal-delay", `${Math.min(index * 35, 280)}ms`));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  nodes.forEach((node) => observer.observe(node));
});
