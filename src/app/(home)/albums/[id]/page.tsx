// Next
import type { Metadata, ResolvingMetadata } from "next";

// Dependencies
import { auth } from "@clerk/nextjs";
import cloudinary from "cloudinary";

// Components
import { Separator } from "@/components/ui/separator";
import DisplayImages from "@/components/DisplayImages";
import FavoritesEmptyPlaceholder from "@/components/FavoritesEmptyPlaceholder";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: `${params.id} Album | Photo Album`,
  };
}

export default async function Album({ params }: { params: { id: string } }) {
  const { userId } = auth();

  const { resources } = await cloudinary.v2.search
    .expression(`folder=photo-album/${userId}/${params.id}`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .execute();

  return (
    <div className="min-h-[calc(100vh-7.2rem)] w-full border-l p-6">
      <div>
        <div className="space-y-1">
          <h2 className="text-3xl font-bold">{params.id} Album</h2>
          <p className="text-sm text-muted-foreground">
            Regain the joy from your collection of connected memories.
          </p>
        </div>
        <Separator className="my-4" />
        {resources.length ? (
          <DisplayImages images={resources} />
        ) : (
          <FavoritesEmptyPlaceholder />
        )}
      </div>
    </div>
  );
}
