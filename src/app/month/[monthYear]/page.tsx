import { connectToDataBase } from "@/lib/db";
import TyeeCalendarDay from "@/models/day";
import Link from "next/link";
const Month: FC = async ({ params }) => {
  await connectToDataBase();
  const days = await TyeeCalendarDay.find({
    monthYear: params.monthYear.replace("%20", " "),
  });
  if (days.length === 0) {
    return <div>404 Month not found</div>;
  }
  days.forEach((day) => console.log(day.dayName));
  const date = new Date();
  let daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const monthToNum = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  let startDay = new Date(
    parseInt(days[0].monthYear.split(" ")[1]),
    monthToNum[days[0].monthYear.split(" ")[0]]
  ).getDay();
  startDay--;
  let table = [];
  for (let i = 0; i < startDay; i++) {
    table.push(["", ""]);
  }
  for (let j = 0; j < parseInt(days[0].dayName.split(" ")[1]); j++) {
    table.push(["", ""]);
  }
  for (let day of days) {
    table.push([day.dayName.split(" ")[1], day.dayName]);
  }

  return (
    <div className="p-4 px-6">
      <h1 className="mt-4 text-4xl font-bold mb-4">Upcoming Events</h1>

      <div className="grid grid-flow-row grid-cols-7 gap-4 w-full h-full bg-white rounded-lg shadow-lg py-4">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className="p-2 w-auto h-20 bg-gray-100 rounded-lg flex items-center justify-center font-bold"
          >
            {day}
          </div>
        ))}
        {table.map((day, index) => (
          <Link href={day[0] === "" ? "" : `/day/${day[1]}`}>
            <div
              key={index}
              className="p-2 w-auto h-20 bg-gray-100 rounded-lg flex items-center justify-center font-bold hover:bg-gray-200 hover:scale-105 transition-transform relative"
            >
              {day[0]}
              <span className="absolute top-2 right-2 bg-blue-400 p-4 rounded-full font-mono h-4 w-4 flex items-center justify-center text-white text-center">
                <span>!</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

function getDaysInMonth(month: number, year: number): Date[] {
  const date = new Date(year, month, 1);
  const days: Date[] = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export default Month;
