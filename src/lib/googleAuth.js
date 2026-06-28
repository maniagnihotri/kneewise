export const GOOGLE_CLIENT_ID =
  "519919728947-7v3gote87qsoai4pf0tih339s9lpjabf.apps.googleusercontent.com";

export const DRIVE_SCOPE =
  "https://www.googleapis.com/auth/drive.appdata openid email profile";

const TOKEN_KEY = "kneewise-google-token";

export function loadStoredToken() {
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return null;
    const t = JSON.parse(raw);
    if (!t.expiresAt || t.expiresAt < Date.now() + 30_000) return null;
    return t;
  } catch {
    return null;
  }
}

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

let tokenClient = null;

function ensureClient(onToken) {
  if (!window.google?.accounts?.oauth2) {
    throw new Error("Google Identity Services not loaded yet");
  }
  if (tokenClient) return tokenClient;
  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,
    scope: DRIVE_SCOPE,
    callback: (res) => {
      if (res.access_token) {
        const token = {
          accessToken: res.access_token,
          expiresAt: Date.now() + (res.expires_in || 3600) * 1000,
        };
        saveToken(token);
        onToken(token);
      }
    },
  });
  return tokenClient;
}

export function requestAccessToken(onToken) {
  const client = ensureClient(onToken);
  client.callback = (res) => {
    if (res.access_token) {
      const token = {
        accessToken: res.access_token,
        expiresAt: Date.now() + (res.expires_in || 3600) * 1000,
      };
      saveToken(token);
      onToken(token);
    }
  };
  client.requestAccessToken({ prompt: "" });
}

export function promptAccessToken(onToken) {
  const client = ensureClient(onToken);
  client.callback = (res) => {
    if (res.access_token) {
      const token = {
        accessToken: res.access_token,
        expiresAt: Date.now() + (res.expires_in || 3600) * 1000,
      };
      saveToken(token);
      onToken(token);
    }
  };
  client.requestAccessToken({ prompt: "consent" });
}

export function revokeToken(accessToken) {
  if (!accessToken) return;
  if (window.google?.accounts?.oauth2?.revoke) {
    window.google.accounts.oauth2.revoke(accessToken, () => {});
  }
  clearToken();
}

export async function fetchUserInfo(accessToken) {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("userinfo failed");
  return res.json();
}
