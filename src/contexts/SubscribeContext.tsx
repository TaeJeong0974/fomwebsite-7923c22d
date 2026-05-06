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
    window.open("https://thefutureofmarketing.substack.com/subscribe?utm_source=menu&simple=true&next=https%3A%2F%2Fthefutureofmarketing.substack.com%2Fp%2Fthe-death-of-the-funnel-and-the-rise%3Fr%3D7vwnnd%26utm_campaign%3Dpost%26utm_medium%3Dweb%26triedRedirect%3Dtrue", "_blank", "noopener,noreferrer");
  };

  return (
    <SubscribeContext.Provider value={{ openSubscribe }}>
      {children}
    </SubscribeContext.Provider>
  );
};
