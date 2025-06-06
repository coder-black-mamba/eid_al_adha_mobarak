// Add a gentle animation to the basmala
const basmala = document.querySelector('.basmala');
basmala.style.transition = 'color 0.5s ease';

// Change color on hover
basmala.addEventListener('mouseenter', () => {
    basmala.style.color = '#2ecc71';
});

basmala.addEventListener('mouseleave', () => {
    basmala.style.color = '#3498db';
});

// Add a subtle animation to sections when they come into view
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
});
