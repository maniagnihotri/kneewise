import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Activity, Apple, LineChart, LayoutDashboard, LogOut, Cloud, CloudOff, RefreshCw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { onSyncStatus } from "@/lib/sync";

const NAV = [
  { to: "/", label: "Today", icon: LayoutDashboard, testId: "nav-today" },
  { to: "/exercises", label: "Exercises", icon: Activity, testId: "nav-exercises" },
  { to: "/diet", label: "Diet", icon: Apple, testId: "nav-diet" },
  { to: "/weight", label: "Weight", icon: LineChart, testId: "nav-weight" },
];

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();
  const [sync, setSync] = useState({ status: "idle", lastError: null });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => onSyncStatus(setSync), []);

  return (
    <div className="min-h-screen bg-bone text-charcoal">
      <header
        className="border-b border-[#D6D3C4] bg-bone/80 backdrop-blur sticky top-0 z-30"
        data-testid="app-header"
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-5 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3" data-testid="logo-link">
            <img
              src="./logo.png"
              alt="kneewise"
              className="w-10 h-10 rounded-full object-cover"
            />
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
          <div className="relative flex items-center gap-2">
            <SyncBadge sync={sync} />
            {user && (
              <button
                onClick={() => setMenuOpen((o) => !o)}
                data-testid="user-chip"
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white border border-[#D6D3C4] hover:bg-surfaceAlt transition-all"
              >
                <img
                  src={user.picture}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full"
                />
                <span className="text-sm font-medium hidden md:inline">
                  {user.given_name || user.name}
                </span>
              </button>
            )}
            {menuOpen && user && (
              <div
                className="absolute right-0 top-12 w-56 bg-white border border-[#D6D3C4] rounded-2xl shadow-lg p-2 z-40"
                data-testid="user-menu"
              >
                <div className="px-3 py-2 text-xs text-mute leading-tight">
                  <div className="font-medium text-charcoal">{user.name}</div>
                  <div className="truncate">{user.email}</div>
                </div>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                  data-testid="signout-btn"
                  className="mt-1 w-full text-left px-3 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-surfaceAlt"
                >
                  <LogOut className="w-4 h-4" strokeWidth={1.5} />
                  Sign out
                </button>
              </div>
            )}
          </div>
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

function SyncBadge({ sync }) {
  const map = {
    idle: { Icon: Cloud, label: "Synced", color: "text-moss" },
    pulling: { Icon: RefreshCw, label: "Loading…", color: "text-ink animate-spin" },
    pushing: { Icon: RefreshCw, label: "Saving…", color: "text-ink animate-spin" },
    dirty: { Icon: Cloud, label: "Pending…", color: "text-ink" },
    error: { Icon: CloudOff, label: "Sync error", color: "text-terracotta" },
  };
  const cfg = map[sync.status] || map.idle;
  const { Icon } = cfg;
  return (
    <span
      title={sync.lastError || cfg.label}
      data-testid="sync-badge"
      className="hidden md:inline-flex items-center gap-1.5 text-xs px-2 py-1"
    >
      <Icon className={`w-3.5 h-3.5 ${cfg.color}`} strokeWidth={1.5} />
      <span className="text-mute">{cfg.label}</span>
    </span>
  );
}
