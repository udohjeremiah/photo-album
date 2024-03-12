// Next
import Link from "next/link";

// Dependencies
import { HeartIcon, ImageIcon } from "@radix-ui/react-icons";

// Components
import { Button } from "@/components/ui/button";

export default function GalleryEmptyPlaceholder() {
  return (
    <div className="flex h-[430px] items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex flex-col items-center justify-center text-center">
        <HeartIcon className="h-12 w-12" />
        <h3 className="mt-4 text-lg font-semibold">No favorite photos added</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You have not marked any photos as favorite. Go to the gallery to do
          so.
        </p>
        <Button asChild variant="default" className="flex items-center">
          <Link href="/gallery">
            <ImageIcon className="mr-2 h-4 w-4" />
            Gallery
          </Link>
        </Button>
      </div>
    </div>
  );
}
