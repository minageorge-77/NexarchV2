"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {
  const [queryClient] = useState(
    () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minute
          refetchOnWindowFocus: false,
          retry: 1
        }
      }
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#04301E', // primary-deep
              color: '#fff',
              border: '1px solid #1E4635' // outline-variant
            },
            success: {
              iconTheme: {
                primary: '#78C626', // lime
                secondary: '#fff'
              }
            }
          }} />
        
      </SessionProvider>
    </QueryClientProvider>);

}