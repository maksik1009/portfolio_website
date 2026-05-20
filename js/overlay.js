// Универсальный оверлей проекта с коллажем фотографий

function openProjectOverlay(id) {
    const p = PROJECTS.find(p => p.id === id);
    if (!p) return;

    let currentMainIndex = 0; // Индекс текущего главного фото

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', p.title);

    const renderGallery = () => {
        const main = p.imgs[currentMainIndex];
        const thumbs = p.imgs.filter((_, i) => i !== currentMainIndex);

        return `
            <div class="gallery__main">
                <img src="${main}" alt="${p.title}">
            </div>
            ${thumbs.length > 0 ? `
                <div class="gallery__thumbs">
                    ${thumbs.map((src, i) => {
                        // Находим оригинальный индекс в массиве imgs
                        const originalIndex = p.imgs.indexOf(src);
                        return `
                            <div class="gallery__thumb" data-index="${originalIndex}">
                                <img src="${src}" alt="${p.title}">
                            </div>
                        `;
                    }).join('')}
                </div>
            ` : ''}
        `;
    };

    overlay.innerHTML = `
        <div class="overlay__backdrop"></div>
        <div class="overlay__panel">

            <div class="overlay__header">
                <div class="overlay__header-left">
                    <span class="project-card__category">${capitalize(p.category)}</span>
                    <span class="project-card__date">${p.date}</span>
                </div>
                <button class="overlay__close" aria-label="Close">close ×</button>
            </div>

            <div class="overlay__content">
                <div class="overlay__gallery">
                    ${renderGallery()}
                </div>

                <div class="overlay__body">
                    <h2 class="overlay__title">${p.title}</h2>
                    <div class="overlay__divider"></div>
                    <p class="overlay__desc">${p.descFull}</p>
                    <div class="overlay__divider"></div>
                    <div>
                        <p class="overlay__tech-label"># tech-stack</p>
                        <div class="overlay__tech">
                            ${p.tech.map(t => `<span>${t}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => overlay.classList.add('overlay--visible'));

    // Обработчики кликов на thumbnails
    const attachThumbClickHandlers = () => {
        const gallery = overlay.querySelector('.overlay__gallery');
        gallery.querySelectorAll('.gallery__thumb').forEach(thumb => {
            thumb.addEventListener('click', () => {
                const clickedIndex = parseInt(thumb.dataset.index);
                currentMainIndex = clickedIndex;
                
                // Перерисовываем галерею
                gallery.innerHTML = renderGallery();
                
                // Перенавешиваем обработчики
                attachThumbClickHandlers();
            });
        });
    };

    attachThumbClickHandlers();

    const close = () => {
        overlay.classList.remove('overlay--visible');
        overlay.addEventListener('transitionend', () => {
            overlay.remove();
            document.body.style.overflow = '';
        }, { once: true });
    };

    overlay.querySelector('.overlay__close').addEventListener('click', close);
    overlay.querySelector('.overlay__backdrop').addEventListener('click', close);

    const onEsc = e => {
        if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onEsc); }
    };
    document.addEventListener('keydown', onEsc);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}