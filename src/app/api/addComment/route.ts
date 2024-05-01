import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectToDataBase } from "@/lib/db";
import TyeeCalendarDay from "@/models/day";
import { getServerSession } from "next-auth";
import TyeeCalendarUser from "@/models/user";

const genAI = new GoogleGenerativeAI("AIzaSyBtAC6xPv5QIcsTWERMrN9aWgi3YtkX8sQ");

async function run(prompt: string): Promise<String> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (e) {
    //no need to log the error, it's just censorship
    return "False";
  }
}

export async function POST(req: Request, res: Response) {
  const { comment, event, day } = await req.json();
  const session = await getServerSession();
  if (!session) {
    return Response.json({ text: "Please sign in to comment" });
  }
  const user = await TyeeCalendarUser.findOne({ email: session.user.email });
  if (!user) {
    return Response.json({ text: "User not found" });
  }
  const dayFound = await TyeeCalendarDay.findOne({
    dayName: day,
  });
  if (!dayFound) {
    return Response.json({ text: "Day not found" });
  }
  const foundEvent = dayFound.events.find((e) => e.name === event);
  if (!foundEvent) {
    return Response.json({ text: "Event not found" });
  }
  const response = await run(
    `Please review this comment and reply "false" if this comment is inappropriate or spam. Otherwise, reply "true".\n\n**Comment:**\n${comment}`
  );
  if (response.replaceAll("\n", "").trim().trimEnd().toLowerCase() == "false") {
    return Response.json({ text: "Comment rejected" });
  } else {
    if (!foundEvent.comments) {
      foundEvent.comments = [];
    }
    foundEvent.comments.push({
      name: session?.user?.name,
      comment: comment,
    });
    dayFound.markModified("events");

    console.log(foundEvent.comments);
    //why does this save not work?

    await dayFound.save();
    return Response.json({ text: "Comment added" });
  }
}
