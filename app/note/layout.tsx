import React from "react";
import Header from "../components/Header/page";
import Footer from "../components/Footer/page";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
