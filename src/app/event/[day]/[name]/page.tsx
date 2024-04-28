import { connectToDataBase } from "@/lib/db";
import TyeeCalendarDay from "@/models/day";

export default async function Event({ params }) {
  await connectToDataBase();
  const day = await TyeeCalendarDay.findOne({
    dayName: params.day.replaceAll("%20", " "),
  });
  if (!day) {
    return <div>404 Day not found</div>;
  }
  let event = day.events.find(
    (a) =>
      a.name.toLowerCase().trim().trimEnd() ===
      params.name.replaceAll("%20", " ").toLowerCase().trim().trimEnd()
  );
  if (!event) {
    return <div>404 Event not found</div>;
  }
  return (
    <div className="p-6 flex">
      <div className="w-2/3">
        <h1 className="text-2xl mt-4">
          {day.dayOfWeek}, {day.dayName}
        </h1>
        <div className="py-4">
          <h2 className="text-4xl">{event.name}</h2>
          <p className="text-xl mt-2">{event.description}</p>
          <p className="text-xl mt-4">{event.location}</p>
          <p>
            From {event.startTime} to {event.endTime}
          </p>
          <div className="flex gap-2 mt-4">
            {event.tags.map((tag, i) => (
              <span key={i} className="bg-gray-300  px-2 rounded text-xl">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="w-1/3"></div>
    </div>
  );
}
