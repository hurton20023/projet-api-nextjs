import cloudinary from "@/lib/cloudinary";

export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  if (
    !file.type.startsWith("image/png") &&
    !file.type.startsWith("image/jpeg")
  ) {
    throw new Error("Only PNG and JPEG images are allowed.");
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(buffer);
    });

    return (result as any).secure_url;
  } catch (error) {
    throw error;
  }
};
