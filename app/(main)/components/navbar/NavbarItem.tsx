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
  console.log(active);
  return (
    <Link
      href={href}
      className={`flex gap-x-2 py-2 px-3 rounded-full  ${
        active ? "bg-hover" : "bg-primary"
      } hover:bg-hover transition-all cursor-pointer`}
    >
      <Icon className="size-5" />
      <p className="hidden md:block">{text}</p>
    </Link>
  );
}
