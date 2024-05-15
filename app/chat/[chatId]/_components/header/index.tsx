import { UserButton } from "@clerk/clerk-react";
import { SelectModal } from "./select-modal";

export const Header = () => {
  return (
    <div className="flex h-[100px] justify-between p-5">
      <SelectModal />
      <UserButton />
    </div>
  );
};