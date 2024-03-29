// Dependencies
import { ImagesIcon } from "lucide-react";

// Components
import UploadButton from "./UploadButton";

export default function GalleryEmptyPlaceholder() {
  return (
    <div className="flex h-[430px] items-center justify-center rounded-md border border-dashed p-4">
      <div className="mx-auto flex flex-col items-center justify-center text-center">
        <ImagesIcon className="h-12 w-12" />
        <h3 className="mt-4 text-lg font-semibold">No photos added</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You have not added any photos. Add one below.
        </p>
        <UploadButton />
      </div>
    </div>
  );
}
