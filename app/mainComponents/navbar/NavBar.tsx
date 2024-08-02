import { FaSignInAlt } from "react-icons/fa";
import NavBarElements from "./NavBarElements";
import ProfileLink from "./ProfileLink";
import NavbarItem from "./NavbarItem";
import { auth } from "@/auth";

export default async function NavBar() {
  const session = (await auth()) || null;
  return (
    <nav
      className="bg-primary w-full h-14 flex justify-center items-center drop-shadow-md fixed top-0 z-10
   
    "
    >
      <div className="flex justify-between items-center container">
        <NavBarElements />
        {session ? (
          <ProfileLink />
        ) : (
          <NavbarItem href="/profile" icon={FaSignInAlt} text="Login" />
        )}
      </div>
    </nav>
  );
}
