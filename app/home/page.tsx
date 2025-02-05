'use client'

import {signIn, signOut, useSession} from "next-auth/react"
import Image from "next/image";

export default function Home() {
 const {data:session} =    useSession() //like a useSelector...session ko data 
 if(session){
    return(
        <>
        <h1 className="text-white">Welcome,{session.user?.name}</h1>
        <h3 className="text-white">{session.user?.email}</h3>
        <Image src={session.user?.image || "xaina"} alt="logo" height={50} width={50}/>
        <button onClick={()=>signOut()}>Sign out</button>
        </>
    )
 }
  return (
<div>
    <h1 className="text-white">Not Logged in</h1>
  <button onClick={()=>signIn('google')}>Signin with google</button>
</div>   
  );
}
