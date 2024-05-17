import { UserButton } from "@clerk/clerk-react";
import { SelectModal } from "./select-modal";
import { MobileSidebar } from "@/components/sidebar/mobile-sideber";

export const Header = () => {
  return (
    <div className="flex h-[100px] justify-between items-center p-5 bg-neutral-800">
      <MobileSidebar/>
      <SelectModal />
      <UserButton />
    </div>
  );
};
