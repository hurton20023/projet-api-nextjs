export const dynamic = "force-static";
import { NextResponse, NextRequest } from "next/server";
import { deleteUser, getUserById, updateUser } from "../users.service";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const user = await getUserById(id);

    if (!user) {
      return NextResponse.json(
        { success: false, status: 404, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, status: 200, data: user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, status: 500, error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const user = await getUserById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, status: 404, error: "User not found" },
        { status: 404 }
      );
    }

    await deleteUser(id);

    return NextResponse.json(
      { success: true, status: 200, message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, status: 500, error: "Failed to delete user" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const user = await getUserById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, status: 404, error: "User not found" },
        { status: 404 }
      );
    }

    const updatedUser = await updateUser(id, body);

    return NextResponse.json(
      { success: true, status: 200, data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, status: 500, error: "Failed to update user" },
      { status: 500 }
    );
  }
}
