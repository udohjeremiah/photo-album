// Next
import type { Metadata } from "next";

// Dependencies
import { auth } from "@clerk/nextjs";
import cloudinary from "cloudinary";

// Components
import { Separator } from "@/components/ui/separator";
import DisplayArchivedImages from "@/components/DisplayArchivedImages";
import ArchivedEmptyPlaceholder from "@/components/ArchivedEmptyPlaceholder";

// Lib
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Archived | Photo Album",
  description:
    "Choose to erase an unwanted memory or recover a lost one. Explore your personalized archive and make space for the memories that matter most.",
};

export default async function Favorites() {
  const { userId } = auth();

  const { resources } = await cloudinary.v2.search
    .expression(`folder=photo-album/${userId}/archive`)
    .sort_by("created_at", "desc")
    .execute();

  return (
    <div className={cn("min-h-[calc(100vh-7.2rem)] w-full p-6", "lg:border-l")}>
      <div>
        <div className="space-y-1">
          <h2 className="text-3xl font-bold">Archived</h2>
          <p className="text-sm text-muted-foreground">
            Choose to erase an unwanted memory or recover a lost one.
          </p>
        </div>
        <Separator className="my-4" />
        {resources.length ? (
          <DisplayArchivedImages images={resources} />
        ) : (
          <ArchivedEmptyPlaceholder />
        )}
      </div>
    </div>
  );
}
