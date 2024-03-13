"use server";

// Dependencies
import cloudinary from "cloudinary";

// Types
import { ImageProps } from "@/types";

export async function movePhoto(image: ImageProps, to = "") {
  const [projectId, userId, ...rest] = image.public_id.split("/");
  const imageId = rest.pop();

  if (to) {
    await cloudinary.v2.uploader.rename(
      image.public_id,
      `${projectId}/${userId}/${to}/${imageId}`,
    );
  } else {
    await cloudinary.v2.uploader.rename(
      image.public_id,
      `${projectId}/${userId}/${imageId}`,
    );
  }
}
