import Link from "next/link";
import { IconType } from "react-icons";

type NavbarItemProp = {
  href: string;
  icon: IconType;
  text: string;
  active?: boolean;
};
export default function NavbarItem({
  href,
  icon: Icon,
  text,
  active,
}: NavbarItemProp) {
  return (
    <Link
      href={href}
      className={`flex gap-x-2 py-2 px-4 md:px-3 rounded-full  ${
        active ? "bg-hover" : "bg-primary"
      } hover:bg-hover transition-all cursor-pointer`}
    >
      <Icon className="size-5 hidden md:block" />
      <p>{text}</p>
    </Link>
  );
}
