import { connectToDataBase } from "@/lib/db";
import TyeeCalendarDay from "@/models/day";
import DashboardEvents from "@/components/DashboardEvents";
import TyeeCalendarUser from "@/models/user";
import { getServerSession } from "next-auth";
import connectToDatabase from "@/lib/db";

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
  let nextMonth;
  if (new Date().getMonth() < 10) {
    nextMonth =
      numToMonth[new Date().getMonth() + 1] + " " + new Date().getFullYear();
  }
  if (new Date().getMonth() === 11) {
    nextMonth = numToMonth[0] + " " + (new Date().getFullYear() + 1);
  }

  await connectToDataBase();
  let days = await TyeeCalendarDay.find({
    monthYear: asdf,
  });
  let nextDays = await TyeeCalendarDay.find({
    monthYear: nextMonth,
  });
  days = days.concat(nextDays);

  days = days.map((day) => {
    return {
      dayOfWeek: day.dayOfWeek,
      dayName: day.dayName,
      events: day.events,
      monthYear: day.monthYear,
    };
  });
  const session = await getServerSession();
  const user = session
    ? await TyeeCalendarUser.findOne({ email: session.user.email })
    : null;
  return (
    <div className="p-6">
      <h1 className="text-5xl mb-6">Dashboard</h1>
      <DashboardEvents days={days} tags={user?.tags} starred={user?.starred} />
    </div>
  );
}
