import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import {
  addWeight,
  getWeights,
  deleteWeight,
  getTargetWeight,
  setTargetWeight,
} from "@/lib/storage";
import { todayKey } from "@/lib/dates";

export default function Weight() {
  const [weights, setWeights] = useState({});
  const [value, setValue] = useState("");
  const [dateKey, setDateKey] = useState(todayKey());
  const [target, setTarget] = useState(60);

  useEffect(() => {
    setWeights(getWeights());
    setTarget(getTargetWeight());
  }, []);

  const data = useMemo(() => {
    return Object.entries(weights)
      .map(([k, v]) => ({ date: k, weight: Number(v) }))
      .sort((a, b) => (a.date < b.date ? -1 : 1));
  }, [weights]);

  const latest = data[data.length - 1]?.weight;
  const start = data[0]?.weight;
  const delta = start != null && latest != null ? +(latest - start).toFixed(1) : null;

  const submit = () => {
    if (!value) {
      toast.error("Enter weight in kg");
      return;
    }
    const v = parseFloat(value);
    if (Number.isNaN(v) || v <= 30 || v >= 250) {
      toast.error("Enter a realistic weight (kg).");
      return;
    }
    const next = addWeight(dateKey, v);
    setWeights({ ...next });
    setValue("");
    toast.success("Weight logged.");
  };

  const remove = (k) => {
    const next = deleteWeight(k);
    setWeights({ ...next });
  };

  const updateTarget = (v) => {
    setTarget(v);
    setTargetWeight(v);
  };

  return (
    <div className="space-y-10">
      <header>
        <div className="editorial-label">Body weight</div>
        <h1 className="font-serif text-4xl md:text-6xl font-light tracking-tight mt-2">
          One number, weekly.
        </h1>
        <p className="text-ink mt-3 max-w-2xl leading-relaxed">
          Weigh once or twice a week — same time, same scale. The trend matters
          much more than any single reading.
        </p>
      </header>

      {/* Stats */}
      <section className="grid md:grid-cols-4 gap-4">
        <Stat label="Current" value={latest != null ? `${latest} kg` : "—"} testId="stat-current" />
        <Stat label="Starting" value={start != null ? `${start} kg` : "—"} testId="stat-start" />
        <Stat
          label="Change"
          value={delta != null ? `${delta > 0 ? "+" : ""}${delta} kg` : "—"}
          testId="stat-change"
          highlight={delta != null && delta < 0 ? "moss" : delta > 0 ? "terracotta" : ""}
        />
        <Stat label="Target" value={`${target} kg`} testId="stat-target" />
      </section>

      {/* Chart */}
      <section className="bento-card" data-testid="weight-chart">
        {data.length === 0 ? (
          <p className="text-mute italic py-12 text-center">
            Log your first weight to see the trend.
          </p>
        ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5A6B47" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#5A6B47" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#8A9084" tickLine={false} axisLine={false} />
                <YAxis stroke="#8A9084" tickLine={false} axisLine={false} domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #D6D3C4",
                    borderRadius: 12,
                    fontFamily: "Manrope",
                  }}
                />
                <ReferenceLine y={target} stroke="#B46A55" strokeDasharray="4 4" label={{ value: "target", fill: "#B46A55", fontSize: 11 }} />
                <Area
                  type="monotone"
                  dataKey="weight"
                  stroke="#5A6B47"
                  strokeWidth={2.5}
                  fill="url(#g1)"
                />
                <Line type="monotone" dataKey="weight" stroke="#5A6B47" strokeWidth={2.5} dot={{ r: 4, fill: "#5A6B47" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {/* Log form */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bento-card">
          <div className="editorial-label">Log weight</div>
          <h2 className="font-serif text-2xl mt-1 mb-4">Add an entry</h2>
          <div className="flex flex-col gap-3">
            <input
              type="date"
              value={dateKey}
              onChange={(e) => setDateKey(e.target.value)}
              data-testid="weight-date-input"
              className="px-4 py-3 rounded-2xl border border-[#D6D3C4] bg-white text-charcoal focus:outline-none focus:border-moss"
            />
            <input
              type="number"
              step="0.1"
              placeholder="Weight in kg"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              data-testid="weight-value-input"
              className="px-4 py-3 rounded-2xl border border-[#D6D3C4] bg-white text-charcoal focus:outline-none focus:border-moss"
            />
            <button
              onClick={submit}
              data-testid="weight-save-btn"
              className="self-start px-6 py-3 rounded-full bg-moss text-bone font-medium hover:opacity-90 transition-opacity"
            >
              Save weight
            </button>
          </div>
        </div>

        <div className="bento-card">
          <div className="editorial-label">Target</div>
          <h2 className="font-serif text-2xl mt-1 mb-2">Where you're going</h2>
          <p className="text-sm text-ink mb-4">
            With your height (157 cm), a healthy BMI sits around 55–62 kg.
            Adjust if your physio has a different goal.
          </p>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={target}
              step="0.5"
              onChange={(e) => updateTarget(Number(e.target.value))}
              data-testid="target-input"
              className="w-32 px-4 py-3 rounded-2xl border border-[#D6D3C4] bg-white text-charcoal focus:outline-none focus:border-moss"
            />
            <span className="text-mute">kg</span>
          </div>
        </div>
      </section>

      {/* Entries list */}
      {data.length > 0 && (
        <section>
          <div className="editorial-label mb-3">All entries</div>
          <div className="bento-card divide-y divide-[#EBEAE4] p-0">
            {[...data].reverse().map((d) => (
              <div
                key={d.date}
                className="flex items-center justify-between px-5 py-3"
                data-testid={`entry-${d.date}`}
              >
                <div>
                  <div className="font-medium">{d.weight} kg</div>
                  <div className="text-xs text-mute">{d.date}</div>
                </div>
                <button
                  onClick={() => remove(d.date)}
                  data-testid={`entry-delete-${d.date}`}
                  className="text-mute hover:text-terracotta transition-colors p-2"
                  aria-label="Delete entry"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Stat({ label, value, testId, highlight }) {
  const color =
    highlight === "moss" ? "#5A6B47" : highlight === "terracotta" ? "#B46A55" : "#2A2E26";
  return (
    <div className="bento-card" data-testid={testId}>
      <div className="editorial-label">{label}</div>
      <div className="font-serif text-3xl mt-1" style={{ color }}>
        {value}
      </div>
    </div>
  );
}
