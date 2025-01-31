import { prisma } from "@/lib/prisma";
//Utils
import { uploadImageToCloudinary } from "@/utils/uploadImage";

export const createAd = async (data: {
  title?: string;
  description?: string;
  image?: string;
  createdBy?: string;
  updatedBy?: string;
  imageFile?: File | null;
}) => {
  let imageUrl: string | undefined;

  if (data.imageFile instanceof File) {
    imageUrl = await uploadImageToCloudinary(data.imageFile);
  }

  const { imageFile, ...adData } = data;

  const ad = await prisma.ads.create({
    data: {
      ...Object.fromEntries(
        Object.entries(adData).filter(([_, v]) => v !== undefined)
      ),
      image: imageUrl,
    },
  });

  return JSON.parse(
    JSON.stringify(ad, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};

export const getAllAds = async () => {
  return await prisma.ads.findMany();
};

export const getAdById = async (id: string) => {
  return await prisma.ads.findUnique({
    where: { id },
  });
};

export const updateAd = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    image?: string;
    updatedBy?: string;
    imageFile?: File | null;
  }
) => {
  let imageUrl: string | undefined;

  if (data.imageFile instanceof File) {
    imageUrl = await uploadImageToCloudinary(data.imageFile);
  }

  const { imageFile, ...adData } = data;

  const updatedAd = await prisma.ads.update({
    where: { id },
    data: {
      ...Object.fromEntries(
        Object.entries(adData).filter(([_, v]) => v !== undefined)
      ),
      image: imageUrl || data.image,
    },
  });

  return JSON.parse(
    JSON.stringify(updatedAd, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};

export const deleteAd = async (id: string) => {
  return await prisma.ads.delete({
    where: { id },
  });
};
