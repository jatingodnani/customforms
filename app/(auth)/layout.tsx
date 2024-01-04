import Logo from "../../components/Logo";
import type { Metadata } from "next";
import Themegenerator from "./../../components/Themegenerator";
import { UserButton } from "@clerk/nextjs";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign-in",
  description: "Customforms",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen min-w-screen justify-center max-h-screen">
      <nav className="w-full flex h-[60px] p-6 border-b border-border items-center justify-between ">
        <Logo />
        <div className="flex gap-2 items-center justify-center">
          <Themegenerator />
         <Link href={"https://github.com/jatingodnani/customforms"}>
         <FaGithub size={30}/>
         </Link>
        </div>
      </nav>
      <main className="flex width-full grow items-center justify-center">{children}
     
      </main>
      <p className="text-muted-foreground">Made by Jatin</p>
    </div>
  );
}
