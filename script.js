document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const backToTop = document.querySelector('#back-to-top');
    const sections = document.querySelectorAll('.products, .features, .about, .user-guide, .contact');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        hamburger.setAttribute(
            'aria-expanded',
            hamburger.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
        );
    });

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            if (mobileNav.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Back to top button visibility
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Section visibility on scroll with fallback
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => observer.observe(section));
    } else {
        // Fallback for devices without IntersectionObserver support
        sections.forEach(section => section.classList.add('visible'));
    }

    // Preloader
    window.addEventListener('load', () => {
        document.getElementById('preloader').classList.add('loaded');
    });
});

// Lazy Load Video Iframes
document.addEventListener('DOMContentLoaded', () => {
    const iframes = document.querySelectorAll('.video-item iframe');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                iframe.src = iframe.dataset.src; // Set src from data-src
                iframe.classList.add('loaded');
                observer.unobserve(iframe);
            }
        });
    }, { rootMargin: '0px 0px 100px 0px' });

    iframes.forEach(iframe => observer.observe(iframe));
});