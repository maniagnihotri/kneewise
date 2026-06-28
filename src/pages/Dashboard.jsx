import { useEffect, useMemo, useState } from "react";
import { Pill } from "lucide-react";
import WeekStrip from "@/components/WeekStrip";
import ExerciseCard from "@/components/ExerciseCard";
import { MEDICATIONS } from "@/data/medications";
import { getDayPlan, DAY_NAMES } from "@/data/exercisePlan";
import {
  getStartDate,
  getDay,
  toggleMed,
  toggleExercise,
} from "@/lib/storage";
import { todayKey, prettyDate, programWeek, weekday } from "@/lib/dates";

export default function Dashboard() {
  const [currentKey, setCurrentKey] = useState(todayKey());
  const [day, setDay] = useState(() => getDay(todayKey()));
  const startDate = getStartDate();
  const week = programWeek(startDate, currentKey);
  const dayName = DAY_NAMES[weekday(currentKey)];
  const plan = useMemo(() => getDayPlan(week, dayName), [week, dayName]);

  useEffect(() => {
    setDay(getDay(currentKey));
  }, [currentKey]);

  const totalTasks = MEDICATIONS.length + plan.items.length;
  const doneTasks =
    MEDICATIONS.filter((m) => day.meds?.[m.id]).length +
    plan.items.filter((e) => day.exercises?.[e.uid || e.id]).length;
  const pct = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

  const onToggleMed = (id) => setDay(toggleMed(currentKey, id));
  const onToggleEx = (uid) => setDay(toggleExercise(currentKey, uid));

  return (
    <div className="space-y-10">
      <header>
        <div className="editorial-label">
          Day · Week {week} of 12
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-light tracking-tight mt-2">
          {prettyDate(currentKey)}.
        </h1>
        <p className="text-ink mt-3 max-w-2xl leading-relaxed">
          <span className="text-moss font-medium">{plan.phaseName} phase</span>{" "}
          · {plan.phaseFocus}
        </p>
      </header>

      <section className="bento-card grid place-items-center py-10" data-testid="today-ring">
        <Ring pct={pct} />
        <div className="editorial-label mt-6">Today's Completion</div>
        <div className="font-serif text-3xl mt-2">
          {doneTasks} / {totalTasks}
        </div>
      </section>

      <WeekStrip currentKey={currentKey} onSelect={setCurrentKey} />

      <section className="bento-card" data-testid="meds-card">
        <div className="editorial-label flex items-center gap-2">
          <Pill className="w-3.5 h-3.5" strokeWidth={1.5} />
          Medications
        </div>
        <h2 className="font-serif text-3xl mt-1 mb-5">Daily meds</h2>
        <div className="space-y-3">
          {MEDICATIONS.map((m) => {
            const checked = !!day.meds?.[m.id];
            return (
              <button
                key={m.id}
                onClick={() => onToggleMed(m.id)}
                data-testid={`med-${m.id}`}
                className={`w-full text-left rounded-2xl border px-4 py-3 flex items-start gap-3 transition-all ${
                  checked
                    ? "bg-surfaceAlt border-transparent"
                    : "bg-white border-[#D6D3C4] hover:border-moss"
                }`}
              >
                <span
                  className={`mt-1 w-5 h-5 rounded-full border flex-shrink-0 ${
                    checked ? "bg-moss border-moss" : "border-[#D6D3C4]"
                  }`}
                />
                <span className="flex-1">
                  <div className={`font-medium ${checked ? "checked-strike" : ""}`}>
                    {m.name}
                  </div>
                  <div className="text-xs text-mute mt-0.5">{m.timing}</div>
                  <div className="text-sm text-ink italic mt-1">{m.note}</div>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section data-testid="today-exercises">
        <div className="editorial-label mb-3">Today's session</div>
        <h2 className="font-serif text-3xl mb-5">{dayName} · {plan.items.length} movements</h2>
        {plan.items.length === 0 ? (
          <p className="text-mute italic">Rest day — gentle walking only.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plan.items.map((ex) => {
              const checked = !!day.exercises?.[ex.uid || ex.id];
              return (
                <ExerciseCard
                  key={ex.uid || ex.id}
                  exercise={ex}
                  checked={checked}
                  onToggle={() => onToggleEx(ex.uid || ex.id)}
                  testIdPrefix="today"
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function Ring({ pct }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="relative w-44 h-44">
      <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
        <circle cx="80" cy="80" r={r} stroke="#EBEAE4" strokeWidth="10" fill="none" />
        <circle
          cx="80"
          cy="80"
          r={r}
          stroke="#5A6B47"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          fill="none"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center font-serif text-4xl">
        {pct}%
      </div>
    </div>
  );
}
