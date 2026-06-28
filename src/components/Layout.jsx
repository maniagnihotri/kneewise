import { Link, useLocation } from "react-router-dom";
import { Activity, Apple, LineChart, LayoutDashboard } from "lucide-react";

const NAV = [
  { to: "/", label: "Today", icon: LayoutDashboard, testId: "nav-today" },
  { to: "/exercises", label: "Exercises", icon: Activity, testId: "nav-exercises" },
  { to: "/diet", label: "Diet", icon: Apple, testId: "nav-diet" },
  { to: "/weight", label: "Weight", icon: LineChart, testId: "nav-weight" },
];

export default function Layout({ children }) {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-bone text-charcoal">
      <header
        className="border-b border-[#D6D3C4] bg-bone/80 backdrop-blur sticky top-0 z-30"
        data-testid="app-header"
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-5 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3" data-testid="logo-link">
            <div className="w-9 h-9 rounded-full bg-moss text-bone grid place-items-center font-serif text-xl">
              k
            </div>
            <div className="leading-tight">
              <div className="editorial-label">A daily ritual</div>
              <div className="font-serif text-2xl tracking-tight">
                kneewise
              </div>
            </div>
          </Link>
          <nav className="flex items-center gap-1 md:gap-2">
            {NAV.map((n) => {
              const Active = pathname === n.to;
              const Icon = n.icon;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  data-testid={n.testId}
                  className={`px-3 md:px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                    Active
                      ? "bg-moss text-bone"
                      : "text-charcoal/70 hover:bg-surfaceAlt"
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  <span className="hidden sm:inline">{n.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-5 md:px-8 py-8 md:py-12 pb-24">
        {children}
      </main>
      <footer className="max-w-6xl mx-auto px-5 md:px-8 pb-10">
        <div className="editorial-label text-charcoal/40">
          built with intention · stay patient · trust the process
        </div>
      </footer>
    </div>
  );
}
