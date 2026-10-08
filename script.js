document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", nav.classList.contains("open"));
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => nav.classList.remove("open"));
    });
  }

  // Reveal sections as they enter the viewport
  const revealTargets = document.querySelectorAll(
    ".feature-card, .resume-block, .bio-card, .stack-card, .project-feature, .quote-panel"
  );

  revealTargets.forEach(el => el.classList.add("reveal"));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => observer.observe(el));

  // Small pointer glow effect on glass cards
  document.querySelectorAll(".glass").forEach(card => {
    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.background =
        `radial-gradient(circle at ${x}% ${y}%, rgba(229,9,20,.08), transparent 35%), rgba(17,18,21,.72)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.background = "";
    });
  });

  // Keyboard shortcut: press R to open resume
  document.addEventListener("keydown", event => {
    if (event.key.toLowerCase() === "r" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
      window.location.href = "resume.html";
    }
  });
});
