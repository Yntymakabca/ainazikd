const canvas = document.getElementById("fireworkCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.particles = [];

        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: this.x,
                y: this.y,
                radius: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 6,
                speedY: (Math.random() - 0.5) * 6,
                life: 100
            });
        }
    }

    update() {
        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.life -= 1;
        });

        this.particles = this.particles.filter(p => p.life > 0);
    }

    draw() {
        this.particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        });
    }
}

let fireworks = [];

function createFirework() {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height * 0.5;
    let color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    fireworks.push(new Firework(x, y, color));
}

function updateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach(firework => {
        firework.update();
        firework.draw();
    });

    fireworks = fireworks.filter(firework => firework.particles.length > 0);
}

setInterval(createFirework, 700);
setInterval(updateFireworks, 20);

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
