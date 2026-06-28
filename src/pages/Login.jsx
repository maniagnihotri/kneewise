import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { signIn, gisReady, loading } = useAuth();
  return (
    <div className="min-h-screen bg-bone text-charcoal flex flex-col">
      <div className="flex-1 grid place-items-center px-6">
        <div className="bento-card max-w-md w-full text-center">
          <img
            src="./logo.png"
            alt="kneewise"
            className="w-20 h-20 mx-auto rounded-2xl object-cover"
          />
          <div className="editorial-label mt-6">A Daily Ritual</div>
          <h1 className="font-serif text-5xl font-light mt-2 tracking-tight">
            kneewise
          </h1>
          <p className="text-ink mt-4 leading-relaxed">
            Track your 12-week ACL + meniscus reconditioning protocol.
            Sign in with Google to sync your daily check-offs across devices.
          </p>
          <button
            onClick={signIn}
            disabled={!gisReady || loading}
            data-testid="signin-btn"
            className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-[#D6D3C4] text-charcoal font-medium hover:bg-surfaceAlt transition-all disabled:opacity-50"
          >
            <GoogleMark />
            {loading ? "Signing in…" : "Sign in with Google"}
          </button>
          <p className="text-xs text-mute mt-6 leading-relaxed">
            We store your data in a hidden Drive folder only this app can see.
            Sign out any time to revoke access.
          </p>
        </div>
      </div>
      <footer className="px-6 pb-8">
        <div className="editorial-label text-charcoal/40 text-center">
          built with intention · stay patient · trust the process
        </div>
      </footer>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 18 18" className="w-5 h-5">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.83.86-3.04.86-2.34 0-4.32-1.58-5.03-3.71H.95v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.71A5.41 5.41 0 0 1 3.68 9c0-.6.1-1.17.29-1.71V4.96H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.04l3.02-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .95 4.96l3.02 2.33C4.68 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}
