'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ICyberScore from '@/public/ICyberScore.png';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, HelpCircle, User } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Recommendation', href: '/recommendation' },
  { label: 'Alerts', href: '/alerts' },
  { label: 'Settings', href: '/settings' },
  { label: 'Integrations', href: '/integrations' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      {/* Authenticated Header */}
      <header className="bg-[#1E2A3B] flex items-center justify-between">
        {/* Logo + Nav */}
        <div className="flex items-center gap-10">
          <Link href="/dashboard">
            <Image
              src={ICyberScore}
              alt="CyberScore Logo"
              width={100}
              height={12}
              className="object-contain"
            />
          </Link>
          <nav className="flex gap-6 text-sm text-white/80">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1 rounded-full transition ${
                  pathname === item.href
                    ? 'bg-white text-[#1E2A3B] font-semibold'
                    : 'hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search + Icons */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Hinted search text"
              className="pl-10 pr-4 py-2 rounded-full bg-white/90 text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          </div>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5 text-white" />
          </Button>
          <Button variant="ghost" size="icon">
            <Link href="/userprofile">
              <User className="h-5 w-5 text-white" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="">{children}</main>

      <footer className="text-center text-xs text-slate-500 mt-10 py-4 border-t border-gray-200">
        © {new Date().getFullYear()} CyberScore. All rights reserved.
      </footer>
    </div>
  );
}
