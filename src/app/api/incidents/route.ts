import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: "Incident reported successfully",
      incident: {
        id: `inc-${Date.now()}`,
        ...body,
        status: "open",
        reportedAt: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Incident reporting API ready",
  });
}
