import { useSubscribe } from "@/contexts/SubscribeContext";

interface SubscribeButtonProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const SubscribeButton = ({ className = "", children = "Subscribe", style }: SubscribeButtonProps) => {
  const { openSubscribe } = useSubscribe();

  return (
    <div onClick={openSubscribe} className={`cursor-pointer ${className}`} style={style}>
      {children}
    </div>
  );
};

export default SubscribeButton;
