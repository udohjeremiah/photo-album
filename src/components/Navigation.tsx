"use client";

// Next
import { usePathname } from "next/navigation";
import Link from "next/link";

// Dependencies
import {
  BackpackIcon,
  HeartIcon,
  ImageIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

// Components
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Explore
        </h2>
        <div className="space-y-1">
          <Button
            asChild
            variant={pathname.startsWith("/gallery") ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <Link href="/gallery">
              <ImageIcon className="mr-2 h-4 w-4" />
              Gallery
            </Link>
          </Button>
          <Button
            asChild
            variant={pathname.startsWith("/albums") ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <Link href="/albums">
              <BackpackIcon className="mr-2 h-4 w-4" />
              Albums
            </Link>
          </Button>
          <Button
            asChild
            variant={pathname.startsWith("/favorites") ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <Link href="/favorites">
              <HeartIcon className="mr-2 h-4 w-4" />
              Favorites
            </Link>
          </Button>
          <Button
            asChild
            variant={pathname.startsWith("/archived") ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <Link href="/archived">
              <TrashIcon className="mr-2 h-4 w-4" />
              Archived
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
