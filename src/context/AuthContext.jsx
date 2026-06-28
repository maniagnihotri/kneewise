import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  loadStoredToken,
  requestAccessToken,
  promptAccessToken,
  revokeToken,
  fetchUserInfo,
} from "@/lib/googleAuth";
import { startSync, stopSync, setSyncToken } from "@/lib/sync";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(loadStoredToken());
  const [user, setUser] = useState(null);
  const [gisReady, setGisReady] = useState(!!window.google?.accounts?.oauth2);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (gisReady) return;
    const t = setInterval(() => {
      if (window.google?.accounts?.oauth2) {
        setGisReady(true);
        clearInterval(t);
      }
    }, 200);
    return () => clearInterval(t);
  }, [gisReady]);

  useEffect(() => {
    let cancelled = false;
    async function bootstrap() {
      if (!token) {
        setUser(null);
        stopSync();
        return;
      }
      setLoading(true);
      try {
        const info = await fetchUserInfo(token.accessToken);
        if (cancelled) return;
        setUser(info);
        setSyncToken(token.accessToken);
        await startSync(token.accessToken);
      } catch {
        if (!cancelled) {
          setToken(null);
          setUser(null);
          stopSync();
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    bootstrap();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const signIn = useCallback(() => {
    if (!gisReady) return;
    setLoading(true);
    promptAccessToken((t) => {
      setToken(t);
      setLoading(false);
    });
  }, [gisReady]);

  const refresh = useCallback(() => {
    if (!gisReady) return;
    requestAccessToken((t) => setToken(t));
  }, [gisReady]);

  const signOut = useCallback(() => {
    if (token) revokeToken(token.accessToken);
    setToken(null);
    setUser(null);
    stopSync();
  }, [token]);

  return (
    <AuthCtx.Provider
      value={{ token, user, gisReady, loading, signIn, signOut, refresh }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth outside AuthProvider");
  return ctx;
}
