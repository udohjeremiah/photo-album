"use server";

// Dependencies
import cloudinary from "cloudinary";

// Types
import { ImageProps } from "@/types";

export async function addToAlbum(
  image: ImageProps,
  album: string,
  existingAlbum: boolean,
) {
  const [projectId, userId, ...rest] = image.public_id.split("/");
  const imageId = rest.pop();

  if (existingAlbum) {
    await cloudinary.v2.uploader.rename(
      image.public_id,
      `${projectId}/${userId}/${album}/${imageId}`,
    );
  } else {
    const response = await cloudinary.v2.api.create_folder(
      `${projectId}/${userId}/${album}`,
    );

    await cloudinary.v2.uploader.rename(
      image.public_id,
      `${response.path}/${imageId}`,
    );
  }
}
