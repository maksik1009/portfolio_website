// Рендер фан-фактов на странице about

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.facts-grid');
    if (!container) return;

    FACTS.forEach(text => {
        const item = document.createElement('div');
        item.className = 'fact-item';
        item.textContent = text;
        container.appendChild(item);
    });
});