import { FaHome, FaInfo, FaSearch } from "react-icons/fa";
import NavbarElement from "./NavbarElement";
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
export default function NavBar() {
  return (
    <nav
      className="bg-primary w-full h-16 flex justify-between items-center drop-shadow-md fixed top-0 z-10
    md:px-4 lg:px-24 xl:px-36 2xl:px-72
    "
    >
      <div className="flex items-center gap-x-6">
        <div className="bg-background h-12 w-20">logo</div>
        {navItems.map((e) => (
          <NavbarElement key={e.href} {...e} />
        ))}
      </div>
      <div>asa</div>
    </nav>
  );
}
