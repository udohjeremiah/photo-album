"use server";

// Dependencies
import cloudinary from "cloudinary";

// Types
import { ImageProps } from "@/types";

export async function deletePhoto(image: ImageProps) {
  await cloudinary.v2.uploader.destroy(image.public_id);
}
