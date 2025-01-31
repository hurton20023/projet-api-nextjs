export const dynamic = "force-static";
import { createUser, getUsers } from "./users.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json(
      { success: true, status: 200, data: users },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, status: 500, error: "Failed to get users" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await createUser(body);
    return NextResponse.json(
      { success: true, status: 201, data: user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, status: 500, error: "Failed to create user" },
      { status: 500 }
    );
  }
}
