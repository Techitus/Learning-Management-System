'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession(); // Fetch session data

  if (session) {
    return (
      <>
        <h1 className="text-white">Welcome, {session.user?.name}</h1>
        <h3 className="text-white">{session.user?.email}</h3>
        
        {session.user?.image ? (
          <Image src={session.user.image} alt="User profile" height={50} width={50} />
        ) : (
          <p className="text-gray-400">No profile image available</p>
        )}

        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <div>
      <h1 className="text-white">Not Logged in</h1>
      <button onClick={() => signIn('google')}>Signin with Google</button>
    </div>
  );
}
