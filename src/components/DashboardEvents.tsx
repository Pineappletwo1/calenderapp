"use client";
import { useState } from "react";
import Link from "next/link";

export default function Events({ days }) {
  const [allEvents, setAllEvents] = useState(true);
  const [starredEvents, setStarredEvents] = useState(true);
  const [showTags, setShowTags] = useState(true);
  let showDays = days.filter(
    (day) => allEvents || (day.star && starredEvents) || (day.tag && showTags)
  );
  return (
    <div>
      <div className="flex ">
        <h2 className="text-lg mr-2">All events this month</h2>
        <input
          type="checkbox"
          checked={allEvents}
          onChange={() => setAllEvents(!allEvents)}
        />
        <h2 className="ml-4 mr-2 text-lg">Starred Events</h2>
        <input
          type="checkbox"
          checked={starredEvents}
          onChange={() => setStarredEvents(!starredEvents)}
        />
        <h2 className="ml-4 mr-2 text-lg">Show Tags</h2>
        <input
          type="checkbox"
          checked={showTags}
          onChange={() => setShowTags(!showTags)}
        />
      </div>
      {showDays.map((day, index) => {
        return (
          <div className="mt-4" key={index}>
            <h1 className="text-3xl mb-2">{day.dayName}</h1>
            {day.events.length === 0 && <p>No events</p>}
            {day.events.map((event) => {
              return (
                <div className="bg-gray-200 py-1 px-2 text-lg rounded mt-4 w-1/2 hover:bg-gray-300 transition-all duration-300">
                  <Link href={`/event/${day.dayName}/${event.name}`}>
                    <h2>
                      {event.name} - From {event.startTime} to {event.endTime}.
                    </h2>
                  </Link>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
