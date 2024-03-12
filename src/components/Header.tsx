"use client";

// Next
import Link from "next/link";

// Dependencies
import { UserButton } from "@clerk/nextjs";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

// Components
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Navigation from "./Navigation";
import ThemeSwitcher from "./ThemeSwitcher";

// Hooks
import { useMediaQuery } from "@/hooks/use-media-query";

export default function Header() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur">
      <div className="container flex items-center justify-between py-2">
        <h1 className="font-bold">
          <Link href="/">
            PHOTO ALBUM<span className="text-red-500">.</span>
          </Link>
        </h1>
        <div className="flex items-center gap-4">
          <UserButton />
          <ThemeSwitcher />
          {!isDesktop && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <HamburgerMenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent className="px-0 py-6">
                <Navigation />
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
