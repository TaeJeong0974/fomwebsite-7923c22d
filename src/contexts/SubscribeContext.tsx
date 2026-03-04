import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import SubscribeDrawer from "@/components/SubscribeDrawer";

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
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<SubscribeOptions>({});

  const openSubscribe = useCallback((optionsOrEvent?: SubscribeOptions | React.SyntheticEvent) => {
    if (optionsOrEvent && typeof optionsOrEvent === "object" && !("nativeEvent" in optionsOrEvent)) {
      setOptions(optionsOrEvent as SubscribeOptions);
    } else {
      setOptions({});
    }
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setOptions({});
  }, []);

  return (
    <SubscribeContext.Provider value={{ openSubscribe }}>
      {children}
      <SubscribeDrawer
        isOpen={isOpen}
        onClose={handleClose}
        guestName={options.guestName}
        guestSlug={options.guestSlug}
        headline={options.subscribeHeadline}
      />
    </SubscribeContext.Provider>
  );
};
