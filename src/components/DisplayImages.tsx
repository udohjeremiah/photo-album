"use client";

// React
import { useState } from "react";

// Next
import { useRouter } from "next/navigation";
import Link from "next/link";

// Dependencies
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { CldImage } from "next-cloudinary";

// Actions
import { toggleFavorite } from "@/actions/toggleFavorite";

// Lib
import { cn } from "@/lib/utils";

interface ImageProps {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: Date;
  bytes: number;
  width: number;
  height: number;
  folder: string;
  access_mode: string;
  url: string;
  secure_url: string;
  tags: string[];
  last_update: {
    tags_updated_at: Date;
    updated_at: Date;
  };
}

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

  const router = useRouter();

  return (
    <div className={cn("grid gap-6", "md:grid-cols-2", "lg:grid-cols-4")}>
      {images
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        .map((image) => (
          <div key={image.public_id} className="relative">
            <Link href={image.secure_url}>
              <CldImage
                src={image.public_id}
                alt={image.public_id}
                width={image.width}
                height={image.height}
              />
            </Link>
            <button
              onClick={async () => {
                setIsFavorite((prevFavorites) => ({
                  ...prevFavorites,
                  [image.public_id]: !prevFavorites[image.public_id],
                }));
                await toggleFavorite(
                  image.public_id,
                  isFavorite[image.public_id],
                );
                router.refresh();
              }}
              className={cn(
                "absolute right-2 top-2 text-white",
                "hover:text-red-500",
                isFavorite[image.public_id] && "text-red-500",
              )}
            >
              <HeartFilledIcon className="h-6 w-6" />
            </button>
          </div>
        ))}
    </div>
  );
}
