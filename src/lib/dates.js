// Date helpers
export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function toKey(d) {
  return d.toISOString().slice(0, 10);
}

export function fromKey(key) {
  return new Date(key + "T00:00:00");
}

export function daysBetween(a, b) {
  const MS = 24 * 60 * 60 * 1000;
  const aMid = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const bMid = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((bMid - aMid) / MS);
}

export function programWeek(startKey, currentKey) {
  const diff = daysBetween(fromKey(startKey), fromKey(currentKey));
  if (diff < 0) return 1;
  return Math.min(12, Math.floor(diff / 7) + 1);
}

export function weekday(dateKey) {
  // Returns 0=Mon, 6=Sun for the rotation
  const d = fromKey(dateKey);
  const js = d.getDay(); // 0=Sun
  return (js + 6) % 7;
}

export function getWeekDates(dateKey) {
  // Returns 7 date keys for the week containing dateKey (Mon -> Sun)
  const d = fromKey(dateKey);
  const dow = weekday(dateKey);
  const monday = new Date(d);
  monday.setDate(d.getDate() - dow);
  return Array.from({ length: 7 }, (_, i) => {
    const x = new Date(monday);
    x.setDate(monday.getDate() + i);
    return toKey(x);
  });
}

export function prettyDate(dateKey) {
  const d = fromKey(dateKey);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function shortDate(dateKey) {
  const d = fromKey(dateKey);
  return d.toLocaleDateString("en-US", { weekday: "short" });
}

export function dayNumber(dateKey) {
  return fromKey(dateKey).getDate();
}
