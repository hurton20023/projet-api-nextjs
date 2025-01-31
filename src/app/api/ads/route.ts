export const dynamic = "force-static";
import { NextResponse, NextRequest } from "next/server";
import { createAd, getAllAds } from "./ads.service";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const imageFile = formData.get("image") as File | null;

    const ad = await createAd({
      title: title || undefined,
      description: description || undefined,
      imageFile: imageFile instanceof File ? imageFile : null,
    });

    return NextResponse.json(
      { success: true, status: 200, data: ad },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, status: 500, error: "Failed to create ad" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const ads = await getAllAds();
    return NextResponse.json(
      { success: true, status: 200, data: ads },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch ads" }, { status: 500 });
  }
}
