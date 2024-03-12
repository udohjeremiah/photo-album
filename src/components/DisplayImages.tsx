"use client";

// React
import { useTransition } from "react";

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
  const [transition, startTransition] = useTransition();

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
              onClick={() => {
                startTransition(() => {
                  toggleFavorite(
                    image.public_id,
                    image.tags.includes("favorite"),
                  );
                });
                router.refresh();
              }}
              className={cn(
                "absolute right-2 top-2",
                "hover:text-red-500",
                image.tags.includes("favorite") && "text-red-500",
              )}
            >
              <HeartFilledIcon className="h-6 w-6" />
            </button>
          </div>
        ))}
    </div>
  );
}
