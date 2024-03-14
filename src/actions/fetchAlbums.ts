"use server";

// Dependencies
import cloudinary from "cloudinary";

export async function fetchAlbums(userId: string) {
  try {
    const { folders } = await cloudinary.v2.api.sub_folders(
      `photo-album/${userId}`,
    );
    return folders;
  } catch (error) {
    console.error("Error fetching albums:", error);
    return [];
  }
}
