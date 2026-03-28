import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth/AuthContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CampusOne | Dark OS',
  description: 'Unified College Operating System for Academics & Operations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen flex flex-col antialiased relative overflow-x-hidden text-slate-200">
        
        {/* Ambient Dark Mode Lighting Background */}
        <div className="fixed inset-0 z-[-1] bg-[#020617]">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[150px]"></div>
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-violet-900/10 blur-[100px]"></div>
        </div>

        <AuthProvider>
          <Header />
          <div className="flex flex-1 mt-[72px]">
            <Sidebar />
            {/* Main content pane */}
            <main className="flex-1 w-full pb-24 relative z-0">
               <div className="container-max py-8">
                 {children}
               </div>
            </main>
          </div>
        </AuthProvider>

      </body>
    </html>
  );
}
