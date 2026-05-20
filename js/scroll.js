// Ждем загрузки DOM, чтобы элементы точно были доступны
document.addEventListener('DOMContentLoaded', () => {
    const worksLink = document.getElementById('works-link');
    const projectsSection = document.getElementById('projects');

    if (worksLink && projectsSection) {
        worksLink.addEventListener('click', (e) => {
            e.preventDefault(); // Отменяем резкий прыжок браузера по якорю

            // Получаем позицию секции относительно верха страницы
            const sectionTop = projectsSection.offsetTop;

            // Выполняем плавный скролл
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        });
    }
});