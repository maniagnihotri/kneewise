import { getWeekDates, shortDate, dayNumber, todayKey } from "@/lib/dates";

export default function WeekStrip({ currentKey, onSelect }) {
  const dates = getWeekDates(currentKey);
  const today = todayKey();
  return (
    <div
      className="flex items-center gap-2 md:gap-3 overflow-x-auto scroll-thin pb-2"
      data-testid="week-strip"
    >
      {dates.map((k) => {
        const isToday = k === today;
        const isSelected = k === currentKey;
        return (
          <button
            key={k}
            data-testid={`week-day-${k}`}
            onClick={() => onSelect(k)}
            className={`flex-shrink-0 w-14 md:w-16 py-3 rounded-2xl border transition-all ${
              isSelected
                ? "bg-moss text-bone border-moss"
                : "bg-white text-charcoal border-[#D6D3C4] hover:bg-surfaceAlt"
            }`}
          >
            <div className={`text-[10px] tracking-[0.2em] uppercase ${isSelected ? "text-bone/80" : "text-mute"}`}>
              {shortDate(k)}
            </div>
            <div className="font-serif text-2xl mt-1 leading-none">
              {dayNumber(k)}
            </div>
            {isToday && (
              <div className={`text-[10px] mt-1 ${isSelected ? "text-bone/90" : "text-moss"}`}>
                today
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
