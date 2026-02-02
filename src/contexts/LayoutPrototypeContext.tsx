import { createContext, useContext, useState, ReactNode } from "react";

type LayoutVariant = "A" | "B" | "C";

interface LayoutPrototypeContextType {
  variant: LayoutVariant;
  setVariant: (variant: LayoutVariant) => void;
  cycleVariant: () => void;
}

const LayoutPrototypeContext = createContext<LayoutPrototypeContextType | undefined>(undefined);

export const LayoutPrototypeProvider = ({ children }: { children: ReactNode }) => {
  const [variant, setVariant] = useState<LayoutVariant>("A");

  const cycleVariant = () => {
    setVariant(prev => {
      if (prev === "A") return "B";
      if (prev === "B") return "C";
      return "A";
    });
  };

  return (
    <LayoutPrototypeContext.Provider value={{ variant, setVariant, cycleVariant }}>
      {children}
    </LayoutPrototypeContext.Provider>
  );
};

export const useLayoutPrototype = () => {
  const context = useContext(LayoutPrototypeContext);
  if (!context) {
    throw new Error("useLayoutPrototype must be used within LayoutPrototypeProvider");
  }
  return context;
};
