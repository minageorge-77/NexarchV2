import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: [
        { sourceMedium: "Direct / None", sessions: "1420" },
        { sourceMedium: "Google / Organic", sessions: "980" },
        { sourceMedium: "LinkedIn / Referral", sessions: "540" },
        { sourceMedium: "Facebook / Social", sessions: "310" },
        { sourceMedium: "Email / Newsletter", sessions: "162" },
      ],
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
