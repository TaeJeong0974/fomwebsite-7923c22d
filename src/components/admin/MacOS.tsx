import { ReactNode, useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Classic Mac OS System 6/7 UI primitives built with Tailwind.
 * No external dependency — just vibes.
 */

/* ── Title Bar Stripes (horizontal lines pattern) ── */
const TitleBarStripes = () => (
  <div
    className="flex-1 h-full mx-1.5"
    style={{
      backgroundImage:
        "repeating-linear-gradient(to bottom, #000 0px, #000 1px, transparent 1px, transparent 3px)",
      backgroundSize: "100% 3px",
    }}
  />
);

/* ── Window ── */
export const MacWindow = ({
  title,
  children,
  className = "",
  onClose,
  onTitleBarMouseDown,
  onTitleBarDoubleClick,
  isActive = true,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  onClose?: () => void;
  onTitleBarMouseDown?: (e: React.MouseEvent) => void;
  onTitleBarDoubleClick?: () => void;
  isActive?: boolean;
}) => (
  <div
    className={`border-2 border-black bg-white ${className}`}
    style={{ boxShadow: isActive ? "2px 2px 0px #000" : "1px 1px 0px #888" }}
  >
    {/* Title Bar */}
    <div
      className="flex items-center h-[22px] px-1.5 border-b-2 border-black bg-white select-none cursor-grab active:cursor-grabbing"
      onMouseDown={onTitleBarMouseDown}
      onDoubleClick={onTitleBarDoubleClick}
    >
      {onClose && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-[13px] h-[13px] border border-black bg-white hover:bg-black hover:text-white flex items-center justify-center shrink-0"
          title="Close"
        />
      )}
      {isActive ? <TitleBarStripes /> : <div className="flex-1" />}
      <span className="px-2 text-xs font-bold tracking-wide whitespace-nowrap" style={{ fontFamily: "'Chicago', 'Geneva', 'Helvetica Neue', monospace" }}>
        {title}
      </span>
      {isActive ? <TitleBarStripes /> : <div className="flex-1" />}
    </div>
    {/* Content */}
    <div className="flex-1 overflow-hidden flex flex-col min-h-0">{children}</div>
  </div>
);

/* ── Button ── */
export const MacButton = ({
  children,
  onClick,
  disabled,
  primary,
  className = "",
  type = "button",
  title,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  primary?: boolean;
  className?: string;
  type?: "button" | "submit";
  title?: string;
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`
      inline-flex items-center justify-center gap-1.5
      px-4 py-1 text-xs font-bold tracking-wide
      border border-black rounded-[3px]
      transition-none select-none
      disabled:opacity-40 disabled:cursor-not-allowed
      ${primary
        ? "bg-black text-white active:bg-white active:text-black"
        : "bg-white text-black active:bg-black active:text-white"
      }
      ${className}
    `}
    style={{ fontFamily: "'Chicago', 'Geneva', 'Helvetica Neue', monospace" }}
  >
    {children}
  </button>
);

/* ── Text Input ── */
export const MacInput = ({
  value,
  onChange,
  placeholder,
  onKeyDown,
  className = "",
  type = "text",
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  className?: string;
  type?: string;
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    onKeyDown={onKeyDown}
    className={`
      w-full px-2 py-1 text-xs
      border border-black bg-white text-black
      outline-none focus:ring-0
      placeholder:text-gray-400
      ${className}
    `}
    style={{
      fontFamily: "'Geneva', 'Helvetica Neue', monospace",
      boxShadow: "inset 1px 1px 0px #999, inset -1px -1px 0px #fff",
    }}
  />
);

/* ── Textarea ── */
export const MacTextarea = ({
  value,
  onChange,
  placeholder,
  className = "",
  minHeight = "80px",
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`
      w-full px-2 py-1 text-xs
      border border-black bg-white text-black
      outline-none focus:ring-0 resize-y
      placeholder:text-gray-400
      ${className}
    `}
    style={{
      fontFamily: "'Geneva', 'Helvetica Neue', monospace",
      boxShadow: "inset 1px 1px 0px #999, inset -1px -1px 0px #fff",
      minHeight,
    }}
  />
);

/* ── Label ── */
export const MacLabel = ({ children }: { children: ReactNode }) => (
  <label
    className="text-xs font-bold text-black"
    style={{ fontFamily: "'Chicago', 'Geneva', 'Helvetica Neue', monospace" }}
  >
    {children}
  </label>
);

/* ── Desktop (background with dotted pattern) ── */
export const MacDesktop = ({ children, className = "", style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) => (
  <div
    className={`min-h-screen ${className}`}
    style={{
      backgroundColor: "#c0c0c0",
      backgroundImage: "radial-gradient(circle, #808080 1px, transparent 1px)",
      backgroundSize: "4px 4px",
      fontFamily: "'Geneva', 'Helvetica Neue', monospace",
      ...style,
    }}
  >
    {children}
  </div>
);

/* ── Menu Bar ── */
export const MacMenuBar = ({ children }: { children: ReactNode }) => (
  <div
    className="flex items-center h-[22px] px-2 gap-4 border-b-2 border-black bg-white text-xs font-bold select-none"
    style={{ fontFamily: "'Chicago', 'Geneva', 'Helvetica Neue', monospace" }}
  >
    {children}
  </div>
);

/* ── Status Chip (retro style) ── */
const STATUS_STYLES: Record<string, string> = {
  published: "bg-black text-white",
  upcoming: "border-black bg-white text-black",
  draft: "border-black bg-white text-gray-500",
  deleted: "border-black bg-white line-through text-gray-400",
};

export const MacStatusChip = ({ status }: { status: string }) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-black ${STATUS_STYLES[status] || "border-black bg-white text-black"}`}
    style={{ fontFamily: "'Chicago', 'Geneva', 'Helvetica Neue', monospace" }}
  >
    {status}
  </span>
);

/* ── Field Hint ── */
export const MacFieldHint = ({ children }: { children: ReactNode }) => (
  <p
    className="mt-0.5 text-[10px] text-gray-500 italic"
    style={{ fontFamily: "'Geneva', 'Helvetica Neue', monospace" }}
  >
    {children}
  </p>
);

/* ── Separator ── */
export const MacSeparator = () => (
  <div className="border-t border-black my-2" />
);

/* ── Select (retro Mac dropdown) ── */
export const MacSelect = ({
  value,
  onChange,
  children,
  className = "",
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  // Extract options from children (recursively handles fragments, arrays, conditionals)
  const options: { value: string; label: string }[] = [];
  const extractOptions = (nodes: ReactNode) => {
    if (!nodes) return;
    if (Array.isArray(nodes)) {
      nodes.forEach(extractOptions);
      return;
    }
    if (typeof nodes === "object" && "props" in nodes) {
      if (nodes.type === "option") {
        options.push({ value: nodes.props.value ?? "", label: String(nodes.props.children ?? "") });
      } else if (nodes.props?.children) {
        extractOptions(nodes.props.children);
      }
    }
  };
  extractOptions(children);

  const selectedLabel = options.find((o) => o.value === value)?.label || options[0]?.label || "";

  // Position dropdown relative to viewport using portal
  useLayoutEffect(() => {
    if (!open || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setDropdownStyle({
      position: "fixed",
      top: rect.bottom,
      left: rect.left,
      width: rect.width,
    });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) && buttonRef.current && !buttonRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const dropdownMenu = open ? (
    <div
      ref={ref}
      className="border-2 border-black bg-white max-h-[200px] overflow-y-auto"
      style={{ ...dropdownStyle, boxShadow: "2px 2px 0px #000", zIndex: 99999 }}
    >
      {options.map((opt, i) => {
        const isSelected = opt.value === value;
        const ditherBg = `repeating-conic-gradient(#000 0% 25%, transparent 0% 50%) 0 0 / 4px 4px`;
        return (
          <button
            key={`${opt.value}-${i}`}
            type="button"
            className={`w-full text-left px-2 py-1 text-xs cursor-default mac-select-option ${
              isSelected ? "text-white" : ""
            }`}
            style={{
              fontFamily: "'Geneva', 'Helvetica Neue', monospace",
              ...(isSelected ? { background: ditherBg } : {}),
            }}
            onClick={() => {
              onChange({ target: { value: opt.value } } as React.ChangeEvent<HTMLSelectElement>);
              setOpen(false);
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  ) : null;

  return (
    <div className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-2 py-1 text-xs border border-black bg-white text-black text-left cursor-default"
        style={{
          fontFamily: "'Geneva', 'Helvetica Neue', monospace",
          boxShadow: "inset 1px 1px 0px #999, inset -1px -1px 0px #fff",
        }}
      >
        <span className="truncate">{selectedLabel}</span>
        <span className="ml-1 shrink-0 text-[10px]">▼</span>
      </button>
      {createPortal(dropdownMenu, document.body)}
    </div>
  );
};

/* ── Table wrapper ── */
export const MacTable = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div
    className={`border border-black overflow-x-auto ${className}`}
    style={{ boxShadow: "inset 1px 1px 0px #999" }}
  >
    {children}
  </div>
);

/* ── Expandable Image Preview ── */
export const MacImagePreview = ({
  src,
  alt = "Preview",
  className = "h-16 object-cover border border-black",
}: {
  src: string;
  alt?: string;
  className?: string;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`${className} cursor-pointer hover:opacity-80 transition-opacity`}
        onClick={() => setExpanded(true)}
        title="Click to expand"
      />
      {expanded && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 cursor-pointer"
          onClick={() => setExpanded(false)}
        >
          <div
            className="relative border-2 border-black bg-white p-1 max-w-[90vw] max-h-[90vh]"
            style={{ boxShadow: "4px 4px 0px #000" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title bar */}
            <div
              className="flex items-center justify-between h-[20px] px-1.5 border-b border-black bg-white mb-1"
              style={{ fontFamily: "'Chicago', 'Geneva', 'Helvetica Neue', monospace" }}
            >
              <button
                onClick={() => setExpanded(false)}
                className="w-[11px] h-[11px] border border-black bg-white hover:bg-black flex items-center justify-center shrink-0"
              />
              <span className="text-[10px] font-bold truncate px-2">{alt}</span>
              <div className="w-[11px]" />
            </div>
            <img
              src={src}
              alt={alt}
              className="max-w-[85vw] max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

/* ── Shared font style constant ── */
export const MAC_FONT = { fontFamily: "'Geneva', 'Helvetica Neue', monospace" } as const;
export const MAC_TITLE_FONT = { fontFamily: "'Chicago', 'Geneva', 'Helvetica Neue', monospace" } as const;
