import { connectToDataBase } from "@/lib/db";
import TyeeCalendarDay from "@/models/day";
import CreateEvent from "@/components/CreateEvent";

export default async function Day({ params }) {
  await connectToDataBase();
  const day = await TyeeCalendarDay.findOne({
    dayName: params.name.replaceAll("%20", " "),
  });
  if (day === null) {
    return <div>404 Day not found</div>;
  }
  let events = day.events.sort((a, b) => {
    return (
      new Date(`1970-01-01T${a.startTime}:00Z`).getTime() -
      new Date(`1970-01-01T${b.startTime}:00Z`).getTime()
    );
  });

  return (
    <div className="p-6 flex">
      <div className="w-2/3">
        <h1 className="text-3xl mt-4">
          {day.dayOfWeek}, {day.dayName}
        </h1>
        {events.map((event, i) => (
          <div key={i} className="p-4 bg-gray-200 rounded-lg mt-4 w-4/5">
            <h2 className="text-2xl">{event.name}</h2>
            <p className="text-lg mt-2">{event.description}</p>
            <p className="text-lg mt-2">{event.time}</p>
            <p>{event.location}</p>
            <p>
              From {event.startTime} to {event.endTime}
            </p>
            <div className="flex gap-2 mt-4">
              {event.tags.map((tag, i) => (
                <span key={i} className="bg-gray-300  px-2 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/3">
        <CreateEvent day={params.name} />
      </div>
    </div>
  );
}
