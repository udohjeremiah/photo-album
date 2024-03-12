"use client";

// Next
import { useRouter } from "next/navigation";

// Dependencies
import { UploadIcon } from "@radix-ui/react-icons";
import { CldUploadButton } from "next-cloudinary";
import { useUser } from "@clerk/nextjs";

// Components
import { Button } from "@/components/ui/button";

export default function UploadButton() {
  const router = useRouter();

  const { user } = useUser();

  if (!user?.id) {
    return;
  }

  return (
    <Button asChild>
      <CldUploadButton
        uploadPreset="aplfe37p"
        options={{ folder: `photo-album/${user?.id}` }}
        onSuccess={() => {
          setTimeout(() => {
            router.refresh();
          }, 1000);
        }}
        className="flex items-center"
      >
        <UploadIcon className="mr-2 h-4 w-4" />
        Upload
      </CldUploadButton>
    </Button>
  );
}
