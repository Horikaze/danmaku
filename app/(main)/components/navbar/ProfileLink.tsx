"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaUser, FaSignInAlt } from "react-icons/fa";
export default function ProfileLink() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative" onClick={() => setIsOpen((prev) => !prev)}>
      <div className="flex gap-x-1 items-center hover:bg-hover transition-all py-1 px-3 rounded-md cursor-pointer">
        <div className="size-12 rounded-full bg-background" />
        <p>Username</p>
      </div>
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key={"navDropdown"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "just", duration: 0.1 }}
            className="absolute rounded-md w-full flex flex-col p-3 bg-primary drop-shadow-md items-stretch text-center transition-all semi"
          >
            <Link
              href={"/profile"}
              className="py-2 hover:bg-hover relative rounded-md"
            >
              <FaUser className="absolute size-5 ml-2" />
              <p>Profile</p>
            </Link>
            <div
              onClick={() => {
                console.log("clicked");
              }}
              className="py-2 hover:bg-hover rounded-md cursor-pointer relative"
            >
              <FaSignInAlt className="absolute size-5 ml-2" />
              <p>Logout</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
