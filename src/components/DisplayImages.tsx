"use client";

// React
import { useState } from "react";

// Next
import { useRouter } from "next/navigation";
import Link from "next/link";

// Dependencies
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { EyeIcon, Share2Icon } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { toast } from "sonner";

// Actions
import { toggleFavorite } from "@/actions/toggleFavorite";

// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ImageMenu from "./ImageMenu";

// Lib
import { cn } from "@/lib/utils";

// Types
import { ImageProps } from "@/types";

export default function DisplayImages({ images }: { images: ImageProps[] }) {
  const [isFavorite, setIsFavorite] = useState<{
    [public_id: string]: boolean;
  }>(() => {
    const favorites: { [public_id: string]: boolean } = {};
    images.forEach((image) => {
      favorites[image.public_id] = image.tags.includes("favorite");
    });
    return favorites;
  });
  const [isFavoritingPhoto, setIsFavoritingPhoto] = useState<{
    [public_id: string]: boolean;
  }>(() => {
    const imagesFavoritingState: { [public_id: string]: boolean } = {};
    images.forEach((image) => {
      imagesFavoritingState[image.public_id] = false;
    });
    return imagesFavoritingState;
  });

  const router = useRouter();

  const togglePhotoAsFavorite = async (image: ImageProps) => {
    setIsFavoritingPhoto((prevMoveStates) => ({
      ...prevMoveStates,
      [image.public_id]: true,
    }));

    setIsFavorite((prevFavorites) => ({
      ...prevFavorites,
      [image.public_id]: !prevFavorites[image.public_id],
    }));

    await toggleFavorite(image.public_id, isFavorite[image.public_id]);

    setIsFavoritingPhoto((prevMoveStates) => ({
      ...prevMoveStates,
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
          <Card key={image.public_id}>
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
                  <span className="sr-only">View</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                disabled={isFavoritingPhoto[image.public_id]}
                onClick={() => {
                  togglePhotoAsFavorite(image);
                }}
              >
                <HeartFilledIcon
                  className={cn(
                    "h-4 w-4",
                    "hover:text-red-500",
                    isFavorite[image.public_id] && "text-red-500",
                  )}
                />
                <span className="sr-only">Like</span>
              </Button>
              <Button
                variant="ghost"
                onClick={async () => {
                  await navigator.clipboard.writeText(image.secure_url);
                  toast("🎉 Share your visual stories", {
                    description: "The image link has been successfully copied",
                    action: {
                      label: "Close",
                      onClick: () => toast.dismiss(),
                    },
                  });
                }}
              >
                <Share2Icon className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
              <ImageMenu image={image} />
            </CardFooter>
          </Card>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
