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
    day,
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
    try {
      await connectToDataBase();
      let foundDay = await TyeeCalendarDay.findOne({
        dayName: day.replaceAll("%20", " "),
      });
      if (foundDay === null) {
        return Response.json({ text: "Day not found" });
      } else {
        let event = {
          name: eventName,
          description: eventDescription,
          location: eventLocation,
          tags: eventTags.split(" "),
          startTime: startTime,
          endTime: endTime,
        };
        let duplicate = foundDay.events.find(
          (a) =>
            a.name.toLowerCase().trim().trimEnd() ===
            eventName.toLowerCase().trim().trimEnd()
        );
        if (duplicate !== undefined) {
          return Response.json({ text: "This event already exists" });
        }
        foundDay.events.push(event);
        await foundDay.save();
        return Response.json({ text: "Event created successfully" });
      }
    } catch (e) {
      console.log(e);
      return Response.json({ text: "Error creating event" });
    }
  } else {
    return Response.json({ text: "This event is innopropiate" });
  }
}
