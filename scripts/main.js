document.addEventListener('DOMContentLoaded', () => {
    // Initialize Animations
    if (window.AppAnimations) {
        window.AppAnimations.revealOnScroll();
        window.AppAnimations.handleNavbarScroll();
        window.AppAnimations.initParticles();
    }

    // Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Feedback Visual
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
                submitBtn.style.background = 'var(--accent)';
                submitBtn.style.color = '#1A1A2E';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                }, 3000);
            }, 1500);
        });
    }

    // Progress Bars Animation (if any)
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-width');
                entry.target.style.width = targetWidth + '%';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
});
