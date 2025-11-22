"use client";
import React from "react";
import { SWRConfig } from "swr";
import fetcher from "../lib/fetcher";

const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRProvider;
