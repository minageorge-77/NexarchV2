"use client";

import { useState } from "react";

export default function ChatFab() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4">
      {!dismissed &&
      <div className="bg-surface-container-lowest p-4 rounded-xl shadow-lift flex items-start gap-4 relative mr-14 mb-2 w-72 border border-outline-variant">
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-surface-container-lowest border-b border-r border-outline-variant transform rotate-45" />
          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-display font-bold">
            NX
          </div>
          <div className="text-[15px] text-on-surface pr-6">
            <p className="font-semibold mb-1">Hi there! Have a question?</p>
            <p className="text-on-surface-variant text-[13px]">Chat with us.</p>
          </div>
          <button
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 text-outline hover:text-on-surface transition-colors">
          
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </button>
        </div>
      }
      <button
        aria-label="Open Chat"
        className="btn-primary bg-lime text-white w-16 h-16 rounded-full shadow-lift flex items-center justify-center focus:ring-4 focus:ring-lime/30">
        
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2} />
          
        </svg>
      </button>
    </div>);

}