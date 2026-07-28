"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Reveal from "@/components/Reveal";
import { signIn } from "next-auth/react";
import Header from "@/components/Header";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsPending(true);
    
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    
    setIsPending(false);
    
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Welcome back!");
      router.push("/admin");
    }
  };

  return (
    <>
      <Header isAdmin={true} hideNav={true} />
      <main className="min-h-screen bg-graphite flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/media/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-white/10 blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10">
        <Reveal variant="up" className="text-center mb-10">
          <h1 className="text-[32px] font-display font-extrabold text-white tracking-tight uppercase flex items-center justify-center gap-2">
            <span className="text-white">Nex</span>Arch <span className="text-white/30 font-light">OS</span>
          </h1>
          <p className="text-white/60 font-mono text-[11px] uppercase tracking-wider mt-3">
            Administrative Portal
          </p>
        </Reveal>

        <Reveal variant="up" delay={100}>
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-white/10">
            <h2 className="text-xl font-display font-bold text-graphite mb-6">Sign In</h2>
            
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-cloud mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-3 text-graphite focus:outline-none focus:border-graphite transition-colors"
                  placeholder="admin@nexarch.io" />
                
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-cloud mb-2 flex justify-between">
                  <span>Password</span>
                  <a href="#" className="text-graphite hover:text-black transition-colors">Forgot?</a>
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#f7f7f7] border border-lightgray rounded-xl px-4 py-3 text-graphite focus:outline-none focus:border-graphite transition-colors"
                  placeholder="••••••••" />
                
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full btn-primary bg-graphite hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2 mt-2">
                
                {isPending ?
                <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </> :

                "Sign In"
                }
              </button>
            </form>
          </div>
        </Reveal>

        <div className="mt-8 text-center">
          <p className="text-white/40 text-xs font-mono uppercase tracking-wider">
            &copy; {new Date().getFullYear()} NexArch Technologies
          </p>
        </div>
      </div>
    </main>
    </>
  );
}