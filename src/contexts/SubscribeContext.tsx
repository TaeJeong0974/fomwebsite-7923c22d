import { createContext, useContext, useState, ReactNode } from "react";
import SubscribeDrawer from "@/components/SubscribeDrawer";

interface SubscribeOptions {
  guestName?: string;
  guestSlug?: string;
  subscribeHeadline?: string;
}

interface SubscribeContextType {
  openSubscribe: (optionsOrEvent?: SubscribeOptions | React.SyntheticEvent) => void;
}

// Provide a default no-op to prevent errors during HMR/fast refresh
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
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState<string | undefined>();
  const [guestSlug, setGuestSlug] = useState<string | undefined>();
  const [subscribeHeadline, setSubscribeHeadline] = useState<string | undefined>();

  // TEMPORARY: Redirect Subscribe to Apple Podcasts (revert when promotion ends)
  const openSubscribe = (_optionsOrEvent?: SubscribeOptions | React.SyntheticEvent) => {
    window.open("https://podcasts.apple.com/us/podcast/future-of-marketing/id1876216633", "_blank", "noopener,noreferrer");
  };

  return (
    <SubscribeContext.Provider value={{ openSubscribe }}>
      {children}
      <SubscribeDrawer open={isOpen} onOpenChange={setIsOpen} guestName={guestName} guestSlug={guestSlug} subscribeHeadline={subscribeHeadline} />
    </SubscribeContext.Provider>
  );
};
