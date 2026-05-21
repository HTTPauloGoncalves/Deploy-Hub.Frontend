const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const toast = document.querySelector("[data-toast]");
const copyButtons = document.querySelectorAll("[data-copy]");
const revealItems = document.querySelectorAll(".reveal");

const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

const setMenu = (isOpen) => {
    nav?.classList.toggle("is-open", isOpen);
    header?.classList.toggle("menu-active", isOpen);
    menuToggle?.classList.toggle("is-active", isOpen);
    menuToggle?.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
};

menuToggle?.addEventListener("click", () => {
    setMenu(!nav?.classList.contains("is-open"));
});

nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        setMenu(false);
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        setMenu(false);
    }
});

const showToast = (message) => {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
        toast.classList.remove("is-visible");
    }, 1900);
};

copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
        const command = button.dataset.copy || "";

        try {
            await navigator.clipboard.writeText(command);
            button.textContent = "Copiado";
            showToast("Comando copiado");
        } catch {
            showToast("Selecione e copie o comando");
        }

        window.setTimeout(() => {
            button.textContent = "Copiar";
        }, 1600);
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.14
});

revealItems.forEach((item) => observer.observe(item));
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
