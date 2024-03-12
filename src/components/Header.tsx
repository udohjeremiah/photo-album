"use client";

// Next
import Link from "next/link";

// Dependencies
import { UserButton } from "@clerk/nextjs";

// Components
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
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
        </div>
      </div>
    </header>
  );
}
