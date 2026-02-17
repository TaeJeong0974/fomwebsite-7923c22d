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

  const openSubscribe = (optionsOrEvent?: SubscribeOptions | React.SyntheticEvent) => {
    if (optionsOrEvent && typeof optionsOrEvent === 'object' && 'guestName' in optionsOrEvent) {
      setGuestName(optionsOrEvent.guestName);
      setGuestSlug((optionsOrEvent as SubscribeOptions).guestSlug);
      setSubscribeHeadline((optionsOrEvent as SubscribeOptions).subscribeHeadline);
    } else {
      setGuestName(undefined);
      setGuestSlug(undefined);
      setSubscribeHeadline(undefined);
    }
    setIsOpen(true);
  };

  return (
    <SubscribeContext.Provider value={{ openSubscribe }}>
      {children}
      <SubscribeDrawer open={isOpen} onOpenChange={setIsOpen} guestName={guestName} guestSlug={guestSlug} subscribeHeadline={subscribeHeadline} />
    </SubscribeContext.Provider>
  );
};
