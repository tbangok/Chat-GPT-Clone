"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { MessageBox } from "./message-box";

interface BodyProps {
  chatId: Id<"chats">;
}

export const Body = ({ chatId }: BodyProps) => {
  const messages = useQuery(api.messages.list, { chatId }) || [];
  const { user } = useUser();
  const scrollRef = useRef<HTMLDivElement>(null); // Changed to HTMLDivElement
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  return (
    <>
      <ScrollArea className="max-h-[calc(100%-150px)] h-full w-full flex-1">
        <div className="w-full   my-2 px-2 sm:px-12 md:px-24   md:pr-[100px]  2xl:px-[400px] ">
          {messages.map((message) => (
            <MessageBox
              key={message._id}
              message={message}
              userImageUrl={user?.imageUrl}
            />
          ))}
        </div>
        <div ref={scrollRef} />
      </ScrollArea>
    </>
  );
};
