"use client";

import { EpisodeDataProvider } from "@/contexts/EpisodeDataContext";
import { SubscribeProvider } from "@/contexts/SubscribeContext";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <EpisodeDataProvider>
      <SubscribeProvider>{children}</SubscribeProvider>
    </EpisodeDataProvider>
  );
}
