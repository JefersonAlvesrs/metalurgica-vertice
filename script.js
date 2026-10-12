// Configure aqui um número real, somente com dígitos e DDI (ex.: 5554999999999).
// Deixe vazio enquanto o site for apenas demonstrativo.
const WHATSAPP_NUMBER = "";
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");
toggle.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});
menu.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  }),
);
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#quote-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const nome = document.querySelector("#nome").value.trim();
  const servico = document.querySelector("#servico").value;
  const mensagem = document.querySelector("#mensagem").value.trim();
  const status = document.querySelector("#form-status");
  if (!nome || !servico || !mensagem) {
    status.textContent = "Preencha todos os campos.";
    return;
  }
  const texto = `Olá! Meu nome é ${nome}. Gostaria de um orçamento para ${servico}. Detalhes: ${mensagem}`;
  if (!/^\d{12,15}$/.test(WHATSAPP_NUMBER)) {
    status.textContent =
      "Mensagem preparada! Este é um projeto demonstrativo: configure um número de WhatsApp no arquivo script.js para habilitar o envio.";
    return;
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank", "noopener,noreferrer");
  status.textContent = "O WhatsApp foi aberto em uma nova aba.";
});

// Garante o retorno ao início, inclusive quando o hash já é #inicio.
document.querySelectorAll('a[href="#inicio"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  });
});
