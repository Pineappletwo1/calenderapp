import { getServerSession } from "next-auth";
import TyeeCalendarUser from "@/models/user";
import { connectToDataBase } from "@/lib/db";
import TyeeCalendarDay from "@/models/day";

export async function POST(req: Request, res: Response) {
  await connectToDataBase();
  const session = await getServerSession();
  if (!session) {
    return Response.json({ text: "You're not logged in" });
  }
  const user = await TyeeCalendarUser.findOne({ email: session?.user?.email });
  if (!user) {
    return Response.json({ text: "User not found" });
  }
  const { set, day, eventName } = await req.json();
  const dayDoc = await TyeeCalendarDay.findOne({ dayName: day });
  if (!dayDoc) {
    return Response.json({ text: "Day not found" });
  }
  if (!dayDoc.events.find((e) => e.name == eventName)) {
    return Response.json({ text: "Event not found" });
  }
  user.starred.push({ day: day, eventName: eventName, set: set });
  if (!set) {
    user.starred = user.starred.filter(
      (e) => e.day !== day && e.eventName !== eventName
    );
  }
  console.log(user.starred);
  await user.save();
  return Response.json({ text: "Star set" });
}
