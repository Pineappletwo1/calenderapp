import { connectToDataBase } from "@/lib/db";
import TyeeCalendarDay from "@/models/day";
import DashboardEvents from "@/components/DashboardEvents";

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
  let days = await TyeeCalendarDay.find({
    monthYear: asdf,
  });

  days = days.map((day) => {
    return {
      dayOfWeek: day.dayOfWeek,
      dayName: day.dayName,
      events: day.events,
      monthYear: day.monthYear,
    };
  });

  return (
    <div className="p-6">
      <h1 className="text-5xl mb-6">Dashboard</h1>
      <DashboardEvents days={days} />
    </div>
  );
}
