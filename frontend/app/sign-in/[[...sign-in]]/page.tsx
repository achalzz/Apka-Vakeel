import { SignIn } from "@clerk/nextjs";
import AnimatedBackground from "../../components/ui/AnimatedBackground";

export default function SignInPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <AnimatedBackground />

      {/* Branding */}
      <div className="relative z-10 text-center mb-8">
        <div className="w-14 h-14 rounded-2xl overflow-hidden mx-auto mb-4 shadow-[0_0_24px_rgba(34,211,238,0.25)]">
          <img src="/logo.png" alt="Apka Vakeel" width={56} height={56} className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
          Welcome Back
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Sign in to Apka Vakeel
        </p>
      </div>

      {/* Clerk Component */}
      <div className="relative z-10 glass rounded-[var(--radius-xl)] p-1 glow-cyan">
        <SignIn />
      </div>
    </div>
  );
}
