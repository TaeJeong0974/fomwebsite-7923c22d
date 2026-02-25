import { createContext, useContext, ReactNode } from "react";

interface SubscribeOptions {
  guestName?: string;
  guestSlug?: string;
  subscribeHeadline?: string;
}

interface SubscribeContextType {
  openSubscribe: (optionsOrEvent?: SubscribeOptions | React.SyntheticEvent) => void;
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
  // TEMPORARY: Redirect Subscribe to Apple Podcasts (revert when promotion ends)
  const openSubscribe = (_optionsOrEvent?: SubscribeOptions | React.SyntheticEvent) => {
    window.open("https://podcasts.apple.com/us/podcast/future-of-marketing/id1876216633", "_blank", "noopener,noreferrer");
  };

  return (
    <SubscribeContext.Provider value={{ openSubscribe }}>
      {children}
    </SubscribeContext.Provider>
  );
};
