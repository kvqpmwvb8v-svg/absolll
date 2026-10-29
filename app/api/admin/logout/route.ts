import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";

export async function POST(request: Request) {
  try {
    const res = new Response();
    const session = await getIronSession(request, res, {
      cookieName: "ms_admin_session",
      password: process.env.ADMIN_SESSION_PASSWORD || "modern-historical-society-admin-secret-key-dev-only",
    });
    await session.destroy();
    return NextResponse.json({ success: true, message: "Logged out" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}