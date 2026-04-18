const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

const WHATSAPP_NUMBER = "905010367039";
const WHATSAPP_GREETING =
  "Hello Velaxa, I would like a treatment consultation.";
const PAGE_MESSAGES = {
  "index.html":
    "Hello Velaxa, I would like a consultation for hair transplant or dental care.",
  "services.html":
    "Hello Velaxa, I would like help choosing the right treatment.",
  "hair-transplant.html":
    "Hello Velaxa, I would like a hair transplant consultation. I can share my photos.",
  "dental-implants.html":
    "Hello Velaxa, I would like a dental implant consultation. I can share my photos or X-ray.",
  "crowns.html":
    "Hello Velaxa, I would like a crown consultation. I can share my smile photos.",
  "hollywood-smile.html":
    "Hello Velaxa, I would like a Hollywood Smile consultation. I can share my smile photos.",
  "gallery.html":
    "Hello Velaxa, I reviewed the clinic gallery and would like a consultation.",
  "blog.html":
    "Hello Velaxa, I reviewed the treatment guides and would like a consultation.",
  "about.html":
    "Hello Velaxa, I would like to start a consultation.",
  "contact.html":
    "Hello Velaxa, I would like to start my consultation.",
  "privacy.html":
    "Hello Velaxa, I would like to contact your team.",
  "terms.html":
    "Hello Velaxa, I would like to contact your team.",
};
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const defaultPageMessage = PAGE_MESSAGES[currentPage] || WHATSAPP_GREETING;

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function closeNav() {
  if (!toggle || !nav) return;
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("is-open")) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    closeNav();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });
}

document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  const customText = link.getAttribute("data-whatsapp-text");
  link.setAttribute("href", buildWhatsAppUrl(customText || defaultPageMessage));
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noreferrer");
});

const assessmentForm = document.querySelector("#assessment-form");

if (assessmentForm) {
  assessmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(assessmentForm);
    const fullName = formData.get("full_name") || "";
    const country = formData.get("country") || "";
    const language = formData.get("language") || "";
    const treatment = formData.get("treatment") || "";
    const phone = formData.get("phone") || "";
    const timing = formData.get("timing") || "";
    const details = formData.get("details") || "";
    const intro = treatment
      ? `Hello Velaxa, I would like a consultation about ${treatment}.`
      : defaultPageMessage;

    const message = [
      intro,
      "",
      `Full name: ${fullName}`,
      `Country: ${country}`,
      `Preferred language: ${language}`,
      `Treatment: ${treatment}`,
      `Phone / WhatsApp: ${phone}`,
      `Travel timing: ${timing}`,
      `Details: ${details}`,
    ].join("\n");

    window.open(buildWhatsAppUrl(message), "_blank", "noreferrer");
  });
}
