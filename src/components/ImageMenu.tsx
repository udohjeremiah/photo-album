"use client";

// React
import { useEffect, useState } from "react";

// Next
import { useRouter } from "next/navigation";

// Dependencies
import { useUser } from "@clerk/nextjs";
import { HamburgerMenuIcon, PlusIcon } from "@radix-ui/react-icons";
import { ArchiveRestoreIcon, FolderPlusIcon, LoaderIcon } from "lucide-react";

// Actions
import { addToAlbum } from "@/actions/addToAlbum";
import { movePhoto } from "@/actions/movePhoto";
import { fetchAlbums } from "@/actions/fetchAlbums";

// Components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types
import { ImageProps } from "@/types";

export default function ImageMenu({ image }: { image: ImageProps }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openAddToAlbumDialog, setOpenAddToAlbumDialog] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [albumSelect, setAlbumSelect] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [isAddingToAlbum, setIsAddingToAlbum] = useState(false);
  const [isMovingToArchive, setIsMovingToArchive] = useState(false);

  const router = useRouter();

  const { user } = useUser();

  useEffect(() => {
    async function fetchData() {
      const albums = await fetchAlbums(user?.id || "");
      setAlbums(
        albums
          .filter(
            (album: { name: string; path: string }) => album.name !== "archive",
          )
          .map((album: { name: string; path: string }) => album.name),
      );
    }
    fetchData();
  }, [user?.id]);

  const addImageToAlbum = async (
    image: ImageProps,
    albumName: string,
    existingAlbum: boolean,
  ) => {
    if (!albumName.trim()) {
      return;
    }

    setIsAddingToAlbum(true);
    await addToAlbum(image, albumName, existingAlbum);
    setIsAddingToAlbum(false);
    setOpenAddToAlbumDialog(false);

    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  const moveImageToArchive = async (image: ImageProps) => {
    setIsMovingToArchive(true);
    await movePhoto(image, "archive");
    setIsMovingToArchive(false);
    setOpenDropdown(false);

    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  return (
    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <HamburgerMenuIcon className="h-4 w-4" />
          <span className="sr-only">Toggle image menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-2">
        <DropdownMenuItem asChild>
          <Dialog
            open={openAddToAlbumDialog}
            onOpenChange={(newOpenState) => {
              setOpenAddToAlbumDialog(newOpenState);
              if (!newOpenState) {
                setOpenDropdown(false);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button variant="outline">
                <PlusIcon className="mr-2 h-4 w-4" />
                Add to Album
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add to Album</DialogTitle>
                <DialogDescription>
                  Organize your cherished memories by creating an album or
                  adding images to an album for seamless navigation.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-2">
                  <Select
                    value={albumSelect}
                    onValueChange={(value) => setAlbumSelect(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an existing album" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Albums</SelectLabel>
                        {albums.map((album, index) => (
                          <SelectItem key={index} value={album}>
                            {album}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-2 flex items-center justify-center gap-4 text-sm before:grow-[1] before:border-spacing-0 before:border-[0.5px] after:grow-[1] after:border-[0.5px]">
                  Or create a new one
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="albumName" className="text-right">
                    Album
                  </Label>
                  <Input
                    id="albumName"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={isAddingToAlbum}
                  onClick={() =>
                    addImageToAlbum(
                      image,
                      albumSelect || albumName,
                      !!albumSelect,
                    )
                  }
                >
                  {isAddingToAlbum ? (
                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <FolderPlusIcon className="mr-2 h-4 w-4" />
                  )}
                  Add to Album
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            variant="outline"
            disabled={isMovingToArchive}
            onClick={() => moveImageToArchive(image)}
          >
            {isMovingToArchive ? (
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ArchiveRestoreIcon className="mr-2 h-4 w-4" />
            )}
            Move to Archive
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
