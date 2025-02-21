// Esperar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do carrossel 
    const carousel = document.querySelector('.carousel');
    const carouselImages = document.querySelector('.carousel-images');
    const slides = carouselImages.querySelectorAll('img');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');

    // Variáveis de controle
    let currentSlide = 0;
    let autoplayInterval;
    let isTransitioning = false;

    // Configuração inicial do carrossel
    function setupCarousel() {
        // Esconder todas as imagens exceto a primeira
        slides.forEach((slide, index) => {
            slide.style.display = index === 0 ? 'block' : 'none';
            
            // Criar dot para cada slide
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            
            // Adicionar evento de clique para cada dot
            dot.addEventListener('click', () => {
                if (!isTransitioning) {
                    goToSlide(index);
                    resetAutoplay();
                }
            });
            
            dotsContainer.appendChild(dot);
        });
    }

    // Função para transição entre slides
    function goToSlide(index) {
        if (currentSlide === index || isTransitioning) return;
        
        isTransitioning = true;

        // Fade out slide atual
        slides[currentSlide].style.opacity = '0';
        dotsContainer.children[currentSlide].classList.remove('active');
        
        setTimeout(() => {
            slides[currentSlide].style.display = 'none';
            
            // Preparar novo slide
            slides[index].style.display = 'block';
            
            // Pequeno delay para garantir que o display:block foi aplicado
            setTimeout(() => {
                slides[index].style.opacity = '1';
                dotsContainer.children[index].classList.add('active');
                currentSlide = index;
                isTransitioning = false;
            }, 50);
        }, 500); // Tempo igual à transição CSS
    }

    // Funções de navegação
    function nextSlide() {
        if (!isTransitioning) {
            const next = (currentSlide + 1) % slides.length;
            goToSlide(next);
        }
    }

    function prevSlide() {
        if (!isTransitioning) {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(prev);
        }
    }

    // Controle do autoplay
    function startAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, 5000); // Troca a cada 5 segundos
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Event Listeners para os botões
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    // Event Listeners para mouse hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        startAutoplay();
    });

    // Suporte a gestos touch para dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50; // Distância mínima para considerar como swipe

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        clearInterval(autoplayInterval);
    });

    carousel.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', () => {
        const swipeDistance = touchStartX - touchEndX;
        
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                nextSlide(); // Swipe para esquerda
            } else {
                prevSlide(); // Swipe para direita
            }
        }
        
        startAutoplay();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoplay();
        }
    });

    // Preload das imagens para transições mais suaves
    function preloadImages() {
        slides.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const newImg = new Image();
                newImg.src = src;
            }
        });
    }

    // Inicialização
    function initCarousel() {
        setupCarousel();
        preloadImages();
        startAutoplay();
    }

    // Iniciar o carrossel
    initCarousel();
});