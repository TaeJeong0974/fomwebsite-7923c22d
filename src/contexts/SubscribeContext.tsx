import { createContext, useContext, useState, ReactNode } from "react";
import SubscribeDrawer from "@/components/SubscribeDrawer";

interface SubscribeContextType {
  openSubscribe: () => void;
  isOpen: boolean;
}

// Provide a default no-op to prevent errors during HMR/fast refresh
const SubscribeContext = createContext<SubscribeContextType>({
  openSubscribe: () => {
    console.warn("SubscribeProvider not mounted yet");
  },
  isOpen: false,
});

export const useSubscribe = () => {
  return useContext(SubscribeContext);
};

interface SubscribeProviderProps {
  children: ReactNode;
}

export const SubscribeProvider = ({ children }: SubscribeProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSubscribe = () => setIsOpen(true);

  return (
    <SubscribeContext.Provider value={{ openSubscribe, isOpen }}>
      {children}
      <SubscribeDrawer open={isOpen} onOpenChange={setIsOpen} />
    </SubscribeContext.Provider>
  );
};
