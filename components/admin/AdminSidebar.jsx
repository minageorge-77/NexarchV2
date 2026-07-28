"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
{ name: "Analytics Dashboard", href: "/admin", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
{ name: "Services", href: "/admin/services", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
{ name: "Testimonials", href: "/admin/testimonials", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }
];


export default function AdminSidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen &&
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={() => setIsOpen(false)} />

      }

      {/* Sidebar */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-graphite text-white flex flex-col h-screen lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <Link href="/admin" className="text-xl font-display font-extrabold tracking-wider uppercase flex items-center gap-2">
            <span className="text-white">Nex</span>Arch
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive ?
                "bg-white/10 text-white" :
                "text-white/70 hover:bg-white/5 hover:text-white"}`
                }
                onClick={() => setIsOpen(false)} // close on mobile
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className="font-medium text-[15px]">{item.name}</span>
              </Link>);

          })}
        </nav>

        <div className="p-4 border-t border-white/10 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium text-[15px]">Back to Website</span>
          </Link>
        </div>
      </motion.aside>
    </>);

}