"use client";

import { Button } from "../ui/button";
import { PlusCircle, SquarePen } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";

export const NewChatButton = () => {
  const create = useMutation(api.chats.create);
  const router = useRouter();

  const handleAdd = async () => { // Make handleAdd async
    try {
      const chatId = await create({}); // Wait for the creation and get chatId
      router.push(`/chat/${chatId}`); // Redirect to the newly created chat
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };
  return (
    <Button
      className="w-full flex justify-start items-center bg-inherit hover:bg-inherit p-0"
      onClick={handleAdd}
    >
      <PlusCircle className="h-4 w-4" />
      <p className="font-semibold text-start ml-3 mr-3">New chat</p>
      <SquarePen className="h-4 w-4 ml-auto" />
    </Button>
  );
};
