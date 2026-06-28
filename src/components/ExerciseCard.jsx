import { Play } from "lucide-react";
import { ytThumbnail } from "@/data/exercisePlan";

export default function ExerciseCard({
  exercise,
  checked,
  onToggle,
  testIdPrefix = "exercise",
}) {
  const thumb = ytThumbnail(exercise.youtube);
  return (
    <div
      className={`bento-card flex flex-col ${
        checked ? "bg-surfaceAlt" : ""
      }`}
      data-testid={`${testIdPrefix}-card-${exercise.id}`}
    >
      <a
        href={exercise.youtube}
        target="_blank"
        rel="noreferrer"
        className="relative block overflow-hidden rounded-2xl mb-4 group"
        data-testid={`${testIdPrefix}-video-${exercise.id}`}
      >
        {thumb ? (
          <img
            src={thumb}
            alt={exercise.name}
            className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full aspect-video bg-surfaceAlt grid place-items-center text-mute">
            video
          </div>
        )}
        <div className="absolute inset-0 grid place-items-center">
          <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur grid place-items-center border border-white/60 shadow-sm group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 text-charcoal" fill="#2A2E26" strokeWidth={1} />
          </div>
        </div>
      </a>

      <div className="editorial-label">{exercise.category}</div>
      <h3
        className={`font-serif text-2xl mt-1 leading-tight ${
          checked ? "checked-strike" : ""
        }`}
      >
        {exercise.name}
      </h3>

      <div className="mt-3 flex items-center gap-3 text-sm">
        <span className="px-3 py-1 rounded-full bg-surfaceAlt text-charcoal font-medium">
          {exercise.sets} {exercise.sets === 1 ? "set" : "sets"}
        </span>
        <span className="text-ink">×</span>
        <span className="px-3 py-1 rounded-full bg-surfaceAlt text-charcoal font-medium">
          {exercise.reps}
        </span>
      </div>

      <p className="text-sm text-ink mt-4 leading-relaxed">
        {exercise.description}
      </p>
      <p className="text-xs text-moss mt-2 italic">→ {exercise.cue}</p>

      {onToggle && (
        <button
          onClick={onToggle}
          data-testid={`${testIdPrefix}-toggle-${exercise.id}`}
          className={`mt-5 self-start px-5 py-2 rounded-full text-sm font-medium border transition-all ${
            checked
              ? "bg-moss text-bone border-moss"
              : "bg-white text-charcoal border-[#D6D3C4] hover:bg-surfaceAlt"
          }`}
        >
          {checked ? "Done ✓" : "Mark done"}
        </button>
      )}
    </div>
  );
}
