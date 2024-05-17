import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAction, useQuery } from "convex/react";
import { useState } from "react";

interface FormProps {
  chatId: Id<"chats">;
}

export const Form = ({ chatId }: FormProps) => {
  const chat = useQuery(api.chats.get, { id: chatId });
  const sendMessage = useAction(api.messages.submit);

  const [message, setMessage] = useState<string>("");

  if (chat === undefined) {
    return null;
  }

  if (chat === null) {
    return <div>Chat not found</div>;
  }

  const handleSendMessage = async () => {
    if (message === "") return;

    const temp = message;
    setMessage("");
    await sendMessage({
      role: "user",
      content: temp,
      chatId: chat._id,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      setMessage(message + "\n");
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full max-h-96 my-2 px-2 sm:px-12 md:px-24 md:pr-[300px] 2xl:pr-[750px] 2xl:px-[400px] bg-neutral-800">
      <Textarea
        placeholder="Message ChatGPT..."
        className="w-full md:min-w-[600px]  lg:max-w-[700px] max-h-96 overflow-y-auto border-[1px] border-neutral-500 rounded-xl bg-inherit text-neutral-200 placeholder:text-neutral-400 min-h-12"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown} // Corrected event handler
      />
    </div>
  );
};