import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SiteStat from "@/models/SiteStat";

export async function GET() {
  try {
    await connectDB();
    let stats = await SiteStat.findOne();
    if (!stats) {
      stats = await SiteStat.create({
        implantLeads: 412,
        implantLeadsLabel: "Implant Leads",
        consultations: 158,
        consultationsLabel: "Consultations",
        monthlyProduction: 48920,
        monthlyProductionLabel: "Monthly production",
        featuredImageUrl: "/results.png",
        featuredClinicName: "Summit Implant & Oral Surgery",
        featuredLocation: "Buda, TX",
      });
    }
    return NextResponse.json({ success: true, data: stats }, { status: 200 });
  } catch (error) {
    console.error("GET /api/stats error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch site statistics",
        data: {
          implantLeads: 412,
          implantLeadsLabel: "Implant Leads",
          consultations: 158,
          consultationsLabel: "Consultations",
          monthlyProduction: 48920,
          monthlyProductionLabel: "Monthly production",
          featuredImageUrl: "/results.png",
          featuredClinicName: "Summit Implant & Oral Surgery",
          featuredLocation: "Buda, TX",
        },
      },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();

    let stats = await SiteStat.findOne();
    if (!stats) {
      stats = new SiteStat();
    }

    if (body.implantLeads !== undefined) stats.implantLeads = Number(body.implantLeads);
    if (body.implantLeadsLabel !== undefined) stats.implantLeadsLabel = body.implantLeadsLabel;
    if (body.consultations !== undefined) stats.consultations = Number(body.consultations);
    if (body.consultationsLabel !== undefined) stats.consultationsLabel = body.consultationsLabel;
    if (body.monthlyProduction !== undefined) stats.monthlyProduction = Number(body.monthlyProduction);
    if (body.monthlyProductionLabel !== undefined) stats.monthlyProductionLabel = body.monthlyProductionLabel;
    if (body.featuredImageUrl !== undefined) stats.featuredImageUrl = body.featuredImageUrl;
    if (body.featuredClinicName !== undefined) stats.featuredClinicName = body.featuredClinicName;
    if (body.featuredLocation !== undefined) stats.featuredLocation = body.featuredLocation;

    await stats.save();
    return NextResponse.json({ success: true, data: stats }, { status: 200 });
  } catch (error) {
    console.error("PUT /api/stats error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update site statistics" },
      { status: 400 }
    );
  }
}
