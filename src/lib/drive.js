const FILE_NAME = "kneewise.json";
const DRIVE = "https://www.googleapis.com/drive/v3";
const UPLOAD = "https://www.googleapis.com/upload/drive/v3";

async function authFetch(token, url, opts = {}) {
  const res = await fetch(url, {
    ...opts,
    headers: {
      ...(opts.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}

export async function findFile(token) {
  const params = new URLSearchParams({
    spaces: "appDataFolder",
    q: `name='${FILE_NAME}' and trashed=false`,
    fields: "files(id, name, modifiedTime)",
    pageSize: "1",
  });
  const res = await authFetch(token, `${DRIVE}/files?${params}`);
  if (!res.ok) throw new Error(`Drive list failed (${res.status})`);
  const json = await res.json();
  return json.files?.[0] || null;
}

export async function readFile(token, fileId) {
  const res = await authFetch(token, `${DRIVE}/files/${fileId}?alt=media`);
  if (!res.ok) throw new Error(`Drive read failed (${res.status})`);
  return res.json();
}

export async function createFile(token, data) {
  const metadata = { name: FILE_NAME, parents: ["appDataFolder"] };
  const body = buildMultipart(metadata, data);
  const res = await authFetch(
    token,
    `${UPLOAD}/files?uploadType=multipart&fields=id`,
    {
      method: "POST",
      headers: {
        "Content-Type": `multipart/related; boundary=${body.boundary}`,
      },
      body: body.payload,
    }
  );
  if (!res.ok) throw new Error(`Drive create failed (${res.status})`);
  return res.json();
}

export async function updateFile(token, fileId, data) {
  const res = await authFetch(
    token,
    `${UPLOAD}/files/${fileId}?uploadType=media`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) throw new Error(`Drive update failed (${res.status})`);
  return res.json();
}

function buildMultipart(metadata, data) {
  const boundary = "kneewise" + Math.floor(Math.random() * 1e9);
  const dash = `\r\n--${boundary}\r\n`;
  const end = `\r\n--${boundary}--`;
  const payload =
    dash +
    "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
    JSON.stringify(metadata) +
    dash +
    "Content-Type: application/json\r\n\r\n" +
    JSON.stringify(data) +
    end;
  return { boundary, payload };
}
