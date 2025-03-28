import React, { useState } from 'react';
import Image from 'next/image';
import { X, Github, Instagram, Linkedin } from 'lucide-react';

export const ProfileSection = () => {
  const [isQRExpanded, setIsQRExpanded] = useState(false);

  return (
    <div className="bg-gray-900 p-6 border border-blue-500 rounded-lg">
      <div className="flex items-center gap-8 mb-4">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-[120px] h-[120px]">
            <Image 
              src="/placeholder-headshot.jpg"
              alt="Profile"
              fill
              className="rounded-full border-2 border-blue-400 object-cover"
            />
          </div>
          <div 
            className="relative w-[80px] h-[80px] cursor-pointer transition-transform hover:scale-105"
            onClick={() => setIsQRExpanded(true)}
          >
            <Image 
              src="/cvt_website_qr.png"
              alt="Website QR Code"
              fill
              className="rounded-lg"
            />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
            Clovis Vinant-Tang
          </h1>
          <p className="text-gray-300 font-mono max-w-2xl mb-4">
            Builder at the intersection of AI, space tech, and economic systems.
            <br />
            
            <br />
            Focused on developing intelligent solutions for the Post-Labor Economy!🚀
          </p>
          <div className="flex flex-col gap-2">
            <a 
              href="https://www.linkedin.com/in/clovis-vinant-tang/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
            >
              <Linkedin className="w-5 h-5" />
              <span className="font-mono">- LinkedIn</span>
            </a>
            <a 
              href="https://twitter.com/clovisvinant" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
            >
              <X className="w-5 h-5" />
              <span className="font-mono">- Twitter</span>
            </a>
            <a 
              href="https://github.com/Sivolc2" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              <span className="font-mono">- GitHub</span>
            </a>
            <a 
              href="https://www.instagram.com/sivolc11/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
            >
              <Instagram className="w-5 h-5" />
              <span className="font-mono">- Instagram</span>
            </a>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {isQRExpanded && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setIsQRExpanded(false)}
        >
          <div className="relative w-[300px] h-[300px] bg-white p-2 rounded-lg">
            <Image 
              src="/cvt_website_qr.png"
              alt="Website QR Code"
              fill
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}; 