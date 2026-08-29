import type { TransportMode } from "./trip-data";

export function ModeIcon({ mode }: { mode: TransportMode }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {mode === "bus" && <><rect {...common} x="4" y="3" width="16" height="15" rx="3" /><path {...common} d="M7 18v2m10-2v2M7 7h10M7 14h.01M17 14h.01" /></>}
      {mode === "train" && <><rect {...common} x="5" y="3" width="14" height="15" rx="3" /><path {...common} d="M8 7h8M8 13h.01M16 13h.01M8 21l2-3m6 3-2-3" /></>}
      {mode === "ferry" && <><path {...common} d="M3 15l2 3h14l2-3-4-2V7H7v6l-4 2Z" /><path {...common} d="M9 10h6M4 21c2-1 3-1 5 0s3 1 5 0 3-1 5 0" /></>}
      {mode === "walk" && <><circle {...common} cx="13" cy="4" r="2" /><path {...common} d="m10 21 2-7-3-3 2-4 4 3 3 1m-6 3 4 3 1 4" /></>}
      {mode === "bicycle" && <><circle {...common} cx="6" cy="17" r="4" /><circle {...common} cx="18" cy="17" r="4" /><path {...common} d="m6 17 4-8 4 8m-6-4h8l-3-6h3" /></>}
      {mode === "shopping" && <><path {...common} d="M5 8h14l-1 13H6L5 8Z" /><path {...common} d="M9 10V6a3 3 0 0 1 6 0v4" /></>}
      {mode === "flight" && <path {...common} d="m2 16 20-8-8 12-2-7-7-2-3 5Z" />}
    </svg>
  );
}
