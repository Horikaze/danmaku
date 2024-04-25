import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import LoginForm from "./components/LoginForm";
import MainProfile from "./components/MainProfile";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center">
        <LoginForm />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col w-full h-full bg-primary drop-shadow-md overflow-auto min-h-[1200px] rounded-md">
        <MainProfile userId={session.user.info.id} />
      </div>
    </>
  );
}
