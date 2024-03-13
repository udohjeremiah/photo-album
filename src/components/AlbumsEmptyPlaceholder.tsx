// Next
import Link from "next/link";

// Dependencies
import { ImagesIcon, LibraryBigIcon } from "lucide-react";

// Components
import { Button } from "@/components/ui/button";

export default function AlbumsEmptyPlaceholder() {
  return (
    <div className="flex h-[430px] items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex flex-col items-center justify-center text-center">
        <LibraryBigIcon className="h-12 w-12" />
        <h3 className="mt-4 text-lg font-semibold">No albums created</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You have not added any photos to an album. Go to the gallery to do so.
        </p>
        <Button asChild variant="default" className="flex items-center">
          <Link href="/gallery">
            <ImagesIcon className="mr-2 h-4 w-4" />
            Gallery
          </Link>
        </Button>
      </div>
    </div>
  );
}
