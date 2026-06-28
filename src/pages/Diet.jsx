import { WEEK_DIET, DIET_PRINCIPLES, WEEKLY_TARGETS, HYDRATION_TIP } from "@/data/dietPlan";
import { Coffee, Apple, UtensilsCrossed, Soup, Moon, Droplet } from "lucide-react";

const SECTIONS = [
  { key: "breakfast", label: "Breakfast", time: "8:00 AM", icon: Coffee, accent: "#5A6B47" },
  { key: "midMorning", label: "Mid-Morning", time: "10:30 AM", icon: Apple, accent: "#B46A55" },
  { key: "lunch", label: "Lunch", time: "1:00 PM", icon: UtensilsCrossed, accent: "#5A6B47" },
  { key: "evening", label: "Evening Snack", time: "5:30 PM", icon: Soup, accent: "#B46A55" },
  { key: "dinner", label: "Dinner", time: "8:00 PM", icon: Moon, accent: "#5A6B47" },
];

export default function Diet() {
  return (
    <div className="space-y-12">
      <header>
        <div className="editorial-label">Nourishment</div>
        <h1 className="font-serif text-4xl md:text-6xl font-light tracking-tight mt-2">
          A week, plated.
        </h1>
        <p className="text-ink mt-3 max-w-2xl leading-relaxed">
          A rotating Indian-office friendly menu calibrated for gentle fat loss
          and joint-friendly recovery. Honors your office options, your morning
          fruit window, and your no-khichdi rule.
        </p>
      </header>

      {/* Targets */}
      <section className="grid md:grid-cols-4 gap-4">
        <TargetCard label="Calories" value={WEEKLY_TARGETS.caloriesPerDay} testId="target-calories" />
        <TargetCard label="Protein" value={WEEKLY_TARGETS.protein} testId="target-protein" />
        <TargetCard label="Steps" value={WEEKLY_TARGETS.steps} testId="target-steps" />
        <TargetCard label="Weight loss" value={WEEKLY_TARGETS.weightLoss} testId="target-weightloss" />
      </section>

      {/* Hydration banner */}
      <div className="bento-card flex items-start gap-3 bg-[#EBEAE4] border-transparent" data-testid="hydration-banner">
        <Droplet className="w-5 h-5 text-infoBlue mt-1" strokeWidth={1.5} />
        <p className="text-ink">{HYDRATION_TIP}</p>
      </div>

      {/* Weekly plan */}
      {WEEK_DIET.map((d) => (
        <section key={d.day} data-testid={`diet-day-${d.day}`} className="space-y-4">
          <div className="flex items-baseline gap-3">
            <div className="editorial-label">{d.day}</div>
            <div className="h-px flex-1 bg-[#D6D3C4]" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SECTIONS.map((s) => (
              <MealCard
                key={s.key}
                section={s}
                meal={d[s.key]}
                day={d.day}
              />
            ))}
          </div>
        </section>
      ))}

      {/* Principles */}
      <section className="bento-card bg-white">
        <div className="editorial-label">Principles</div>
        <h2 className="font-serif text-3xl mt-1 mb-5">Six gentle rules.</h2>
        <ul className="space-y-3">
          {DIET_PRINCIPLES.map((p, i) => (
            <li key={i} className="flex gap-3 text-ink" data-testid={`principle-${i}`}>
              <span className="font-serif text-2xl text-moss leading-none">·</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function TargetCard({ label, value, testId }) {
  return (
    <div className="bento-card" data-testid={testId}>
      <div className="editorial-label">{label}</div>
      <div className="font-serif text-xl mt-2 leading-snug">{value}</div>
    </div>
  );
}

function MealCard({ section, meal, day }) {
  const Icon = section.icon;
  if (typeof meal === "string") {
    return (
      <div className="bento-card" data-testid={`meal-${day}-${section.key}`}>
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color: section.accent }} strokeWidth={1.5} />
          <div className="editorial-label" style={{ color: section.accent }}>
            {section.label} · {section.time}
          </div>
        </div>
        <h3 className="font-serif text-xl mt-2 leading-snug">{meal}</h3>
      </div>
    );
  }
  return (
    <div className="bento-card" data-testid={`meal-${day}-${section.key}`}>
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" style={{ color: section.accent }} strokeWidth={1.5} />
        <div className="editorial-label" style={{ color: section.accent }}>
          {section.label} · {section.time}
        </div>
      </div>
      <h3 className="font-serif text-2xl mt-2 leading-snug">
        {meal.name || meal.type}
      </h3>
      {(meal.items || meal.detail) && (
        <p className="text-sm text-ink mt-2 leading-relaxed">
          {meal.items || meal.detail}
        </p>
      )}
      {meal.extras && (
        <p className="text-xs text-moss mt-2 italic">+ {meal.extras}</p>
      )}
      {meal.macros && (
        <div className="text-xs text-mute mt-3 tracking-wide">{meal.macros}</div>
      )}
    </div>
  );
}
