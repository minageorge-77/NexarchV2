import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: [
        { pagePath: "/", sessions: "1,842" },
        { pagePath: "/services", sessions: "920" },
        { pagePath: "/results", sessions: "654" },
        { pagePath: "/about", sessions: "431" },
        { pagePath: "/contact", sessions: "310" },
      ],
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
