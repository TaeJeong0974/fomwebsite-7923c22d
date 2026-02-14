import { createContext, useContext, useState, ReactNode } from "react";
import SubscribeDrawer from "@/components/SubscribeDrawer";

interface SubscribeOptions {
  guestName?: string;
  headline?: string;
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
  const [headline, setHeadline] = useState<string | undefined>();

  const openSubscribe = (optionsOrEvent?: SubscribeOptions | React.SyntheticEvent) => {
    if (optionsOrEvent && typeof optionsOrEvent === 'object' && 'guestName' in optionsOrEvent) {
      setGuestName(optionsOrEvent.guestName);
      setHeadline(optionsOrEvent.headline);
    } else {
      setGuestName(undefined);
      setHeadline(undefined);
    }
    setIsOpen(true);
  };

  return (
    <SubscribeContext.Provider value={{ openSubscribe }}>
      {children}
      <SubscribeDrawer open={isOpen} onOpenChange={setIsOpen} guestName={guestName} headline={headline} />
    </SubscribeContext.Provider>
  );
};
