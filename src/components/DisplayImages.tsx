"use client";

// Next
import Link from "next/link";

// Dependencies
import { CldImage } from "next-cloudinary";

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
}

// Lib
import { cn } from "@/lib/utils";

export default function DisplayImages({ images }: { images: ImageProps[] }) {
  return (
    <div className={cn("grid gap-6", "md:grid-cols-2", "lg:grid-cols-4")}>
      {images
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        .map((image) => (
          <Link key={image.public_id} href={image.secure_url}>
            <CldImage
              src={image.public_id}
              alt={image.public_id}
              width={image.width}
              height={image.height}
            />
          </Link>
        ))}
    </div>
  );
}
