"use server";

// Dependencies
import cloudinary from "cloudinary";

// Types
import { ImageProps } from "@/types";

export async function deleteAlbum(userId: string, album: string) {
  const { resources } = await cloudinary.v2.search
    .expression(`folder=photo-album/${userId}/${album}`)
    .execute();

  for (const image of resources as ImageProps[]) {
    const [projectId, userId, ...rest] = image.public_id.split("/");
    const imageId = rest.pop();

    await cloudinary.v2.uploader.rename(
      image.public_id,
      `${projectId}/${userId}/${imageId}`,
    );
  }

  await cloudinary.v2.api.delete_folder(`photo-album/${userId}/${album}`);
}
