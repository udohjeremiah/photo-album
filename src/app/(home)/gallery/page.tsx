// Next
import type { Metadata } from "next";

// Dependencies
import { auth } from "@clerk/nextjs";
import cloudinary from "cloudinary";

// Components
import { Separator } from "@/components/ui/separator";
import DisplayImages from "@/components/DisplayImages";
import GalleryEmptyPlaceholder from "@/components/GalleryEmptyPlaceholder";
import UploadButton from "@/components/UploadButton";

export const metadata: Metadata = {
  title: "Gallery | Photo Album",
  description:
    "Rediscover your cherished moments in a personalized photo gallery. Immerse yourself in the beauty of your own visual narrative, showcasing the unique stories captured through your lens.",
};

export default async function Gallery() {
  const { userId } = auth();

  const { resources } = await cloudinary.v2.api.resources({
    type: "upload",
    prefix: `photo-album/${userId}`,
    tags: true,
  });

  return (
    <div className="min-h-[calc(100vh-7.2rem)] w-full border-l p-6">
      <div>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold">Gallery</h2>
            <p className="text-sm text-muted-foreground">
              Rediscover your cherished moments.
            </p>
          </div>
          <UploadButton />
        </div>
        <Separator className="my-4" />
        {resources.length ? (
          <DisplayImages images={resources} />
        ) : (
          <GalleryEmptyPlaceholder />
        )}
      </div>
    </div>
  );
}
