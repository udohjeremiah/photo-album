// Next
import type { Metadata } from "next";

// Dependencies
import { auth } from "@clerk/nextjs";
import cloudinary from "cloudinary";

// Components
import { Separator } from "@/components/ui/separator";
import DisplayImages from "@/components/DisplayImages";
import FavoritesEmptyPlaceholder from "@/components/FavoritesEmptyPlaceholder";

// Lib
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Favorites | Photo Album",
  description:
    "Relive the best of your best moments in your personalized Favorites section. Immerse yourself in the unmatched beauty of a photo gallery showcasing the extraordinary stories captured through your lens, featuring the most cherished memories of a lifetime.",
};

export default async function Favorites() {
  const { userId } = auth();

  const { resources } = await cloudinary.v2.search
    .expression(`folder=photo-album/${userId} AND tags=favorite`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .execute();

  return (
    <div className={cn("min-h-[calc(100vh-7.2rem)] w-full p-6", "lg:border-l")}>
      <div>
        <div className="space-y-1">
          <h2 className="text-3xl font-bold">Favorites</h2>
          <p className="text-sm text-muted-foreground">
            Relive the best of your best moments.
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
