// Скролл-анимации — элементы появляются при прокрутке

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Элементы которые анимируются при скролле
    const animatedElements = document.querySelectorAll(`
        .project-card,
        .skills-box,
        .about-content,
        .about-img,
        .contacts-wrapper,
        .quote,
        .hero-info,
        .hero-img,
        .about-page__content,
        .skills-row,
        .facts-grid,
        .contacts-page__content,
        .contact-form
    `);

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});