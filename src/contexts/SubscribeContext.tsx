import { createContext, useContext, useState, ReactNode } from "react";
import SubscribeDrawer from "@/components/SubscribeDrawer";

interface SubscribeContextType {
  openSubscribe: (guestNameOrEvent?: string | React.SyntheticEvent) => void;
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

  const openSubscribe = (nameOrEvent?: string | React.SyntheticEvent) => {
    const name = typeof nameOrEvent === 'string' ? nameOrEvent : undefined;
    setGuestName(name);
    setIsOpen(true);
  };

  return (
    <SubscribeContext.Provider value={{ openSubscribe }}>
      {children}
      <SubscribeDrawer open={isOpen} onOpenChange={setIsOpen} guestName={guestName} />
    </SubscribeContext.Provider>
  );
};
