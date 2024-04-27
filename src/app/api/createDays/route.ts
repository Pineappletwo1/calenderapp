import { getServerSession } from "next-auth";
import TyeeCalendarDay from "../../../models/day";
import { connectToDataBase } from "../../../lib/db";

export async function GET(req: Request) {
  const session = await getServerSession();
  if (session?.user?.email !== "lockemaximus@yahoo.com") {
    console.log("intruder alert");
    return new Response("Unauthorized", { status: 401 });
  } else {
    await connectToDataBase();
    console.log("adsf");
    var tomorrow = new Date();
    let days = [];
    for (let i = 0; i < 365; i++) {
      tomorrow.setDate(tomorrow.getDate() + 1);
      let info = tomorrow.toString().split(" ");
      days.push({
        dayOfWeek: info[0],
        monthYear: info[1] + " " + info[3],
        dayName: info[1] + " " + info[2] + " " + info[3],
      });
    }

    for (let day of days) {
      console.log(day);
      const newDay = new TyeeCalendarDay({
        dayOfWeek: day.dayOfWeek,
        monthYear: day.monthYear,
        dayName: day.dayName,
      });
      await newDay.save();
    }
    return Response.json({ message: "Days created" });
  }
}
