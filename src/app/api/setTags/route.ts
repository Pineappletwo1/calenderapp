import { connectToDataBase } from "@/lib/db";
import TyeeCalendarUser from "@/models/user";
import { getServerSession } from "next-auth";

export async function POST(req: Request, Res: Response) {
  const { tag, tagStatus } = await req.json();
  await connectToDataBase();
  const session = await getServerSession();
  if (!session) {
    return Response.json({ text: "You're not logged in" });
  }
  const user = await TyeeCalendarUser.findOne({ email: session?.user?.email });
  if (!user) {
    return Response.json({ text: "User not found" });
  }
  if (tagStatus == true) {
    user.tags.push(tag);
  } else {
    user.tags = user.tags.filter((t) => t !== tag);
  }
  await user.save();
  console.log(user.tags);
  return Response.json({ text: "Tag set" });
}
