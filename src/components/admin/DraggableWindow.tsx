import { ReactNode, useRef, useState, useCallback, useEffect } from "react";
import { MacWindow } from "./MacOS";
import MacScrollbar from "./MacScrollbar";

interface Position {
  x: number;
  y: number;
}

interface DraggableWindowProps {
  title: string;
  children: ReactNode;
  defaultPosition: Position;
  defaultSize?: { width: number; height: number };
  isActive: boolean;
  zIndex: number;
  onFocus: () => void;
  onClose: () => void;
  id: string;
}

const DraggableWindow = ({
  title,
  children,
  defaultPosition,
  defaultSize,
  isActive,
  zIndex,
  onFocus,
  onClose,
  id,
}: DraggableWindowProps) => {
  const [position, setPosition] = useState<Position>(defaultPosition);
  const [size, setSize] = useState(defaultSize || { width: 700, height: 500 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaxPos, setPreMaxPos] = useState<Position>(defaultPosition);
  const [preMaxSize, setPreMaxSize] = useState(size);
  const dragging = useRef(false);
  const resizing = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      e.preventDefault();
      dragging.current = true;
      offset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
      onFocus();
    },
    [position, onFocus]
  );

  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      resizing.current = true;
      offset.current = { x: e.clientX, y: e.clientY };
      onFocus();
    },
    [onFocus]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging.current) {
        setPosition({
          x: Math.max(0, e.clientX - offset.current.x),
          y: Math.max(22, e.clientY - offset.current.y), // below menu bar
        });
      }
      if (resizing.current) {
        const dx = e.clientX - offset.current.x;
        const dy = e.clientY - offset.current.y;
        offset.current = { x: e.clientX, y: e.clientY };
        setSize((s) => ({
          width: Math.max(300, s.width + dx),
          height: Math.max(200, s.height + dy),
        }));
      }
    };
    const handleMouseUp = () => {
      dragging.current = false;
      resizing.current = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const toggleMaximize = () => {
    if (isMaximized) {
      setPosition(preMaxPos);
      setSize(preMaxSize);
      setIsMaximized(false);
    } else {
      setPreMaxPos(position);
      setPreMaxSize(size);
      setPosition({ x: 0, y: 22 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 22 });
      setIsMaximized(true);
    }
  };

  return (
    <div
      ref={windowRef}
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
        width: isMaximized ? "100%" : size.width,
        height: isMaximized ? `calc(100vh - 22px)` : size.height,
        zIndex,
      }}
      onMouseDown={onFocus}
    >
      <MacWindow
        title={title}
        className={`h-full flex flex-col ${!isActive ? "opacity-80" : ""}`}
        onClose={onClose}
        onTitleBarMouseDown={handleMouseDown}
        onTitleBarDoubleClick={toggleMaximize}
        isActive={isActive}
      >
        <div className="flex-1 overflow-hidden relative">
          <div
            ref={scrollRef}
            className="absolute inset-0 overflow-auto hide-native-scrollbar"
            style={{ paddingRight: 16 }}
          >
            {children}
          </div>
          <MacScrollbar containerRef={scrollRef} />
        </div>
        {/* Resize grip */}
        {!isMaximized && (
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
            onMouseDown={handleResizeMouseDown}
            style={{
              backgroundImage:
                "linear-gradient(135deg, transparent 50%, #000 50%, #000 55%, transparent 55%, transparent 70%, #000 70%, #000 75%, transparent 75%, transparent 90%, #000 90%)",
            }}
          />
        )}
      </MacWindow>
    </div>
  );
};

export default DraggableWindow;
