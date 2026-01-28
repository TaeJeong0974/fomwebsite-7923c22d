import { createContext, useContext, useState, ReactNode } from "react";

interface ClickOrigin {
  x: number;
  y: number;
}

interface TransitionContextType {
  clickOrigin: ClickOrigin | null;
  setClickOrigin: (origin: ClickOrigin | null) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [clickOrigin, setClickOrigin] = useState<ClickOrigin | null>(null);

  return (
    <TransitionContext.Provider value={{ clickOrigin, setClickOrigin }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
};
