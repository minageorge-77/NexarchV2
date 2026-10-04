"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Utility to read/write simple cookies
function getCookie(name) {
  if (typeof document === "undefined") return null;
  const v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
}

function setCookie(name, value, days) {
  if (typeof document === "undefined") return;
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

let lastTrackedUrl = "";
let lastTrackedTime = 0;

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only track actual routes, ignore API or static files if they somehow trigger this
    if (!pathname || pathname.startsWith("/api") || pathname.startsWith("/admin")) return;

    const currentUrl = pathname + (searchParams ? searchParams.toString() : "");
    const now = Date.now();

    // Prevent double tracking of the exact same URL within 2 seconds (fixes React 18 Strict Mode double fires)
    if (lastTrackedUrl === currentUrl && now - lastTrackedTime < 2000) {
      return;
    }

    lastTrackedUrl = currentUrl;
    lastTrackedTime = now;

    let sessionId = getCookie("nexarch_session_id");

    // Track page view
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        sessionId: sessionId || "", // Let server generate if empty
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.sessionId && !sessionId) {
          // Store new session ID in cookie for 1 day
          setCookie("nexarch_session_id", data.sessionId, 1);
        }
      })
      .catch((err) => {
        console.error("Analytics error:", err);
      });
  }, [pathname, searchParams]);

  return null;
}
