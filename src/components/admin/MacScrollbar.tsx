import { useRef, useState, useCallback, useEffect } from "react";

/**
 * Custom Apple Lisa / System 7 scrollbar component.
 * Renders a pixel-perfect retro scrollbar with arrow buttons,
 * draggable thumb, and dithered track — since modern browsers
 * no longer support ::-webkit-scrollbar-button.
 */

const SCROLLBAR_WIDTH = 16;
const BUTTON_HEIGHT = 16;
const MIN_THUMB_HEIGHT = 24;

/* Dithered checkerboard pattern as inline SVG data URI */
const DITHER_PATTERN = `url("data:image/svg+xml,%3Csvg width='2' height='2' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23aaa'/%3E%3Crect x='1' y='1' width='1' height='1' fill='%23aaa'/%3E%3Crect x='1' y='0' width='1' height='1' fill='%23e8e8e8'/%3E%3Crect x='0' y='1' width='1' height='1' fill='%23e8e8e8'/%3E%3C/svg%3E")`;

/* Arrow SVGs — solid filled triangles */
const ArrowUp = ({ pressed }: { pressed: boolean }) => (
  <svg width="10" height="8" viewBox="0 0 10 8" style={{ imageRendering: "pixelated" }}>
    <path d="M5 1L9 7H1Z" fill="black" />
  </svg>
);

const ArrowDown = ({ pressed }: { pressed: boolean }) => (
  <svg width="10" height="8" viewBox="0 0 10 8" style={{ imageRendering: "pixelated" }}>
    <path d="M5 7L9 1H1Z" fill="black" />
  </svg>
);

/* 3D beveled button base */
const buttonStyle = (pressed: boolean): React.CSSProperties => ({
  width: SCROLLBAR_WIDTH,
  height: BUTTON_HEIGHT,
  background: pressed ? "#a0a0a0" : "#c0c0c0",
  border: "1px solid #000",
  boxShadow: pressed
    ? "inset -1px -1px 0px #fff, inset 1px 1px 0px #808080"
    : "inset 1px 1px 0px #fff, inset -1px -1px 0px #808080",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "default",
  flexShrink: 0,
  imageRendering: "pixelated" as const,
});

/* Thumb style */
const thumbStyle = (pressed: boolean): React.CSSProperties => ({
  position: "absolute",
  width: SCROLLBAR_WIDTH,
  background: pressed ? "#a0a0a0" : "#c0c0c0",
  border: "1px solid #000",
  boxShadow: pressed
    ? "inset -1px -1px 0px #fff, inset 1px 1px 0px #808080"
    : "inset 1px 1px 0px #fff, inset -1px -1px 0px #808080",
  cursor: "default",
  zIndex: 1,
});

interface MacScrollbarProps {
  /** The scrollable container ref */
  containerRef: React.RefObject<HTMLDivElement>;
}

const MacScrollbar = ({ containerRef }: MacScrollbarProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(MIN_THUMB_HEIGHT);
  const [visible, setVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [upPressed, setUpPressed] = useState(false);
  const [downPressed, setDownPressed] = useState(false);
  const [thumbPressed, setThumbPressed] = useState(false);
  const dragStartY = useRef(0);
  const dragStartScroll = useRef(0);
  const scrollInterval = useRef<number | null>(null);

  /* Measure and update thumb position/size */
  const update = useCallback(() => {
    const el = containerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const hasScroll = scrollHeight > clientHeight + 1;
    setVisible(hasScroll);
    if (!hasScroll) return;

    const trackHeight = track.clientHeight;
    const ratio = clientHeight / scrollHeight;
    const tHeight = Math.max(MIN_THUMB_HEIGHT, ratio * trackHeight);
    const maxTop = trackHeight - tHeight;
    const scrollRatio = scrollTop / (scrollHeight - clientHeight);
    const tTop = scrollRatio * maxTop;

    setThumbHeight(tHeight);
    setThumbTop(tTop);
  }, [containerRef]);

  /* Listen for scroll + resize */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    // Also observe content changes
    const mo = new MutationObserver(update);
    mo.observe(el, { childList: true, subtree: true });
    update();
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
      mo.disconnect();
    };
  }, [containerRef, update]);

  /* Arrow button scroll */
  const startScroll = useCallback((direction: number) => {
    const el = containerRef.current;
    if (!el) return;
    const step = () => {
      el.scrollTop += direction * 24;
    };
    step();
    scrollInterval.current = window.setInterval(step, 80);
  }, [containerRef]);

  const stopScroll = useCallback(() => {
    if (scrollInterval.current !== null) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
    setUpPressed(false);
    setDownPressed(false);
  }, []);

  /* Thumb drag */
  const onThumbMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
    setThumbPressed(true);
    dragStartY.current = e.clientY;
    dragStartScroll.current = containerRef.current?.scrollTop ?? 0;
  }, [containerRef]);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      const track = trackRef.current;
      if (!el || !track) return;

      const dy = e.clientY - dragStartY.current;
      const trackHeight = track.clientHeight;
      const maxScroll = el.scrollHeight - el.clientHeight;
      const maxThumbTop = trackHeight - thumbHeight;
      if (maxThumbTop <= 0) return;

      const scrollDelta = (dy / maxThumbTop) * maxScroll;
      el.scrollTop = dragStartScroll.current + scrollDelta;
    };
    const onUp = () => {
      setDragging(false);
      setThumbPressed(false);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging, containerRef, thumbHeight]);

  /* Track click — page scroll */
  const onTrackClick = useCallback((e: React.MouseEvent) => {
    const el = containerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const trackRect = track.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    const thumbCenter = thumbTop + thumbHeight / 2;

    if (clickY < thumbTop) {
      el.scrollTop -= el.clientHeight * 0.8;
    } else if (clickY > thumbTop + thumbHeight) {
      el.scrollTop += el.clientHeight * 0.8;
    }
  }, [containerRef, thumbTop, thumbHeight]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        width: SCROLLBAR_WIDTH,
        display: "flex",
        flexDirection: "column",
        zIndex: 2,
        userSelect: "none",
      }}
    >
      {/* Up arrow button */}
      <button
        style={buttonStyle(upPressed)}
        onMouseDown={(e) => {
          e.preventDefault();
          setUpPressed(true);
          startScroll(-1);
        }}
        onMouseUp={stopScroll}
        onMouseLeave={stopScroll}
      >
        <ArrowUp pressed={upPressed} />
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        style={{
          flex: 1,
          position: "relative",
          backgroundImage: DITHER_PATTERN,
          backgroundSize: "2px 2px",
          borderLeft: "1px solid #000",
          cursor: "default",
        }}
        onMouseDown={onTrackClick}
      >
        {/* Thumb */}
        <div
          style={{
            ...thumbStyle(thumbPressed),
            top: thumbTop,
            height: thumbHeight,
          }}
          onMouseDown={onThumbMouseDown}
        />
      </div>

      {/* Down arrow button */}
      <button
        style={buttonStyle(downPressed)}
        onMouseDown={(e) => {
          e.preventDefault();
          setDownPressed(true);
          startScroll(1);
        }}
        onMouseUp={stopScroll}
        onMouseLeave={stopScroll}
      >
        <ArrowDown pressed={downPressed} />
      </button>
    </div>
  );
};

export default MacScrollbar;
