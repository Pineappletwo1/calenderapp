import Link from "next/link";

const CalendarDay = ({ index, day }) => {
  return (
    <Link href="/day/">
      <div
        key={index}
        className="p-2 w-auto h-20 bg-blue-100 rounded-lg flex items-center justify-center font-bold hover:bg-blue-200 hover:scale-105 transition-transform relative"
      >
        {day}
        <span className="absolute top-2 right-2 bg-blue-400 p-4 rounded-full font-mono h-4 w-4 flex items-center justify-center text-white text-center">
          <span>!</span>
        </span>
      </div>
    </Link>
  );
};

CalendarDay.displayName = "CalendarDay";

export default CalendarDay;
