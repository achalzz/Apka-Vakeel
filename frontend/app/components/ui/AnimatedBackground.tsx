"use client";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Deep radial base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(34, 211, 238, 0.06), transparent 70%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(99, 102, 241, 0.05), transparent 60%)",
        }}
      />

      {/* Floating orb 1 */}
      <div
        className="absolute animate-float-slow"
        style={{
          top: "15%",
          left: "10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Floating orb 2 */}
      <div
        className="absolute animate-float-slow"
        style={{
          bottom: "10%",
          right: "5%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
          animationDelay: "-4s",
        }}
      />

      {/* Floating orb 3 */}
      <div
        className="absolute animate-float"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, transparent 70%)",
          filter: "blur(80px)",
          animationDelay: "-2s",
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
