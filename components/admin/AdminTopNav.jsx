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
    <header className="h-16 bg-white border-b border-lightgray flex items-center justify-between px-6 shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden p-2 -ml-2 text-cloud hover:text-black transition-colors">
          
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold text-graphite hover:text-cloud transition-colors"
          title="Return to Home">
          
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Home</span>
        </Link>
      </div>

      <div className="flex items-center gap-4 relative">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 focus:outline-none">
            
            <div className="w-10 h-10 rounded-full bg-graphite flex items-center justify-center text-white font-bold text-sm uppercase">
              {initials}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-bold text-graphite leading-none mb-1">{user?.name || "Admin"}</p>
              <p className="text-[11px] font-mono uppercase text-cloud leading-none">{user?.email || "admin@nexarch.io"}</p>
            </div>
            <svg className="w-4 h-4 text-cloud" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen &&
          <div className="absolute right-0 mt-3 w-48 bg-white border border-lightgray rounded-xl shadow-card py-2 z-50">
              <div className="px-4 py-2 border-b border-lightgray md:hidden">
                <p className="text-sm font-bold text-graphite">{user?.name || "Admin"}</p>
                <p className="text-xs text-cloud">{user?.email || "admin@nexarch.io"}</p>
              </div>
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