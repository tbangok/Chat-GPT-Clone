"use client";

import Loading from "@/components/auth/loading";
import { api } from "@/convex/_generated/api";
import { SignUp } from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { isAuthenticated } = useConvexAuth();
  const storeUser = useMutation(api.users.store);

  const router = useRouter();

  useEffect(() => {
    const storeUserData = async () => {
      if (isAuthenticated) {
        try {
          await storeUser();
          router.push("/");
        } catch (error) {
          console.log(error);
        }
      }
    };
    storeUserData();
  }, [isAuthenticated, storeUser, router]);

  return <Loading />;
}
