export default function EarbudsIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <ellipse cx="13" cy="22" rx="5" ry="7" fill="currentColor" opacity="0.9" />
      <rect x="11" y="8" width="4" height="10" rx="2" fill="currentColor" />
      <ellipse cx="27" cy="22" rx="5" ry="7" fill="currentColor" opacity="0.9" />
      <rect x="25" y="8" width="4" height="10" rx="2" fill="currentColor" />
    </svg>
  );
}
