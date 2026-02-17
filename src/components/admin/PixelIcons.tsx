/**
 * 1-bit pixel art icons for the retro Mac CMS.
 * Replaces Lucide icons to maintain System 7 aesthetic.
 */

const px = { imageRendering: "pixelated" as const };

export const PixelUpload = ({ className = "h-3 w-3" }: { className?: string }) => (
  <svg viewBox="0 0 12 12" fill="currentColor" className={className} style={px}>
    <rect x="5" y="1" width="2" height="7" />
    <rect x="3" y="3" width="2" height="2" />
    <rect x="7" y="3" width="2" height="2" />
    <rect x="1" y="9" width="10" height="2" />
    <rect x="1" y="7" width="2" height="2" />
    <rect x="9" y="7" width="2" height="2" />
  </svg>
);

export const PixelGrip = ({ className = "h-3 w-3" }: { className?: string }) => (
  <svg viewBox="0 0 12 12" fill="currentColor" className={className} style={px}>
    <rect x="3" y="1" width="2" height="2" />
    <rect x="7" y="1" width="2" height="2" />
    <rect x="3" y="5" width="2" height="2" />
    <rect x="7" y="5" width="2" height="2" />
    <rect x="3" y="9" width="2" height="2" />
    <rect x="7" y="9" width="2" height="2" />
  </svg>
);

export const PixelChevronUp = ({ className = "h-3 w-3" }: { className?: string }) => (
  <svg viewBox="0 0 12 12" fill="currentColor" className={className} style={px}>
    <rect x="5" y="2" width="2" height="2" />
    <rect x="3" y="4" width="2" height="2" />
    <rect x="7" y="4" width="2" height="2" />
    <rect x="1" y="6" width="2" height="2" />
    <rect x="9" y="6" width="2" height="2" />
  </svg>
);

export const PixelChevronDown = ({ className = "h-3 w-3" }: { className?: string }) => (
  <svg viewBox="0 0 12 12" fill="currentColor" className={className} style={px}>
    <rect x="1" y="3" width="2" height="2" />
    <rect x="9" y="3" width="2" height="2" />
    <rect x="3" y="5" width="2" height="2" />
    <rect x="7" y="5" width="2" height="2" />
    <rect x="5" y="7" width="2" height="2" />
  </svg>
);

export const PixelEye = ({ className = "h-3 w-3" }: { className?: string }) => (
  <svg viewBox="0 0 12 12" fill="currentColor" className={className} style={px}>
    <rect x="3" y="2" width="6" height="1" />
    <rect x="1" y="3" width="2" height="1" />
    <rect x="9" y="3" width="2" height="1" />
    <rect x="0" y="4" width="1" height="3" />
    <rect x="11" y="4" width="1" height="3" />
    <rect x="1" y="7" width="2" height="1" />
    <rect x="9" y="7" width="2" height="1" />
    <rect x="3" y="8" width="6" height="1" />
    {/* pupil */}
    <rect x="5" y="4" width="2" height="3" />
  </svg>
);

export const PixelEyeOff = ({ className = "h-3 w-3" }: { className?: string }) => (
  <svg viewBox="0 0 12 12" fill="currentColor" className={className} style={px}>
    <rect x="3" y="2" width="6" height="1" />
    <rect x="1" y="3" width="2" height="1" />
    <rect x="9" y="3" width="2" height="1" />
    <rect x="0" y="4" width="1" height="3" />
    <rect x="11" y="4" width="1" height="3" />
    <rect x="1" y="7" width="2" height="1" />
    <rect x="9" y="7" width="2" height="1" />
    <rect x="3" y="8" width="6" height="1" />
    <rect x="5" y="4" width="2" height="3" />
    {/* slash */}
    <rect x="9" y="1" width="2" height="2" />
    <rect x="7" y="3" width="2" height="2" />
    <rect x="5" y="5" width="2" height="2" />
    <rect x="3" y="7" width="2" height="2" />
    <rect x="1" y="9" width="2" height="2" />
  </svg>
);

export const PixelSpinner = ({ className = "h-3 w-3" }: { className?: string }) => (
  <svg viewBox="0 0 12 12" fill="currentColor" className={className + " animate-spin"} style={px}>
    <rect x="5" y="0" width="2" height="3" />
    <rect x="9" y="2" width="2" height="2" opacity="0.7" />
    <rect x="9" y="5" width="3" height="2" opacity="0.5" />
    <rect x="9" y="8" width="2" height="2" opacity="0.3" />
    <rect x="5" y="9" width="2" height="3" opacity="0.2" />
    <rect x="1" y="8" width="2" height="2" opacity="0.3" />
    <rect x="0" y="5" width="3" height="2" opacity="0.5" />
    <rect x="1" y="2" width="2" height="2" opacity="0.7" />
  </svg>
);
