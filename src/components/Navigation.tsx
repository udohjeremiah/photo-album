"use client";

// React
import { Dispatch, SetStateAction } from "react";

// Next
import { usePathname } from "next/navigation";
import Link from "next/link";

// Dependencies
import {
  ArchiveRestoreIcon,
  FolderHeartIcon,
  ImagesIcon,
  LibraryBigIcon,
} from "lucide-react";

// Components
import { Button } from "@/components/ui/button";

interface NavigationProps {
  drawerSetter?: Dispatch<SetStateAction<boolean>>;
}

export default function Navigation({ drawerSetter }: NavigationProps) {
  const pathname = usePathname();

  const handleClick = () => {
    if (drawerSetter) {
      drawerSetter(false);
    }
  };

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
            onClick={handleClick}
            className="w-full justify-start"
          >
            <Link href="/gallery">
              <ImagesIcon className="mr-2 h-4 w-4" />
              Gallery
            </Link>
          </Button>
          <Button
            asChild
            variant={pathname.startsWith("/albums") ? "secondary" : "ghost"}
            onClick={handleClick}
            className="w-full justify-start"
          >
            <Link href="/albums">
              <LibraryBigIcon className="mr-2 h-4 w-4" />
              Albums
            </Link>
          </Button>
          <Button
            asChild
            variant={pathname.startsWith("/favorites") ? "secondary" : "ghost"}
            onClick={handleClick}
            className="w-full justify-start"
          >
            <Link href="/favorites">
              <FolderHeartIcon className="mr-2 h-4 w-4" />
              Favorites
            </Link>
          </Button>
          <Button
            asChild
            variant={pathname.startsWith("/archived") ? "secondary" : "ghost"}
            onClick={handleClick}
            className="w-full justify-start"
          >
            <Link href="/archived">
              <ArchiveRestoreIcon className="mr-2 h-4 w-4" />
              Archived
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
