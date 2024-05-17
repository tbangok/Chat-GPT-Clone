import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NewChatButton } from "../new-chat-button";
import { ChatList } from "../chat-list";
import { UpgradePlanButton } from "../upgrade-plan-button";

export const MobileSidebar = () => {
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="text-white" />
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="flex h-full p-4 bg-neutral-950 flex-col max-w-2"
        >
          <NewChatButton />
          <ChatList />
          <UpgradePlanButton/>
        </SheetContent>
      </Sheet>
    </div>
  );
};
