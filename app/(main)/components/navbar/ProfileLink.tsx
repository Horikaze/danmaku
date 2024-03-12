"use client";

import ProfileImage from "@/app/mainComponents/ProfileImage";
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";

export default function ProfileLink() {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  return (
    <>
      <div className="relative z-20" onClick={() => setIsOpen((prev) => !prev)}>
        <div className="flex gap-x-2 items-center hover:bg-hover transition-all py-1 px-3 rounded-md cursor-pointer">
          <div className="size-10 rounded-full bg-background relative overflow-hidden">
            <ProfileImage imageUrl={session.data?.user.image!} />
          </div>
          <p className="hidden md:block min-w-[4rem] text-end">
            {session.data?.user.name}
          </p>
        </div>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key={"navDropdown"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "just", duration: 0.15 }}
              className="absolute rounded-md w-full flex flex-col p-3 bg-primary drop-shadow-md items-stretch text-center transition-all min-w-36 right-0"
            >
              <Link
                replace
                href={"/profile"}
                className="py-2 hover:bg-hover relative rounded-md transition-all"
              >
                <FaUser className="absolute size-5 ml-2" />
                <p>Profile</p>
              </Link>
              <div
                onClick={() => {
                  signOut();
                }}
                className="py-2 hover:bg-hover rounded-md cursor-pointer relative  transition-all"
              >
                <FaSignInAlt className="absolute size-5 ml-2" />
                <p>Logout</p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      {isOpen ? (
        <div
          className="fixed w-full h-[calc(100vh)] top-0 left-0 z-10"
          onClick={() => {
            setIsOpen(false);
          }}
        />
      ) : null}
    </>
  );
}
