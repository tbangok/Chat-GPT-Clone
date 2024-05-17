"use client";

import { UpgradeModal } from "@/app/chat/[chatId]/_components/header/upgrade-modal";
import { useQuery } from "convex/react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Sparkle, Sparkles } from "lucide-react";
import { api } from "@/convex/_generated/api";

export const UpgradePlanButton = () => {
  const [openUpgradeModal, setOpenUpgradeModal] = useState(false);
  const currentUser = useQuery(api.users.currentUser, {});

  const handleClick = () => {
    setOpenUpgradeModal(true);
  };

  const isSubscribed = currentUser && (currentUser?.endsOn ?? 0) > Date.now();

  return (
    <>
      {!isSubscribed && (
        <>
          <UpgradeModal open={openUpgradeModal} setOpen={setOpenUpgradeModal} />

          <Button
            className="p-2 bg-transparent gap-x-2 justify-start h-fit hover:bg-neutral-800"
            onClick={handleClick}
          >
            <Sparkles className="rounded-full bg-transparent border-[1px] border-neutral-600 p-1 fill-white" />
            <div className="text-start">
              <h3>Upgrade plan</h3>
              <h5 className="font-normal text-xs text-zinc-400">Get GPT-4</h5>
            </div>
          </Button>
        </>
      )}
    </>
  );
};
