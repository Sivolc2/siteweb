const QRCode = require('qrcode');
const fs = require('fs').promises;
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

async function generateCustomQR() {
  try {
    const url = 'https://framework-zero.com/';
    const outputPath = path.join(__dirname, '../public/framework-zero-qr.png');

    // First generate QR code with transparent background
    const options = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.95,
      margin: 1,
      color: {
        dark: '#3B82F6', // blue-500 from Tailwind
        light: '#00000000' // Transparent background
      },
      width: 1000,
    };

    // Create a temporary canvas for the QR code
    const canvas = createCanvas(1200, 1200);
    const ctx = canvas.getContext('2d');

    // Fill with dark background (matching website)
    ctx.fillStyle = '#111827'; // gray-900 from Tailwind
    ctx.fillRect(0, 0, 1200, 1200);

    // Add galaxy swirls first (so they appear behind stars)
    for (let i = 0; i < 8; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 100 + 50;
      
      // Create a spiral effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      if (i % 2 === 0) {
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)'); // blue-500
        gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.05)');
      } else {
        gradient.addColorStop(0, 'rgba(147, 197, 253, 0.1)'); // blue-300
        gradient.addColorStop(0.5, 'rgba(147, 197, 253, 0.03)');
      }
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add small stars
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 1.2;
      
      // Draw main star
      ctx.beginPath();
      ctx.fillStyle = '#FFFFFF';
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add occasional colored stars
      if (i % 10 === 0) {
        ctx.beginPath();
        ctx.fillStyle = i % 20 === 0 ? '#3B82F6' : '#93C5FD'; // blue-500 and blue-300
        ctx.arc(x + 3, y + 3, size * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Generate QR code
    const qrBuffer = await QRCode.toBuffer(url, options);
    const qrImage = await loadImage(qrBuffer);

    // Calculate position to center QR code
    const qrSize = 1000;
    const x = (canvas.width - qrSize) / 2;
    const y = (canvas.height - qrSize) / 2;

    // Draw QR code on canvas
    ctx.drawImage(qrImage, x, y, qrSize, qrSize);

    // Add primary blue glow effect
    ctx.globalCompositeOperation = 'screen';
    ctx.shadowColor = '#3B82F6'; // blue-500
    ctx.shadowBlur = 15;
    ctx.drawImage(qrImage, x, y, qrSize, qrSize);
    
    // Add a second layer of glow for intensity
    ctx.shadowBlur = 8;
    ctx.globalAlpha = 0.7;
    ctx.drawImage(qrImage, x, y, qrSize, qrSize);

    // Add lighter blue accent glow
    ctx.shadowColor = '#93C5FD'; // blue-300
    ctx.shadowBlur = 4;
    ctx.globalAlpha = 0.3;
    ctx.drawImage(qrImage, x, y, qrSize, qrSize);

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;

    // Save the final image
    const buffer = canvas.toBuffer('image/png');
    await fs.writeFile(outputPath, buffer);

    console.log('Clean galaxy-themed QR Code generated successfully!');
    console.log('Output path:', outputPath);

  } catch (error) {
    console.error('Error generating QR code:', error);
  }
}

generateCustomQR(); 