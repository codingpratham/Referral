"use client"; // ✅ Fix: Ensures this is a Client Component

import { useSession, signIn, signOut } from "next-auth/react";
import {Appbar} from "@repo/ui/Appbar";

export default function Home() {
  const session = useSession();

  return (
    <>
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
    </>
  );
}
