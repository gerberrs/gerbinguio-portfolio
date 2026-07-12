/**
 * Fixed, non-interactive backdrop for the whole app.
 * Deep charcoal base + low-opacity grain + slowly drifting warm amber orbs.
 * Pure CSS animations (GPU transforms only) so it costs almost nothing.
 */
const AmbientBackground = () => {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{
        /* static warm tints are part of the base paint — they carry the
           amber mood on phones where the animated orbs are disabled */
        background:
          "radial-gradient(60% 50% at 0% 0%, rgb(var(--accent) / 0.10) 0%, rgb(var(--accent) / 0) 100%), radial-gradient(55% 45% at 100% 100%, rgb(var(--accent-dark) / 0.10) 0%, rgb(var(--accent-dark) / 0) 100%), radial-gradient(120% 120% at 50% 0%, rgb(var(--surface-2)) 0%, rgb(var(--surface-1)) 45%, rgb(var(--bg)) 100%)",
      }}
    >
      {/* warm amber — top left */}
      <div
        className="ambient-orb"
        style={{
          top: "-12%",
          left: "-8%",
          width: "46vw",
          height: "46vw",
          background:
            "radial-gradient(circle, rgb(var(--accent) / 0.30) 0%, rgb(var(--accent) / 0) 68%)",
          animation: "orbDrift1 16s ease-in-out infinite",
        }}
      />
      {/* coffee — bottom right */}
      <div
        className="ambient-orb"
        style={{
          bottom: "-16%",
          right: "-10%",
          width: "52vw",
          height: "52vw",
          background:
            "radial-gradient(circle, rgb(var(--accent-dark) / 0.28) 0%, rgb(var(--accent-dark) / 0) 66%)",
          animation: "orbDrift2 20s ease-in-out infinite",
        }}
      />
      {/* warm gold — center-right accent */}
      <div
        className="ambient-orb"
        style={{
          top: "38%",
          right: "18%",
          width: "30vw",
          height: "30vw",
          background:
            "radial-gradient(circle, rgb(var(--accent-deep) / 0.18) 0%, rgb(var(--accent-deep) / 0) 70%)",
          animation: "orbDrift3 13s ease-in-out infinite",
        }}
      />
      <div className="noise-overlay" />
    </div>
  );
};

export default AmbientBackground;
