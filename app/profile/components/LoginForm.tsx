"use client";
import Divider from "@/app/mainComponents/Divider";
import { InputText } from "@/app/mainComponents/InputText";
import { motion } from "framer-motion";
import { useState } from "react";
const tabs = ["Login", "Register"];
export default function LoginForm() {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  return (
    <div className="flex flex-col w-full h-full items-center gap-y-10">
      <div className="size-56 bg-primary">image</div>
      <div className="bg-primary w-full rounded-md md:max-w-[500px] p-3 flex flex-col gap-y-3 drop-shadow-md">
        <div className="flex justify-center space-x-1 font-light">
          {tabs.map((e) => (
            <button
              onClick={() => setCurrentTab(e)}
              key={e}
              className="relative py-0.5 px-3.5 rounded-full"
            >
              {currentTab === e ? (
                <motion.div
                  layoutId="login-tab"
                  className="absolute inset-0 bg-white"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: "just", duration: 0.2 }}
                />
              ) : null}
              <span className="relative z-10 mix-blend-exclusion">{e}</span>
            </button>
          ))}
        </div>
        <Divider />
        <div className="flex flex-col gap-y-4">
          <div className="grid w-full gap-1.5">
            <p>Nickname</p>
            <InputText type="text" placeholder="Nickname" />
          </div>
          <div className="grid w-full gap-1.5">
            <p>Password</p>
            <InputText type="password" placeholder="Password" />
          </div>

          {currentTab === "Register" ? (
            <div className="grid w-full gap-1.5">
              <p>Reapeat Password</p>
              <InputText type="password" placeholder="Password" />
            </div>
          ) : null}
        </div>
        <div className="flex justify-between">
          <button className="border-white border-2 border-solid rounded-full py-1.5 px-4">
            Clear
          </button>
          <button className="bg-white border rounded-full text-black py-1.5 px-4">
            {currentTab}
          </button>
        </div>
      </div>
    </div>
  );
}
