import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectMongo from "@/lib/mongodb";
import PageView from "@/models/PageView";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range") || "last30"; // today, last7, last30

    await connectMongo();

    // Determine date filter
    const now = new Date();
    let startDate = new Date();

    if (range === "today") {
      startDate.setHours(0, 0, 0, 0);
    } else if (range === "last7") {
      startDate.setDate(now.getDate() - 7);
    } else {
      // last30 is default
      startDate.setDate(now.getDate() - 30);
    }

    const dateQuery = { createdAt: { $gte: startDate } };

    // 1. Overview Stats
    const totalViews = await PageView.countDocuments(dateQuery);
    const uniqueSessions = (await PageView.distinct("sessionId", dateQuery)).length;

    // Today's views (always useful in overview)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todayViews = await PageView.countDocuments({ createdAt: { $gte: startOfToday } });

    // Last 7 days views (for overview)
    const startOfLast7 = new Date();
    startOfLast7.setDate(now.getDate() - 7);
    const last7DaysViews = await PageView.countDocuments({ createdAt: { $gte: startOfLast7 } });

    // 2. Top Pages (aggregation)
    const topPages = await PageView.aggregate([
      { $match: dateQuery },
      {
        $group: {
          _id: "$path",
          views: { $sum: 1 }
        }
      },
      { $sort: { views: -1 } },
      { $limit: 10 },
      { $project: { _id: 0, path: "$_id", views: 1 } }
    ]);

    // 3. Views over time (Group by day)
    const viewsOverTime = await PageView.aggregate([
      { $match: dateQuery },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          views: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, date: "$_id", views: 1 } }
    ]);

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalViews,
          uniqueSessions,
          todayViews,
          last7DaysViews,
        },
        topPages,
        viewsOverTime,
      }
    });

  } catch (error) {
    console.error("Analytics fetch error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
