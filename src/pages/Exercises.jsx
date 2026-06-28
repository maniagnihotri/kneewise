import { useState } from "react";
import ExerciseCard from "@/components/ExerciseCard";
import {
  getDayPlan,
  DAY_NAMES,
} from "@/data/exercisePlan";

export default function Exercises() {
  const [week, setWeek] = useState(1);
  const [day, setDay] = useState(DAY_NAMES[0]);
  const plan = getDayPlan(week, day);

  return (
    <div className="space-y-10">
      <div>
        <div className="editorial-label">12-week protocol</div>
        <h1 className="font-serif text-4xl md:text-6xl font-light tracking-tight mt-2">
          The protocol.
        </h1>
        <p className="text-ink mt-3 max-w-2xl leading-relaxed">
          A patient, progressive ACL + meniscus reconditioning plan. Four phases,
          three weeks each. Pick a week and a day to preview the session.
        </p>
      </div>

      {/* Week selector */}
      <section>
        <div className="editorial-label mb-3">Week</div>
        <div className="flex flex-wrap gap-2" data-testid="week-picker">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((w) => (
            <button
              key={w}
              data-testid={`week-btn-${w}`}
              onClick={() => setWeek(w)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                w === week
                  ? "bg-moss text-bone border-moss"
                  : "bg-white text-charcoal border-[#D6D3C4] hover:bg-surfaceAlt"
              }`}
            >
              Week {w}
            </button>
          ))}
        </div>
      </section>

      {/* Phase summary */}
      <section className="bento-card bg-[#EBEAE4] border-transparent">
        <div className="editorial-label">Phase {plan.phase} of 4</div>
        <h2 className="font-serif text-3xl md:text-4xl mt-1">{plan.phaseName}</h2>
        <p className="text-ink mt-3 max-w-2xl">{plan.phaseFocus}</p>
      </section>

      {/* Day selector */}
      <section>
        <div className="editorial-label mb-3">Day</div>
        <div className="flex flex-wrap gap-2" data-testid="day-picker">
          {DAY_NAMES.map((d) => (
            <button
              key={d}
              data-testid={`day-btn-${d}`}
              onClick={() => setDay(d)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                d === day
                  ? "bg-charcoal text-bone border-charcoal"
                  : "bg-white text-charcoal border-[#D6D3C4] hover:bg-surfaceAlt"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </section>

      {/* Cards */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="exercise-grid">
        {plan.items.map((ex) => (
          <ExerciseCard key={ex.id} exercise={ex} testIdPrefix="planner" />
        ))}
      </section>

      {plan.items.length === 0 && (
        <p className="text-mute italic">Rest day — gentle walking only.</p>
      )}
    </div>
  );
}
