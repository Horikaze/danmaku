import Link from "next/link";
import { IconType } from "react-icons";

type NavbarElementProp = {
  href: string;
  icon: IconType;
  text: string;
};
export default function NavbarElement({
  href,
  icon: Icon,
  text,
}: NavbarElementProp) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="flex gap-x-2 py-2 px-3 rounded-full bg-primary hover:bg-hover transition-all cursor-pointer"
    >
      <Icon className="size-5" />
      <p className="hidden md:block">{text}</p>
    </Link>
  );
}
