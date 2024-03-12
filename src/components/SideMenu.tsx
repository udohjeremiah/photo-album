"use client";

// Components
import { ScrollArea } from "@/components/ui/scroll-area";
import Navigation from "@/components/Navigation";

// Hooks
import { useMediaQuery } from "@/hooks/use-media-query";

export default function SideMenu() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      {isDesktop && (
        <nav className="sticky top-12 h-[calc(100vh-7.2rem)] w-72">
          <ScrollArea className="h-full">
            <Navigation />
          </ScrollArea>
        </nav>
      )}
    </>
  );
}
