import React from 'react';
import Image from 'next/image';
import { Twitter, Github, Linkedin } from 'lucide-react';

export const ProfileSection = () => (
  <div className="bg-gray-900 p-6 border border-blue-500 rounded-lg">
    <div className="flex items-center gap-8 mb-4">
      <div className="relative w-[120px] h-[120px]">
        <Image 
          src="/placeholder-headshot.jpg"
          alt="Profile"
          fill
          className="rounded-full border-2 border-blue-400 object-cover"
        />
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
        <div className="flex gap-4">
          <a 
            href="https://twitter.com/clovisvinant" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a 
            href="https://github.com/Sivolc2" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/clovis-vinant-tang/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </div>
); 