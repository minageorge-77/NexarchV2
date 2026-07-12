"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function AdminTopNav({ setIsOpen }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/admin/login");
  };

  const user = session?.user;
  const initials = user?.name?.charAt(0) || "A";

  return (
    <header className="h-16 bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between px-6 shrink-0 sticky top-0 z-30">
      <div className="flex items-center">
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden p-2 -ml-2 text-on-surface-variant hover:text-primary transition-colors">
          
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-4 relative">
        <button
          className="relative p-2 text-on-surface-variant hover:text-primary transition-colors">
          
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-surface-container-lowest"></span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 focus:outline-none">
            
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm uppercase">
              {initials}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-bold text-on-surface leading-none mb-1">{user?.name || "Admin"}</p>
              <p className="text-[11px] font-mono uppercase text-outline leading-none">{user?.email || "admin@nexarch.io"}</p>
            </div>
            <svg className="w-4 h-4 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen &&
          <div className="absolute right-0 mt-3 w-48 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-card py-2 z-50">
              <div className="px-4 py-2 border-b border-outline-variant md:hidden">
                <p className="text-sm font-bold text-on-surface">{user?.name || "Admin"}</p>
                <p className="text-xs text-on-surface-variant">{user?.email || "admin@nexarch.io"}</p>
              </div>
              <Link href="#" className="block px-4 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-warm transition-colors">
                Profile Settings
              </Link>
              <button
              onClick={handleLogout}
              className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
              
                Sign Out
              </button>
            </div>
          }
        </div>
      </div>
    </header>);

}