"use client";
import { registerUserAction } from "@/app/profile/actions/profileActions";
import { Divider } from "@/app/mainComponents/Divider";
import { ButtonInput } from "@/app/mainComponents/InputButton";
import { InputText } from "@/app/mainComponents/InputText";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaDiscord, FaGithub } from "react-icons/fa";
const tabs = ["Login", "Register"];
export default function LoginForm() {
  const [currentTab, setCurrentTab] = useState<"Login" | "Register">("Login");
  const router = useRouter();
  const socialAction = (action: string) => {
    signIn(action, {
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
        console.log(callback?.error);
      }
      if (callback?.ok && !callback.error) {
        console.log("Logged");
      }
    });
  };
  return (
    <form
      action={async (e) => {
        try {
          if (currentTab === "Register") {
            const { status, data } = await registerUserAction(e);
            if (status === "Registered") {
              toast.success(`${status}`);
              signIn("credentials", {
                nickname: data?.nickname,
                password: data?.password,
              });
              router.refresh();
              return;
            }
            toast.error(`${status}`);
          }
          if (currentTab === "Login") {
            signIn("credentials", {
              nickname: e.get("nickname"),
              password: e.get("password"),
              redirect: false,
            }).then((callback) => {
              if (callback?.error) {
                toast.error("Invalid credentials");
              }
              if (callback?.ok && !callback.error) {
                router.refresh();
              }
            });
          }
        } catch (error) {
          toast.error(`${error}`);
        }
      }}
      className="flex flex-col w-full h-full items-center gap-y-10"
    >
      <div className="size-56 bg-primary">image</div>
      <div className="bg-primary w-full rounded-md md:max-w-[500px] p-3 flex flex-col gap-y-3 drop-shadow-md">
        <div className="flex justify-center space-x-1 font-light">
          {tabs.map((e) => (
            <button
              onClick={() => setCurrentTab(e as any)}
              type="button"
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
            <InputText type="text" placeholder="Nickname" name="nickname" />
          </div>
          <div className="grid w-full gap-1.5">
            <p>Password</p>
            <InputText type="password" placeholder="Password" name="password" />
          </div>

          {currentTab === "Register" ? (
            <div className="grid w-full gap-1.5">
              <p>Reapeat Password</p>
              <InputText
                type="password"
                placeholder="Password"
                name="confirmPassword"
              />
            </div>
          ) : null}
        </div>
        <div className="flex justify-between">
          <ButtonInput variant={"outline"}>Clear</ButtonInput>
          <ButtonInput> {currentTab}</ButtonInput>
        </div>
        <div className="relative bg-slate-500/20">
          <div className="text-center bg-primary px-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            or continue with
          </div>
          <Divider className="" />
        </div>
        <div className="flex justify-evenly mt-1">
          <ButtonInput
            type="button"
            onClick={() => {
              socialAction("discord");
            }}
            variant={"outline"}
            className="px-6"
          >
            <FaDiscord className="size-8" />
          </ButtonInput>
          <ButtonInput
            type="button"
            onClick={() => {
              socialAction("github");
            }}
            variant={"outline"}
            className="px-6"
          >
            <FaGithub className="size-8" />
          </ButtonInput>
        </div>
      </div>
    </form>
  );
}
