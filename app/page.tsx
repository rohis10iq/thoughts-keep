"use client";

import { useRouter } from "next/navigation";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "./firebase/firebase";

export default function Home() {
    const router = useRouter();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
  
    const handleContinue = () => {
      router.push("./note");
    };
  
    const handleSignIn = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        
        router.push("/note"); 
      } catch (error) {
        console.error("Error during sign-in:", error);
        alert("Failed to sign in. Please try again.");
      }
    };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f5ba13] text-white selection:text-[#f3e57c]">
      <h1
        className="text-9xl font-bold text-white text-center mb-0 gradient-text"
        
      >
        Thoughts Keep
      </h1>
      <p
        className="text-4xl font-bold text-[#323030] mb-8 mt-4"
        
      >
        Keep your thoughts together. 
      </p>
      <div className="flex space-x-6">
        <button
          className="button py-3 px-6 rounded-lg font-bold shadow-md text-xl"
          onClick={handleSignIn}
        >
          {" "}
          Sign In
        </button>
      </div>
    </div>
  );
}
