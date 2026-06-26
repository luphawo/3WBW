import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password required" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Authentication endpoint ready",
      // Integration with NestJS backend coming soon
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request" },
      { status: 400 }
    );
  }
}
