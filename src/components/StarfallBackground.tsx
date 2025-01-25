import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export const StarfallBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number>();

  const createStar = (width: number, height: number): Star => ({
    x: Math.random() * width,
    y: height + Math.random() * 100, // Start below the screen
    size: Math.random() * 1.5 + 0.2, // Slightly smaller stars
    speed: Math.random() * 0.8 + 0.3, // Slightly slower
    opacity: Math.random() * 0.4 + 0.1 // More dim (0.1 to 0.5 opacity)
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize more stars
      starsRef.current = Array.from({ length: 100 }, () => createStar(canvas.width, canvas.height));
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      starsRef.current.forEach((star, index) => {
        // Update position - moving upward now
        star.y -= star.speed;
        
        // Reset star if it's out of view (above the screen)
        if (star.y < -10) {
          starsRef.current[index] = createStar(canvas.width, canvas.height);
        }

        // Draw star
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Optional: Add a subtle glow effect
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 3 // Increased glow radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.3})`); // Dimmer glow
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}; 