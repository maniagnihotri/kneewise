import { useEffect, useMemo, useState } from "react";
import { Pill, Sparkles } from "lucide-react";
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

  const medsDone = MEDICATIONS.filter((m) => day.meds?.[m.id]).length;
  const exDone = plan.items.filter((e) => day.exercises?.[e.uid || e.id]).length;
  const totalTasks = MEDICATIONS.length + plan.items.length;
  const doneTasks = medsDone + exDone;
  const pct = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

  const onToggleMed = (id) => setDay(toggleMed(currentKey, id));
  const onToggleEx = (uid) => setDay(toggleExercise(currentKey, uid));

  return (
    <div className="space-y-10">
      <div className="grid md:grid-cols-[1fr_300px] gap-6 md:gap-8 items-start">
        <header className="md:pt-2">
          <div className="editorial-label">
            Day · Week {week} of 12
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-light tracking-tight mt-2">
            {prettyDate(currentKey)}.
          </h1>
          <p className="text-ink mt-3 max-w-2xl leading-relaxed">
            <span className="text-moss font-medium">{plan.phaseName} phase</span>{" "}
            · {plan.phaseFocus}
          </p>
        </header>

        <section className="bento-card grid place-items-center py-7 px-6" data-testid="today-ring">
          <Ring pct={pct} />
          <div className="editorial-label mt-4">Today's Completion</div>
          <div className="font-serif text-2xl mt-1">
            {doneTasks} / {totalTasks}
          </div>
        </section>
      </div>

      <WeekStrip currentKey={currentKey} onSelect={setCurrentKey} />

      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-6">
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

        <section className="bento-card flex flex-col" data-testid="intention-card">
          <div className="editorial-label flex items-center gap-2 text-terracotta">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
            Today's Intention
          </div>
          <h2 className="font-serif text-3xl mt-1 mb-3">
            "{plan.intention}"
          </h2>
          <p className="text-ink leading-relaxed flex-1">
            {plan.intentionBody}
          </p>
          <div className="grid grid-cols-3 gap-3 mt-6">
            <Stat label="Meds done" value={`${medsDone}/${MEDICATIONS.length}`} />
            <Stat label="Exercises" value={`${exDone}/${plan.items.length}`} />
            <Stat label="Phase" value={`${plan.phase}/4`} />
          </div>
        </section>
      </div>

      <section data-testid="today-exercises">
        <div className="flex items-end justify-between mb-5">
          <div>
            <div className="editorial-label mb-1">Today's session</div>
            <h2 className="font-serif text-3xl">{dayName} · {plan.items.length} movements</h2>
          </div>
        </div>
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

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#D6D3C4] bg-white px-3 py-3">
      <div className="editorial-label text-[10px]">{label}</div>
      <div className="font-serif text-xl mt-1">{value}</div>
    </div>
  );
}

function Ring({ pct }) {
  const r = 56;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="relative w-36 h-36">
      <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
        <circle cx="70" cy="70" r={r} stroke="#EBEAE4" strokeWidth="9" fill="none" />
        <circle
          cx="70"
          cy="70"
          r={r}
          stroke="#5A6B47"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          fill="none"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center font-serif text-3xl">
        {pct}%
      </div>
    </div>
  );
}
