import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectToDataBase } from "@/lib/db";
import TyeeCalendarDay from "@/models/day";

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

export async function POST(Req: Request, Res: Response) {
  const {
    startTime,
    endTime,
    eventName,
    eventDescription,
    eventLocation,
    eventTags,
  } = await Req.json();
  console.log(
    startTime,
    endTime,
    eventName,
    eventDescription,
    eventLocation,
    eventTags
  );
  const prompt = `Please review the details of this event:\n\n**Event Details:**\n- **Name:** ${eventName}\n- **Location:** ${eventLocation}\n- **Start Time:** ${startTime}\n- **End Time:** ${endTime}\n- **Description:** ${eventDescription}\n- **Tags:** ${eventTags}\n\nIf you believe this event is inappropriate or spam, reply false and a reason. Otherwise, if everything looks good, simply respond with 'true'.`;
  const response = await run(prompt);
  console.log(response);
  if (response.toLowerCase().trim().trimEnd().replace("\n", "") === "true") {
    return Response.json({ text: "Event created successfully" });
  } else {
    return Response.json({ text: "This event is innopropiate" });
  }
}
