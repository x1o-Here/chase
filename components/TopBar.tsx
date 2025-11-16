'use client'

import { useState } from "react";
import { Button } from "./ui/button";
import { Bell, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "./NavLink";
import Image from "next/image";

const navigationItems = [
  { name: "Portfolio", path: "/" },
  { name: "Payments & Transactions", path: "/payments" },
  { name: "Cards", path: "/cards" },
  { name: "Self Service", path: "/self-service" },
];

export const TopBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-gray-300 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="w-full container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center overflow-hidden">
                <Image
                  src="/octogon-white.avif"
                  alt="Octogon Icon"
                  width={32}
                  height={32}
                  className="rounded-lg object-cover"
                />
              </div>
              <span className="font-bold text-lg hidden sm:inline-block">Chase Bank</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  href={item.path}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
                  activeClassName="text-primary bg-primary/10"
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
            {/* <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent" />
            </Button> */}
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden border-t bg-card",
            mobileMenuOpen ? "block" : "hidden"
          )}
        >
          <nav className="container flex flex-col px-4 py-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                activeClassName="text-primary bg-primary/10"
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
};