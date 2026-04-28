document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const themeSwitch = document.querySelector('.theme-switch');
    const html = document.documentElement;

    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate hamburger to X
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
            spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(5px, -5px)' : 'none';
        });
    }

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Theme Toggle Logic
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    if (themeSwitch) {
        themeSwitch.addEventListener('click', (e) => {
            const toggleTheme = () => {
                const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateThemeIcon(newTheme);
            };

            // Modern Circular Reveal Animation using View Transitions API
            if (!document.startViewTransition) {
                toggleTheme();
                return;
            }

            const x = e.clientX;
            const y = e.clientY;
            const endRadius = Math.hypot(
                Math.max(x, innerWidth - x),
                Math.max(y, innerHeight - y)
            );

            const transition = document.startViewTransition(() => {
                toggleTheme();
            });

            transition.ready.then(() => {
                const clipPath = [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`,
                ];
                document.documentElement.animate(
                    {
                        clipPath: html.getAttribute('data-theme') === 'dark' ? clipPath.reverse() : clipPath,
                    },
                    {
                        duration: 500,
                        easing: 'ease-in-out',
                        pseudoElement: html.getAttribute('data-theme') === 'dark' 
                            ? '::view-transition-old(root)' 
                            : '::view-transition-new(root)',
                    }
                );
            });
        });
    }

    function updateThemeIcon(theme) {
        const icon = themeSwitch.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
});
