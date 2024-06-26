"use client";
import { usePathname } from "next/navigation";
import { FaHome, FaInfo, FaSearch } from "react-icons/fa";
import NavbarItem from "./NavbarItem";
const navItems = [
  {
    href: "/",
    icon: FaHome,
    text: "Home",
  },
  {
    href: "/search",
    icon: FaSearch,
    text: "Search",
  },
  {
    href: "/info",
    icon: FaInfo,
    text: "Info",
  },
];
export default function NavBarElements() {
  const pathname = usePathname() || "/"
  const splitedPathname = pathname.split("/")[1];
  return (
    <div className="flex items-center md:gap-x-6 gap-x-2 w-full justify-center md:justify-start">
      {navItems.map((e) => {
        return (
          <NavbarItem
            key={e.href}
            {...e}
            active={splitedPathname === e.href.substring(1)}
          />
        );
      })}
    </div>
  );
}
