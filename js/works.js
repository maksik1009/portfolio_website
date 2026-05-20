// Рендер карточек, фильтрация и оверлей проекта

const FILTERS = ['all', 'development', 'design', 'games'];
let activeFilter = 'all';

// ── Фильтры ──────────────────────────────────────────────────────
function renderFilters(container) {
    FILTERS.forEach(filter => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn' + (filter === activeFilter ? ' active' : '');
        btn.dataset.filter = filter;
        btn.textContent = filter === 'all' ? 'All' : capitalize(filter);
        btn.addEventListener('click', () => {
            activeFilter = filter;
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGrid(document.querySelector('.works-grid'));
        });
        container.appendChild(btn);
    });
}

// ── Сетка карточек ───────────────────────────────────────────────
function renderGrid(container) {
    container.innerHTML = '';

    const filtered = activeFilter === 'all'
        ? PROJECTS
        : PROJECTS.filter(p => p.category === activeFilter);

    if (filtered.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'works-empty';
        empty.textContent = 'No projects in this category yet.';
        container.appendChild(empty);
        return;
    }

    filtered.forEach(project => {
        container.appendChild(createCard(project));
    });
}

// ── Карточка ─────────────────────────────────────────────────────
function createCard(p) {
    const article = document.createElement('article');
    article.className = 'project-card';
    article.dataset.id = p.id;

    article.innerHTML = `
        <div class="project-img">
            <img src="${p.imgs[0]}" alt="${p.title} preview">
        </div>
        <div class="project-tech">${p.tech.join(' | ')}</div>
        <div class="project-content">
            <div class="project-card__meta">
                <span class="project-card__category">${capitalize(p.category)}</span>
                <span class="project-card__date">${p.date}</span>
            </div>
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <button class="btn-more" data-id="${p.id}">More &lt;~&gt;</button>
        </div>
    `;

    article.querySelector('.btn-more').addEventListener('click', e => { e.preventDefault(); openProjectOverlay(p.id); });
    return article;
}

// ── Инициализация ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const filtersContainer = document.querySelector('.works-filters');
    const gridContainer    = document.querySelector('.works-grid');

    if (filtersContainer) renderFilters(filtersContainer);
    if (gridContainer)    renderGrid(gridContainer);
});