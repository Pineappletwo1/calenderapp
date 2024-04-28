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
  return (
    <div className="p-6 flex">
      <div className="w-2/3">
        <h1 className="text-3xl mt-4">
          {day.dayOfWeek}, {day.dayName}
        </h1>

        <ul>
          {day.events.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
      </div>
      <div className="w-1/3">
        <CreateEvent />
      </div>
    </div>
  );
}
