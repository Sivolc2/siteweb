import dynamic from 'next/dynamic';

const MainLayout = dynamic(() => import('@/components/MainLayout'), {
  ssr: false // Disable SSR for components using window/browser APIs
});

export default function Home() {
  return <MainLayout />;
} 