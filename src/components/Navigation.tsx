"use client";

// Next
import { usePathname, useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Explore
        </h2>
        <div className="space-y-1">
          <Button
            variant={pathname.startsWith("/gallery") ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => router.push("/gallery")}
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Gallery
          </Button>
          <Button
            variant={pathname.startsWith("/albums") ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => router.push("/albums")}
          >
            <BackpackIcon className="mr-2 h-4 w-4" />
            Albums
          </Button>
          <Button
            variant={pathname.startsWith("/favorites") ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => router.push("/favorites")}
          >
            <HeartIcon className="mr-2 h-4 w-4" />
            Favorites
          </Button>
          <Button
            variant={pathname.startsWith("/archived") ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => router.push("/archived")}
          >
            <TrashIcon className="mr-2 h-4 w-4" />
            Archived
          </Button>
        </div>
      </div>
    </div>
  );
}
