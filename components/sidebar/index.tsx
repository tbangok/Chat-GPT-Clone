import { ChatList } from "./chat-list";
import { NewChatButton } from "./new-chat-button";
import { UpgradePlanButton } from "./upgrade-plan-button";

const SideBar = () => {
  return (
    <div className="h-full hidden md:flex md:flex-col md:w-[250px] lg:w-[300px] lg:flex-col bg-neutral-950 p-4 ">
      <NewChatButton />
      <ChatList />
      <UpgradePlanButton/>
    </div>
  );
};

export default SideBar;
