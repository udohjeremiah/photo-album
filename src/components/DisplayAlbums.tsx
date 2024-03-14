"use client";

// React
import { useState } from "react";

// Next
import { useRouter } from "next/navigation";
import Link from "next/link";

// Dependencies
import { useUser } from "@clerk/nextjs";
import { FolderXIcon, LoaderIcon } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

// Actions
import { deleteAlbum } from "@/actions/deleteAlbum";

// Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Lib
import { cn } from "@/lib/utils";

interface AlbumProps {
  name: string;
  path: string;
}

export default function DisplayAlbums({ albums }: { albums: AlbumProps[] }) {
  const [isDeleting, setIsDeleting] = useState<Record<string, boolean>>({});

  const router = useRouter();

  const { user } = useUser();

  if (!user?.id) {
    return;
  }

  const deleteAlbumFromAccount = async (userId: string, albumName: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this album? Please be aware that this action is irreversible, and any images inside it will not be deleted.",
      )
    ) {
      return;
    }

    setIsDeleting((prevDeleting) => ({ ...prevDeleting, [albumName]: true }));
    await deleteAlbum(userId, albumName);
    setIsDeleting((prevDeleting) => ({ ...prevDeleting, [albumName]: false }));

    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1024: 3 }}>
      <Masonry gutter="32px">
        {albums.map((album) => (
          <Card key={album.path}>
            <CardHeader>
              <CardTitle>{album.name} Album</CardTitle>
              <CardDescription>
                Your {album.name} images in one place.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between gap-4">
              <Button
                variant="destructive"
                disabled={isDeleting[album.name]}
                onClick={() => {
                  deleteAlbumFromAccount(user?.id, album.name);
                }}
              >
                {isDeleting[album.name] ? (
                  <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FolderXIcon className="mr-2 h-4 w-4" />
                )}
                Delete
              </Button>
              <Button asChild>
                <Link href={`/albums/${album.name}`}>View Album</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
