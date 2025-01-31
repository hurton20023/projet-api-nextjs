export const dynamic = "force-static";
import { NextResponse, NextRequest } from "next/server";
import { deleteAd, updateAd, getAdById } from "../ads.service";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const ad = await getAdById(id);

    if (!ad) {
      return NextResponse.json(
        { success: false, status: 404, error: "Ad not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, status: 200, data: ad },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, status: 500, error: "Failed to fetch ad" },
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

    const ad = await getAdById(id);
    if (!ad) {
      return NextResponse.json({ error: "Ad not found" }, { status: 404 });
    }

    await deleteAd(id);

    return NextResponse.json(
      { success: true, status: 200, message: "Ad deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete ad" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const formData = await req.formData();
    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const imageFile = formData.get("image") as File | null;

    const ad = await getAdById(id);
    if (!ad) {
      return NextResponse.json({ error: "Ad not found" }, { status: 404 });
    }

    const adupdate = await updateAd(id, {
      title: title || undefined,
      description: description || undefined,
      imageFile: imageFile instanceof File ? imageFile : null,
    });

    return NextResponse.json(
      { success: true, status: 200, data: adupdate },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, status: 500, error: "Failed to update ad" },
      { status: 500 }
    );
  }
}
