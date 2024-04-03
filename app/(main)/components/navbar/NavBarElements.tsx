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
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-x-6 ">
      <div className="bg-background h-12 w-20">logo</div>
      {navItems.map((e) => {
        let isActive = pathname.includes(e.href);
        if (pathname !== "/") {
          isActive = true;
        }
        console.log(isActive);
        return <NavbarItem key={e.href} {...e} active={isActive} />;
      })}
    </div>
  );
}
