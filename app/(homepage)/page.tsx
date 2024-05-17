"use client";

import { MobileSidebar } from "@/components/sidebar/mobile-sideber";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "../chat/[chatId]/_components/header";
import Image from "next/image";

export default function Home() {
  // const storeUser = useMutation(api.users.store);
  // const router = useRouter();
  // useEffect(() => {
  //   const fetch = async () => {
  //     const chatId = await storeUser({});
  //     router.push(`/chat/${chatId}`);
  //   };
  //   fetch();
  // }, [storeUser, router]);

  return (
    <div className="min-h-screen bg-neutral-800 h-full  ">
      <Header />

      <main className="flex pt-60 flex-col items-center justify-center p-24 bg-neutral-800  gap-8">
        <Image src="/logo.svg" alt="logo" width={60} height={60} />
        <p className="text-2xl font-semibold">How can I help you today?</p>
      </main>

    </div>
  );
}




 