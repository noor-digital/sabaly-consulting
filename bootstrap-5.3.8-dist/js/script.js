/* Interactions du site Sabaly Consulting. */
document.addEventListener("DOMContentLoaded", () => {
  const words = ["formation", "transformation", "stratégie"];
  const rotatingText = document.getElementById("mot");
  if (rotatingText && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let index = 0;
    window.setInterval(() => {
      index = (index + 1) % words.length;
      rotatingText.textContent = words[index];
    }, 2500);
  }

  const navbar = document.querySelector("nav");
  if (navbar) {
    const updateNavbar = () => navbar.classList.toggle("scrolled", window.scrollY > 50);
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
  }

  const revealItems = document.querySelectorAll(".reveal, .reveal-right");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  // Le site est statique : le formulaire prépare un e-mail et ne l'envoie pas à lui seul.
  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const name = form.elements.namedItem("name").value.trim();
      const email = form.elements.namedItem("email").value.trim();
      const message = form.elements.namedItem("message").value.trim();
      const subject = encodeURIComponent("Message depuis le site Sabaly Consulting");
      const body = encodeURIComponent(`Nom : ${name}\nE-mail : ${email}\n\nMessage :\n${message}`);
      const status = form.querySelector(".contact-form-status");
      if (status) status.textContent = "Votre application de messagerie va s'ouvrir pour vous permettre d'envoyer le message. Aucun message n'est envoyé automatiquement par ce site.";
      window.location.href = `mailto:info@sabalyconsulting.com?subject=${subject}&body=${body}`;
    });
  });
});
