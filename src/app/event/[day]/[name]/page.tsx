import { connectToDataBase } from "@/lib/db";
import TyeeCalendarDay from "@/models/day";
import TyeeCalendarUser from "@/models/user";
import { getServerSession } from "next-auth";
import Tag from "@/components/Tag";
import Star from "@/components/Star";
import CommentSection from "@/components/CommentSection";

export default async function Event({ params }) {
  await connectToDataBase();
  const session = await getServerSession();
  const user = session
    ? await TyeeCalendarUser.findOne({ email: session.user.email })
    : null;
  const day = await TyeeCalendarDay.findOne({
    dayName: params.day.replaceAll("%20", " "),
  });
  if (!day) {
    return <div>404 Day not found</div>;
  }
  let event = day.events.find(
    (a) =>
      a.name.toLowerCase().trim().trimEnd() ===
      params.name.replaceAll("%20", " ").toLowerCase().trim().trimEnd()
  );
  if (!event) {
    return <div>404 Event not found</div>;
  }

  return (
    <div className="p-6 flex">
      <div className="w-2/3">
        <h1 className="text-2xl mt-4">
          {day.dayOfWeek}, {day.dayName}
        </h1>

        <div className="py-4">
          <div className="flex ">
            <h2 className="text-4xl">{event.name}</h2>
            <Star
              day={day.dayName}
              eventName={event.name}
              set={user?.starred?.some(
                (e) =>
                  e.day == params.day.replaceAll("%20", " ") &&
                  e.eventName == params.name.replaceAll("%20", " ")
              )}
              className="text-4xl text-yellow-400 ml-4"
            />
          </div>
          <p className="text-xl mt-2">{event.description}</p>
          <p className="text-xl mt-4">{event.location}</p>
          <p>
            From {event.startTime} to {event.endTime}
          </p>
          <div className="flex gap-2 mt-4">
            {event.tags.map((tag, i) => (
              <Tag
                key={i}
                tag={tag}
                i={i}
                tags={user ? user.tags : []}
                userExists={user ? true : false}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-1/3">
        <CommentSection
          day={day.dayName}
          eventName={event.name}
          comments={event.comments || []}
          className="mt-4 p-6 shadow-large rounded "
        />
      </div>
    </div>
  );
}
