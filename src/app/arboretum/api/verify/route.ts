import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const VALID_HASH = process.env.ARBORETUM_PASSWORD_HASH;

function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    if (!VALID_HASH) {
      console.error("ARBORETUM_PASSWORD_HASH not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const isValid = await bcrypt.compare(password, VALID_HASH);

    if (isValid) {
      const token = generateSessionToken();
      const cookieStore = await cookies();

      cookieStore.set("arboretum_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/arboretum",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Password verification error:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("arboretum_session");

    return NextResponse.json({
      authenticated: !!session?.value,
    });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
