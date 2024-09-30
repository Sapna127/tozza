"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./Button";
import { useRouter } from "next/navigation";

export const Appbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignin = async () => {
    await signIn();
  };

  const handleSignout = async () => {
    await signOut();
    router.push("/api/auth/signin");
  };

  return (
    <div className="flex justify-between border-b px-4 border-slate-300">
      <div className="text-lg flex flex-col justify-center">PayTM</div>
      <div className="flex flex-col justify-center pt-2">
        <Button onClick={session ? handleSignout : handleSignin}>
          {session ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
