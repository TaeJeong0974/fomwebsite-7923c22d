import { ReactNode } from "react";

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

/* ── Select ── */
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
}) => (
  <select
    value={value}
    onChange={onChange}
    className={`
      w-full px-2 py-1 text-xs
      border border-black bg-white text-black
      outline-none focus:ring-0
      appearance-none cursor-default
      bg-[length:8px] bg-[right_6px_center] bg-no-repeat
      [background-image:url("data:image/svg+xml,%3Csvg%20width='8'%20height='5'%20viewBox='0%200%208%205'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M1%201L4%204L7%201'%20stroke='black'%20stroke-width='1.5'/%3E%3C/svg%3E")]
      ${className}
    `}
    style={{
      fontFamily: "'Geneva', 'Helvetica Neue', monospace",
      boxShadow: "inset 1px 1px 0px #999, inset -1px -1px 0px #fff",
    }}
  >
    {children}
  </select>
);

/* ── Table wrapper ── */
export const MacTable = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div
    className={`border border-black overflow-x-auto ${className}`}
    style={{ boxShadow: "inset 1px 1px 0px #999" }}
  >
    {children}
  </div>
);

/* ── Shared font style constant ── */
export const MAC_FONT = { fontFamily: "'Geneva', 'Helvetica Neue', monospace" } as const;
export const MAC_TITLE_FONT = { fontFamily: "'Chicago', 'Geneva', 'Helvetica Neue', monospace" } as const;
