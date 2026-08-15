document.querySelectorAll('.project-gallery-item').forEach(function (gallery) {
    const images = JSON.parse(gallery.dataset.images || '[]');
    const image = gallery.querySelector('.project-gallery-image');
    const prevButton = gallery.querySelector('.gallery-arrow-prev');
    const nextButton = gallery.querySelector('.gallery-arrow-next');
    const dotsContainer = gallery.querySelector('.gallery-dots');
    let currentIndex = 0;
    let touchStartX = 0;

    if (!images.length || !image || !dotsContainer) {
        return;
    }

    images.forEach(function (_, index) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'gallery-dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Ir a la imagen ' + (index + 1));
        dot.addEventListener('click', function () {
            currentIndex = index;
            image.src = images[currentIndex];
            updateDots();
        });
        dotsContainer.appendChild(dot);
    });

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.gallery-dot');
        dots.forEach(function (dot, index) {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function updateImage(direction) {
        currentIndex = (currentIndex + direction + images.length) % images.length;
        image.src = images[currentIndex];
        updateDots();
    }

    image.addEventListener('click', function (event) {
        const rect = image.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const isLeftSide = clickX < rect.width / 2;

        updateImage(isLeftSide ? -1 : 1);
    });

    if (prevButton) {
        prevButton.addEventListener('click', function (event) {
            event.preventDefault();
            updateImage(-1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function (event) {
            event.preventDefault();
            updateImage(1);
        });
    }

    gallery.addEventListener('touchstart', function (event) {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    gallery.addEventListener('touchend', function (event) {
        const touchEndX = event.changedTouches[0].screenX;
        const difference = touchEndX - touchStartX;

        if (Math.abs(difference) > 40) {
            updateImage(difference < 0 ? 1 : -1);
        }
    }, { passive: true });
});
