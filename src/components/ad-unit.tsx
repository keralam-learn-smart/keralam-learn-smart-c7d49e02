import { useEffect, useRef } from "react";

// Google AdSense publisher client (loader script is included in __root.tsx head).
const AD_CLIENT = "ca-pub-7684149874357678";

type AdUnitProps = {
  /**
   * AdSense ad unit slot ID (numeric string) from your AdSense dashboard.
   * If omitted, the unit still renders as a responsive placeholder that
   * Google Auto Ads / Anchor ads can fill; replace with a real slot ID
   * for a dedicated display unit.
   */
  slot?: string;
  /** Ad format. `auto` = responsive display; `fluid` = in-article/in-feed. */
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  /** Full width responsive behavior. Defaults to true. */
  fullWidthResponsive?: boolean;
  /** Extra layout key for in-feed/in-article units. */
  layoutKey?: string;
  /** Extra wrapper class name for spacing/alignment. */
  className?: string;
  /** Accessible label announcing this block as an advertisement. */
  label?: string;
};

/**
 * Responsive Google AdSense display ad unit.
 *
 * The AdSense loader script is added once in `src/routes/__root.tsx`; this
 * component only renders an `<ins class="adsbygoogle">` slot and asks Google
 * to fill it after mount. Safe to render multiple times per page — each
 * instance pushes exactly once and guards against duplicate initialization.
 */
export function AdUnit({
  slot,
  format = "auto",
  fullWidthResponsive = true,
  layoutKey,
  className = "",
  label = "Advertisement",
}: AdUnitProps) {
  const insRef = useRef<HTMLModElement | null>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    if (typeof window === "undefined") return;
    const el = insRef.current;
    if (!el) return;
    // Skip if this slot was already initialized by AdSense.
    if (el.getAttribute("data-adsbygoogle-status")) {
      pushed.current = true;
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      (w.adsbygoogle = w.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not ready yet (e.g. blocked); silently ignore.
    }
  }, []);

  return (
    <aside
      aria-label={label}
      className={`my-6 flex w-full justify-center overflow-hidden ${className}`}
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot ?? ""}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
        {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
      />
    </aside>
  );
}

export default AdUnit;
