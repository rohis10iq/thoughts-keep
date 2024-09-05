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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5ba13] text-white selection:text-[#f3e57c] p-4">
      <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold text-white text-center mb-0 gradient-text">
        Thoughts Keep
      </h1>
      <p className="text-xl sm:text-2xl md:text-4xl font-bold text-[#323030] mb-8 mt-4 text-center">
        Keep your thoughts together.
      </p>
      <div className="flex space-x-4 sm:space-x-6">
        <button
          className="button py-2 px-4 sm:py-3 sm:px-6 rounded-lg font-bold shadow-md text-lg sm:text-xl transition-colors duration-300 ease-in-out bg-white text-[#f5ba13] hover:bg-[#f3e57c] hover:text-[#323030]"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <button
          className="button py-2 px-4 sm:py-3 sm:px-6 rounded-lg font-bold shadow-md text-lg sm:text-xl transition-colors duration-300 ease-in-out bg-white text-[#f5ba13] hover:bg-[#f3e57c] hover:text-[#323030]"
          onClick={handleContinue}
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}
