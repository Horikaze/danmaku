import { getServerSession } from "next-auth";
import LoginForm from "./components/LoginForm";
import { authOptions } from "../api/auth/[...nextauth]/auth";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <div>
        <p>Logged as: {JSON.stringify(session.user.info)}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <LoginForm />
    </div>
  );
}
