import { connectToDataBase } from "@/lib/db";
import TyeeCalendarDay from "@/models/day";

export default async function featuredevents() {
  const numToMonth = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };
  let asdf = numToMonth[new Date().getMonth()] + " " + new Date().getFullYear();

  await connectToDataBase();
  const days = await TyeeCalendarDay.find({
    monthYear: asdf,
  });

  return (
    <div className="p-6">
      {days.map((day) => {
        return (
          <div className="mt-4">
            <h1 className="text-2xl mb-2">{day.dayName}</h1>
            {day.events.length === 0 && <p>No events</p>}
            {day.events.map((event) => {
              return (
                <div>
                  <h2>{event.name}</h2>
                  <p>{event.description}</p>
                  <p>{event.location}</p>
                  <p>{event.startTime}</p>
                  <p>{event.endTime}</p>
                  <p>{event.tags.join(", ")}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
