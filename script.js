// Festive Confetti Animation
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');
let confettiPieces = [];

function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function randomColor() {
    const colors = ['#FFD700', '#3ddad7', '#fff3cd', '#e67e22', '#fff', '#b9770e'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createConfettiPiece() {
    return {
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * -confettiCanvas.height,
        r: 6 + Math.random() * 8,
        d: Math.random() * 50 + 40,
        color: randomColor(),
        tilt: Math.random() * 10 - 10,
        tiltAngle: 0,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05
    };
}

function initConfetti() {
    confettiPieces = [];
    for (let i = 0; i < 120; i++) {
        confettiPieces.push(createConfettiPiece());
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces.forEach(p => {
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 3, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
        ctx.stroke();
    });
    updateConfetti();
}

function updateConfetti() {
    for (let i = 0; i < confettiPieces.length; i++) {
        let p = confettiPieces[i];
        p.y += Math.cos(p.d) + 2 + p.r / 4;
        p.x += Math.sin(0.01 * p.d);
        p.tiltAngle += p.tiltAngleIncremental;
        p.tilt = Math.sin(p.tiltAngle) * 15;

        // Recycle confetti piece
        if (p.y > confettiCanvas.height) {
            confettiPieces[i] = createConfettiPiece();
            confettiPieces[i].x = Math.random() * confettiCanvas.width;
            confettiPieces[i].y = -10;
        }
    }
}

function animateConfetti() {
    drawConfetti();
    requestAnimationFrame(animateConfetti);
}

initConfetti();
animateConfetti();

// Glowing basmala effect
const basmala = document.querySelector('.basmala');
basmala.style.transition = 'color 0.5s ease, text-shadow 0.5s ease';
basmala.addEventListener('mouseenter', () => {
    basmala.style.color = '#fff';
    basmala.style.textShadow = '0 0 20px #FFD700, 0 0 40px #FFD700, 0 2px 8px #fff7';
});
basmala.addEventListener('mouseleave', () => {
    basmala.style.color = '#ffd700';
    basmala.style.textShadow = '';
});

// Section animation (unchanged)
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

