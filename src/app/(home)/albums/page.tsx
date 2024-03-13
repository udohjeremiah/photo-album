// Next
import type { Metadata } from "next";

// Dependencies
import { auth } from "@clerk/nextjs";

// Actions
import { fetchAlbums } from "@/actions/fetchAlbums";

// Components
import { Separator } from "@/components/ui/separator";
import AlbumsEmptyPlaceholder from "@/components/AlbumsEmptyPlaceholder";
import DisplayAlbums from "@/components/DisplayAlbums";

export const metadata: Metadata = {
  title: "Albums | Photo Album",
  description:
    "Regain the joy from your collection of connected memories. Explore and curate your visual journey with personalized albums. Immerse yourself in a gallery of stories, each album capturing the essence of your unique experiences through the lens.",
};

export default async function Albums() {
  const { userId } = auth();

  const albums = await fetchAlbums(userId || "");
  const filteredAlbums = albums.filter(
    (album: { name: string; path: string }) => album.name !== "archive",
  );

  return (
    <div className="min-h-[calc(100vh-7.2rem)] w-full border-l p-6">
      <div>
        <div className="space-y-1">
          <h2 className="text-3xl font-bold">Albums</h2>
          <p className="text-sm text-muted-foreground">
            Regain the joy from your collection of connected memories.
          </p>
        </div>
        <Separator className="my-4" />
        {albums.length ? (
          <DisplayAlbums albums={filteredAlbums} />
        ) : (
          <AlbumsEmptyPlaceholder />
        )}
      </div>
    </div>
  );
}
