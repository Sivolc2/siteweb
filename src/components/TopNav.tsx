import React from 'react';
import { Menu } from 'lucide-react';

export const TopNav = () => (
  <div className="bg-gray-900 border-b border-blue-500 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <span className="text-blue-400 font-mono">CV</span>
      <Menu className="w-6 h-6 text-blue-400 cursor-pointer" />
    </div>
  </div>
); 