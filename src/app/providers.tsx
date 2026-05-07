"use client";

import { ReactNode } from "react";
import { EpisodeDataProvider } from "@/contexts/EpisodeDataContext";
import { SubscribeProvider } from "@/contexts/SubscribeContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <EpisodeDataProvider>
      <SubscribeProvider>{children}</SubscribeProvider>
    </EpisodeDataProvider>
  );
}
