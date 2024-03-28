import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { FaSignInAlt } from "react-icons/fa";
import NavBarElements from "./NavBarElements";
import NavbarItem from "./NavbarItem";
import ProfileLink from "./ProfileLink";

export default async function NavBar() {
  const session = await getServerSession(authOptions);
  return (
    <nav
      className="bg-primary w-full h-14 flex justify-center items-center drop-shadow-md fixed top-0 z-10
   
    "
    >
      <div className="flex justify-between items-center size-full max-w-[2000px] px-2 md:px-4 lg:px-24 xl:px-36 2xl:px-72">
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
