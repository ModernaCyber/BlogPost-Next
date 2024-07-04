"use client";

import axios from "lib/axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();
  console.log(JSON.stringify(session)+"-----------------------------------session--useRefreshToken------------------------------------")

  const refreshToken = async () => {
    const res = await axios.post("/auth/token", {
      refresh: session?.user.tokens.refresh,
    });
    console.log(res+"-----------------------------------res----useRefreshToken----------------------------------")

    if (session) session.user.tokens.access_token = res.data.tokens.access_token;
    else signIn();
  };
  return refreshToken;
};
