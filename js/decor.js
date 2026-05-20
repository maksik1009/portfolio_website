// Расставляет маленькие декор-элементы в пустых зонах страницы с анимациями

const DECOR_ITEMS = [
    { type: 'dots', cols: 3, rows: 3 },
    { type: 'dots', cols: 4, rows: 4 },
    { type: 'dots', cols: 5, rows: 3 },
    { type: 'square', w: 40, h: 40 },
    { type: 'square', w: 30, h: 50 },
];

const DOT_SIZE = 3;
const DOT_GAP  = 10;
const MARGIN   = 30;
const ATTEMPTS = 40;
const COUNT    = 28;

function getBlockedZones() {
    const selectors = [
        'header', 'aside', 'main > *', '.hero', '.quote',
        '.projects', '.skills', '.about', '.contacts', 'footer',
        '.project-card', '.skills-box', '.hero-img', '.hero-info'
    ];
    const zones = [];
    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            const r = el.getBoundingClientRect();
            zones.push({
                x1: r.left   + window.scrollX - MARGIN,
                y1: r.top    + window.scrollY - MARGIN,
                x2: r.right  + window.scrollX + MARGIN,
                y2: r.bottom + window.scrollY + MARGIN,
            });
        });
    });
    return zones;
}

function overlaps(x, y, w, h, zones) {
    for (const z of zones) {
        if (x < z.x2 && x + w > z.x1 && y < z.y2 && y + h > z.y1) return true;
    }
    return false;
}

function getItemSize(item) {
    if (item.type === 'dots') {
        const cell = DOT_SIZE + DOT_GAP;
        return { w: item.cols * cell, h: item.rows * cell };
    }
    return { w: item.w, h: item.h };
}

function createDots(cols, rows) {
    const el = document.createElement('div');
    el.setAttribute('aria-hidden', 'true');
    el.style.cssText = `
        position: absolute;
        display: grid;
        grid-template-columns: repeat(${cols}, ${DOT_SIZE}px);
        gap: ${DOT_GAP}px;
        pointer-events: none;
        z-index: 0;
    `;
    
    for (let i = 0; i < cols * rows; i++) {
        const span = document.createElement('span');
        // Случайная задержка анимации для каждой точки
        const delay = Math.random() * 3;
        const duration = 1 + Math.random() * 1; 
        
        span.style.cssText = `
            display:block;
            width:${DOT_SIZE}px;
            height:${DOT_SIZE}px;
            border-radius:50%;
            background:#ABB2BF;
            opacity:0.35;
            animation: twinkle ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
        `;
        el.appendChild(span);
    }
    return el;
}

function createSquare(w, h) {
    const el = document.createElement('div');
    el.setAttribute('aria-hidden', 'true');
    
    // Случайная анимация для квадрата
    const rotationDuration = 10 + Math.random() * 10;  // было 20-40 сек, станет 10-20 сек
    const pulseDuration = 1.5 + Math.random() * 1; 
    
    el.style.cssText = `
        position: absolute;
        width: ${w}px;
        height: ${h}px;
        border: 1px solid #ABB2BF;
        opacity: 0.25;
        pointer-events: none;
        z-index: 0;
        animation: rotateSlow ${rotationDuration}s linear infinite, 
                   pulse-decor ${pulseDuration}s ease-in-out infinite;
    `;
    return el;
}

function place() {
    const pageW = document.body.scrollWidth;
    const pageH = document.body.scrollHeight;
    const zones = getBlockedZones();

    const wrapper = document.createElement('div');
    wrapper.setAttribute('aria-hidden', 'true');
    wrapper.style.cssText = `
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: 0;
    `;

    let placed = 0;
    let itemIndex = 0;

    while (placed < COUNT) {
        const cfg = DECOR_ITEMS[itemIndex % DECOR_ITEMS.length];
        itemIndex++;

        const { w, h } = getItemSize(cfg);
        let found = false;

        for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
            const x = Math.random() * (pageW - w);
            const y = Math.random() * (pageH - h);

            if (!overlaps(x, y, w, h, zones)) {
                const el = cfg.type === 'dots'
                    ? createDots(cfg.cols, cfg.rows)
                    : createSquare(cfg.w, cfg.h);

                el.style.left = x + 'px';
                el.style.top  = y + 'px';
                wrapper.appendChild(el);

                zones.push({ x1: x - 10, y1: y - 10, x2: x + w + 10, y2: y + h + 10 });
                found = true;
                placed++;
                break;
            }
        }
    }

    document.body.insertBefore(wrapper, document.body.firstChild);
    document.body.style.position = 'relative';
}

window.addEventListener('load', place);