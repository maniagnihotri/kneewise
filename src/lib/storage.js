const ROOT = "knee-rehab-v1";
const EVT = "kneewise-storage-changed";

function readAll() {
  try {
    const raw = localStorage.getItem(ROOT);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(data) {
  localStorage.setItem(ROOT, JSON.stringify(data));
  try {
    window.dispatchEvent(new CustomEvent(EVT, { detail: data }));
  } catch {
    // ignore in non-browser contexts
  }
}

export function subscribe(handler) {
  const fn = (e) => handler(e.detail);
  window.addEventListener(EVT, fn);
  return () => window.removeEventListener(EVT, fn);
}

export function snapshot() {
  return readAll();
}

export function replaceAll(data) {
  localStorage.setItem(ROOT, JSON.stringify(data || {}));
}

export function getStartDate() {
  const data = readAll();
  if (!data.startDate) {
    const today = new Date().toISOString().slice(0, 10);
    data.startDate = today;
    writeAll(data);
    return today;
  }
  return data.startDate;
}

export function setStartDate(dateStr) {
  const data = readAll();
  data.startDate = dateStr;
  writeAll(data);
}

export function getDay(dateKey) {
  const data = readAll();
  return data.days?.[dateKey] || { meds: {}, exercises: {}, notes: "" };
}

export function toggleMed(dateKey, medId) {
  const data = readAll();
  data.days = data.days || {};
  data.days[dateKey] = data.days[dateKey] || { meds: {}, exercises: {} };
  data.days[dateKey].meds[medId] = !data.days[dateKey].meds[medId];
  writeAll(data);
  return data.days[dateKey];
}

export function toggleExercise(dateKey, exId) {
  const data = readAll();
  data.days = data.days || {};
  data.days[dateKey] = data.days[dateKey] || { meds: {}, exercises: {} };
  data.days[dateKey].exercises[exId] = !data.days[dateKey].exercises[exId];
  writeAll(data);
  return data.days[dateKey];
}

export function getAllDays() {
  const data = readAll();
  return data.days || {};
}

export function addWeight(dateKey, value) {
  const data = readAll();
  data.weights = data.weights || {};
  data.weights[dateKey] = Number(value);
  writeAll(data);
  return data.weights;
}

export function getWeights() {
  const data = readAll();
  return data.weights || {};
}

export function deleteWeight(dateKey) {
  const data = readAll();
  if (data.weights && data.weights[dateKey] != null) {
    delete data.weights[dateKey];
    writeAll(data);
  }
  return data.weights || {};
}

export function getTargetWeight() {
  const data = readAll();
  return data.targetWeight ?? 60;
}

export function setTargetWeight(v) {
  const data = readAll();
  data.targetWeight = Number(v);
  writeAll(data);
}
