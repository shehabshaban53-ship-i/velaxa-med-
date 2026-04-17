const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

const WHATSAPP_NUMBER = "905010367039";
const WHATSAPP_GREETING =
  "Hello Velaxa, I would like a treatment consultation.";

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  const customText = link.getAttribute("data-whatsapp-text");
  link.setAttribute("href", buildWhatsAppUrl(customText || WHATSAPP_GREETING));
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

    const message = [
      "Hello Velaxa, I would like a treatment consultation.",
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
