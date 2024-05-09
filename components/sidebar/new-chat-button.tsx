"use client";

import { Button } from "../ui/button";
import { PlusCircle, SquarePen } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

export const NewChatButton = () => {
  const create = useMutation(api.chats.create);

  const handleAdd = () => create({});

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
