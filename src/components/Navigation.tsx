'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Projects', href: '/projects' },
  { name: 'Timeline', href: '/timeline' },
  { name: 'Writing', href: '/writing' },
  { name: 'Chat', href: '/chat' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/50 border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
          >
            CV
          </Link>
          
          <div className="hidden sm:block">
            <div className="flex space-x-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      isActive
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-gray-300 hover:text-blue-400'
                    } px-1 py-2 text-sm font-medium transition-colors duration-150`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 