"use client";

import { type ReactNode, createContext, useContext } from "react";

interface SubscribeOptions {
  guestName?: string;
  guestSlug?: string;
  subscribeHeadline?: string;
}

interface SubscribeContextType {
  openSubscribe: (
    optionsOrEvent?: SubscribeOptions | React.SyntheticEvent
  ) => void;
}

const SubscribeContext = createContext<SubscribeContextType>({
  openSubscribe: () => {
    console.warn("SubscribeProvider not mounted yet");
  },
});

export const useSubscribe = () => {
  return useContext(SubscribeContext);
};

interface SubscribeProviderProps {
  children: ReactNode;
}

export const SubscribeProvider = ({ children }: SubscribeProviderProps) => {
  const openSubscribe = () => {
    window.open(
      "https://www.youtube.com/@FutureofMarketingwithAI",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <SubscribeContext.Provider value={{ openSubscribe }}>
      {children}
    </SubscribeContext.Provider>
  );
};
