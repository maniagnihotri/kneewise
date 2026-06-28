import { findFile, readFile, createFile, updateFile } from "@/lib/drive";
import { snapshot, replaceAll, subscribe } from "@/lib/storage";

const FLUSH_MS = 1500;

let state = {
  token: null,
  fileId: null,
  pending: false,
  timer: null,
  status: "idle",
  lastError: null,
  listeners: new Set(),
};

function emit() {
  const s = { status: state.status, lastError: state.lastError, fileId: state.fileId };
  state.listeners.forEach((fn) => fn(s));
}

export function onSyncStatus(fn) {
  state.listeners.add(fn);
  fn({ status: state.status, lastError: state.lastError, fileId: state.fileId });
  return () => state.listeners.delete(fn);
}

function setStatus(status, err = null) {
  state.status = status;
  state.lastError = err;
  emit();
}

async function pull(token) {
  setStatus("pulling");
  const f = await findFile(token);
  if (!f) {
    setStatus("idle");
    return null;
  }
  state.fileId = f.id;
  const data = await readFile(token, f.id);
  setStatus("idle");
  return data;
}

async function push(token) {
  const data = snapshot();
  setStatus("pushing");
  if (!state.fileId) {
    const f = await createFile(token, data);
    state.fileId = f.id;
  } else {
    await updateFile(token, state.fileId, data);
  }
  setStatus("idle");
}

function scheduleFlush() {
  if (!state.token) return;
  clearTimeout(state.timer);
  state.timer = setTimeout(async () => {
    try {
      await push(state.token);
    } catch (e) {
      setStatus("error", String(e.message || e));
    }
  }, FLUSH_MS);
}

let unsubscribe = null;

export async function startSync(token) {
  state.token = token;
  setStatus("pulling");
  try {
    const remote = await pull(token);
    if (remote && typeof remote === "object") {
      const local = snapshot();
      const merged = mergeData(local, remote);
      replaceAll(merged);
      if (JSON.stringify(merged) !== JSON.stringify(remote)) {
        await push(token);
      }
    } else {
      const local = snapshot();
      if (Object.keys(local).length > 0) {
        await push(token);
      }
    }
  } catch (e) {
    setStatus("error", String(e.message || e));
  }

  if (unsubscribe) unsubscribe();
  unsubscribe = subscribe(() => {
    setStatus("dirty");
    scheduleFlush();
  });
}

export function stopSync() {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
  clearTimeout(state.timer);
  state.token = null;
  state.fileId = null;
  setStatus("idle");
}

export function setSyncToken(token) {
  state.token = token;
}

function mergeData(local, remote) {
  // Last-write-wins per key. Remote wins for primitives if both have value.
  // For nested days/weights — union by key, prefer truthy local checkboxes vs remote.
  const out = { ...remote, ...local };
  out.days = { ...(remote.days || {}) };
  for (const [k, v] of Object.entries(local.days || {})) {
    const r = out.days[k] || {};
    out.days[k] = {
      meds: { ...(r.meds || {}), ...(v.meds || {}) },
      exercises: { ...(r.exercises || {}), ...(v.exercises || {}) },
      notes: v.notes || r.notes || "",
    };
  }
  out.weights = { ...(remote.weights || {}), ...(local.weights || {}) };
  out.startDate = local.startDate || remote.startDate;
  out.targetWeight = local.targetWeight ?? remote.targetWeight;
  return out;
}
