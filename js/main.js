// Animação suave para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de fade-in para cards quando entrarem na viewport
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação a todos os cards
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Controle de navegação responsiva
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar classe para controlar quando o usuário rolou a página
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Lazy loading para imagens
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Prevenção de spam em links de redes sociais
document.querySelectorAll('.social-link').forEach(link => {
    let clickCount = 0;
    let lastClick = 0;

    link.addEventListener('click', (e) => {
        const now = Date.now();
        if (now - lastClick < 1000) { // Intervalo mínimo de 1 segundo entre cliques
            clickCount++;
            if (clickCount > 3) { // Máximo de 3 cliques rápidos
                e.preventDefault();
                alert('Por favor, aguarde um momento antes de tentar novamente.');
                clickCount = 0;
            }
        } else {
            clickCount = 1;
        }
        lastClick = now;
    });
});