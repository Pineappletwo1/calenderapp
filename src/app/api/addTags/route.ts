import { connectToDataBase } from "@/lib/db";
import TyeeCalendarUser from "@/models/user";
import { getServerSession } from "next-auth";

export async function POST(req: Request, Res: Response) {
  const data = await req.json();
  console.log(data.tags);
  await connectToDataBase();
  const session = await getServerSession();
  if (!session) {
    return Response.json({ text: "You're not logged in" });
  }
  const user = await TyeeCalendarUser.findOne({ email: session?.user?.email });
  if (!user) {
    return Response.json({ text: "User not found" });
  }
  if (!data.tags) return Response.json({ text: "No tags provided" });
  data.tags.forEach((element) => {
    if (!user.tags.includes(element)) user.tags.push(element);
  });
  await user.save();
  console.log(user.tags);
  return Response.json({ text: "Tags set" });
}
