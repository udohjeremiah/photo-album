"use client";

// React
import { useState } from "react";

// Next
import { useRouter } from "next/navigation";
import Link from "next/link";

// Dependencies
import { EyeIcon, LoaderIcon, Trash2Icon, UndoIcon } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

// Actions
import { deletePhoto } from "@/actions/deletePhoto";
import { movePhoto } from "@/actions/movePhoto";

// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// Types
import { ImageProps } from "@/types";

export default function DisplayArchivedImages({
  images,
}: {
  images: ImageProps[];
}) {
  const [isMovingPhoto, setIsMovingPhoto] = useState<{
    [public_id: string]: boolean;
  }>(() => {
    const imagesMovingState: { [public_id: string]: boolean } = {};
    images.forEach((image) => {
      imagesMovingState[image.public_id] = false;
    });
    return imagesMovingState;
  });
  const [isDeletingPhoto, setIsDeletingPhoto] = useState<{
    [public_id: string]: boolean;
  }>(() => {
    const imagesDeletingState: { [public_id: string]: boolean } = {};
    images.forEach((image) => {
      imagesDeletingState[image.public_id] = false;
    });
    return imagesDeletingState;
  });

  const router = useRouter();

  const movePhotoToGallery = async (image: ImageProps) => {
    setIsMovingPhoto((prevMoveStates) => ({
      ...prevMoveStates,
      [image.public_id]: true,
    }));
    await movePhoto(image);
    setIsMovingPhoto((prevMoveStates) => ({
      ...prevMoveStates,
      [image.public_id]: true,
    }));

    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  const deletePhotoFromAccount = async (image: ImageProps) => {
    if (
      !confirm(
        "Are you sure you want to delete this photo? Please note that this action is irreversible.",
      )
    ) {
      return;
    }

    setIsDeletingPhoto((prevDeleteStates) => ({
      ...prevDeleteStates,
      [image.public_id]: true,
    }));
    await deletePhoto(image);
    setIsDeletingPhoto((prevDeleteStates) => ({
      ...prevDeleteStates,
      [image.public_id]: false,
    }));

    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1024: 3 }}>
      <Masonry gutter="32px">
        {images.map((image) => (
          <Card key={image.public_id} className="break-inside-avoid-column">
            <CardContent className="p-0">
              <CldImage
                src={image.public_id}
                alt={image.public_id}
                width={image.width}
                height={image.height}
                className="rounded-t-xl"
              />
            </CardContent>
            <CardFooter className="mt-1 flex p-0">
              <Button asChild variant="ghost">
                <Link href={image.secure_url}>
                  <EyeIcon className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                disabled={isMovingPhoto[image.public_id]}
                onClick={() => {
                  movePhotoToGallery(image);
                }}
              >
                {isMovingPhoto[image.public_id] ? (
                  <LoaderIcon className="h-4 w-4 animate-spin" />
                ) : (
                  <UndoIcon className="h-4 w-4" />
                )}
                <span className="sr-only">Move to gallery</span>
              </Button>
              <Button
                variant="ghost"
                disabled={isDeletingPhoto[image.public_id]}
                onClick={() => {
                  deletePhotoFromAccount(image);
                }}
              >
                {isDeletingPhoto[image.public_id] ? (
                  <LoaderIcon className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2Icon className="h-4 w-4 text-red-500" />
                )}
                <span className="sr-only">Delete permanently</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
