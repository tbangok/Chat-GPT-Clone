import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { GPTModel } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "convex/react";
import {
  Bolt,
  ChevronDown,
  Divide,
  Sparkle,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { UpgradeModal } from "./upgrade-modal";

export const SelectModal = () => {
  const currentUser = useQuery(api.users.currentUser, {});
  const { mutate: selectGPT, pending: selectGPTPending } = useApiMutation(
    api.users.selectGPT
  );

  const [openSelect, setOpenSelect] = useState(false);
  const [openUpgradeModal, setOpenUpgradeModal] = useState(false);

  const isSubscribed = currentUser && (currentUser?.endsOn ?? 0) > Date.now();

  if (currentUser === undefined) {
    return <div>Loading...</div>;
  }

  if (currentUser === null) {
    return <div>User Not Found</div>;
  }

  const GPTVersionText = currentUser.model === GPTModel.GPT3 ? "3.5" : "4";

  const handleClick = (model: GPTModel) => {
    //if select gpt-3 -> go
    if (model === GPTModel.GPT3) {
      selectGPT({ model });
      setOpenSelect(!openSelect);
      return;
    }

    //if select gpt-4
    if (isSubscribed) {
      selectGPT({ model });
    } else {
      setOpenUpgradeModal(true);
    }
    setOpenSelect(!openSelect);
  };

  const toggleOpen = () => {
    setOpenSelect(!openSelect);
  };

  return (
    <>
      <UpgradeModal open={openUpgradeModal} setOpen={setOpenUpgradeModal} />
      <Popover open={openSelect}>
        <PopoverTrigger
          onClick={toggleOpen}
          className="flex space-x-2 font-semibold items-center"
        >
          <p>ChatGPT</p>
          <p className="text-white/50">{GPTVersionText}</p>
          <ChevronDown className="text-white/50 w-5 h-5" />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col border-0 bg-neutral-700 text-white p-3 space-y-4  w-[360px]">
          <div
            onClick={() => {
              handleClick(GPTModel.GPT3);
            }}
            className="flex items-center text-start rounded-md justify-start space-x-2 cursor-pointer p-2 w-full h-full hover:bg-neutral-600 "
          >
            <Bolt className="w-6 h-6 mr-2" />
            <div className="w-full">
              <p className="font-normal">GPT 3.5</p>
              <p className="text-white/70 ">Greate for everyday tasks</p>
            </div>
            <Checkbox
              id="terms1"
              checked={currentUser.model === GPTModel.GPT3}
            />
          </div>
          <div
            onClick={() => {
              handleClick(GPTModel.GPT4);
            }}
            className="flex items-center text-start rounded-md justify-start space-x-2 cursor-pointer p-2 w-full h-full hover:bg-neutral-600 "
          >
            <Sparkles className="w-5 h-5 mr-2 " />
            <div className="w-full">
              <p className="font-normal">GPT-4</p>
              <p className="text-white/70 ">Our smartest and best model</p>
              {!isSubscribed && (
                <div className="w-full p-2 rounded-lg text-white text-xs text-center font-normal cursor-pointer bg-purple-500 active:bg-purple-700 mt-2">
                  Upgrade to plus
                </div>
              )}
            </div>
            <Checkbox
              id="terms1"
              checked={currentUser.model === GPTModel.GPT4}
            />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
