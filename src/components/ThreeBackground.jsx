import { useRef, useEffect, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThreeBackground() {
    const canvasRef = useRef(null);
    const { theme } = useTheme();

    const colors = useMemo(() => ({
        dark: { bg: [9, 11, 19], particles: [99, 102, 241] },
        light: { bg: [240, 242, 255], particles: [99, 102, 241] }
    }), []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animId;
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;

        const NUM_PARTICLES = 120;

        const particles = Array.from({ length: NUM_PARTICLES }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.6 + 0.2,
        }));

        // Geometric shapes (triangles)
        const shapes = Array.from({ length: 8 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 40 + 20,
            rot: Math.random() * Math.PI * 2,
            vrot: (Math.random() - 0.5) * 0.008,
            vy: (Math.random() - 0.5) * 0.2,
            opacity: Math.random() * 0.08 + 0.03,
            sides: [3, 4, 6][Math.floor(Math.random() * 3)],
        }));

        const drawPolygon = (cx, cy, r, sides, rot, opacity, col) => {
            ctx.beginPath();
            for (let i = 0; i < sides; i++) {
                const angle = rot + (i / sides) * Math.PI * 2;
                const x = cx + Math.cos(angle) * r;
                const y = cy + Math.sin(angle) * r;
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        };

        const render = () => {
            const col = colors[theme] || colors.dark;
            const bg = col.bg;
            const p = col.particles;

            ctx.fillStyle = `rgba(${bg[0]},${bg[1]},${bg[2]},0.15)`;
            ctx.fillRect(0, 0, w, h);

            // Draw particles
            particles.forEach(pt => {
                pt.x += pt.vx;
                pt.y += pt.vy;
                if (pt.x < 0) pt.x = w;
                if (pt.x > w) pt.x = 0;
                if (pt.y < 0) pt.y = h;
                if (pt.y > h) pt.y = 0;

                ctx.beginPath();
                ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p[0]},${p[1]},${p[2]},${pt.opacity})`;
                ctx.fill();
            });

            // Connecting lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        const alpha = (1 - dist / 100) * 0.12;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${p[0]},${p[1]},${p[2]},${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // Geometric shapes
            shapes.forEach(s => {
                s.rot += s.vrot;
                s.y += s.vy;
                if (s.y > h + 60) s.y = -60;
                if (s.y < -60) s.y = h + 60;
                drawPolygon(s.x, s.y, s.size, s.sides, s.rot, s.opacity, p);
            });

            animId = requestAnimationFrame(render);
        };

        render();

        const onResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', onResize);
        };
    }, [theme, colors]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                display: 'block',
            }}
        />
    );
}
