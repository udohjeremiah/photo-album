"use server";

// Dependencies
import cloudinary from "cloudinary";

export async function toggleFavorite(publicId: string, isFavorite: boolean) {
  if (isFavorite) {
    await cloudinary.v2.uploader.remove_tag("favorite", [publicId]);
  } else {
    await cloudinary.v2.uploader.add_tag("favorite", [publicId]);
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));
}
