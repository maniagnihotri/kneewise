import { X } from "lucide-react";
import { useEffect } from "react";

export default function VideoModal({ exercise, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const videoId = exercise.youtube.split("v=")[1]?.split("&")[0];

  return (
    <div
      className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-50 grid place-items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-bone rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D6D3C4]">
          <div>
            <div className="editorial-label">{exercise.category}</div>
            <h2 className="font-serif text-2xl mt-1">{exercise.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-surfaceAlt transition-colors grid place-items-center"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-charcoal" strokeWidth={1.5} />
          </button>
        </div>

        <div className="aspect-video bg-charcoal">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={exercise.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="px-3 py-1 rounded-full bg-surfaceAlt text-charcoal font-medium">
              {exercise.sets} {exercise.sets === 1 ? "set" : "sets"}
            </span>
            <span className="text-ink">×</span>
            <span className="px-3 py-1 rounded-full bg-surfaceAlt text-charcoal font-medium">
              {exercise.reps}
            </span>
          </div>
          <p className="text-sm text-ink leading-relaxed">
            {exercise.description}
          </p>
          <p className="text-xs text-moss italic">→ {exercise.cue}</p>
        </div>
      </div>
    </div>
  );
}
