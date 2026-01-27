import { createContext, useContext, useState, ReactNode } from "react";
import SubscribeModal from "@/components/SubscribeModal";

interface SubscribeContextType {
  openSubscribe: () => void;
}

const SubscribeContext = createContext<SubscribeContextType | undefined>(undefined);

export const useSubscribe = () => {
  const context = useContext(SubscribeContext);
  if (!context) {
    throw new Error("useSubscribe must be used within a SubscribeProvider");
  }
  return context;
};

interface SubscribeProviderProps {
  children: ReactNode;
}

export const SubscribeProvider = ({ children }: SubscribeProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSubscribe = () => setIsOpen(true);

  return (
    <SubscribeContext.Provider value={{ openSubscribe }}>
      {children}
      <SubscribeModal open={isOpen} onOpenChange={setIsOpen} />
    </SubscribeContext.Provider>
  );
};
