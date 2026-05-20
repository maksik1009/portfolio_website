// Рендер карточек проектов на главной странице

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.projects-grid');
    if (!container) return;

    // Берём только первые 3 проекта
    const featured = PROJECTS.slice(0, 3);

    featured.forEach(p => {
        const card = document.createElement('article');
        card.className = 'project-card';

        card.innerHTML = `
            <div class="project-img">
                <img src="${p.imgs[0]}" alt="${p.title} preview">
            </div>
            <div class="project-tech">${p.tech.join(' | ')}</div>
            <div class="project-content">
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
                <button class="btn-more" data-id="${p.id}">More &lt;~&gt;</button>
            </div>
        `;

        card.querySelector('.btn-more').addEventListener('click', () => openProjectOverlay(p.id));
        container.appendChild(card);
    });
});