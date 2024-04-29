"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CreateEvent({ day }) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventTags, setEventTags] = useState("");
  const { data: session } = useSession();
  async function handleSubmit(e) {
    e.preventDefault();
    const start = new Date(`1970-01-01T${startTime}:00Z`);
    const end = new Date(`1970-01-01T${endTime}:00Z`);
    if (start.getTime() > end.getTime()) {
      alert("Start time cannot be after end time");
      return;
    }
    let tags = eventTags.split(" ");
    let tagsValid = true;
    tags.forEach((tag) => {
      if (!tag.startsWith("#")) {
        tagsValid = false;
      }
    });
    if (!tagsValid) {
      alert("Tags must start with #");
      return;
    }
    const response = await fetch("/api/createEvent", {
      method: "POST",
      body: JSON.stringify({
        startTime: startTime,
        endTime: endTime,
        eventName: eventName,
        eventLocation: eventLocation,
        eventDescription: eventDescription,
        eventTags: eventTags,
        day,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    alert(data.text);
    window.location.reload();
  }

  return (
    <div className="w-full rounded-lg shadow-lg p-6 ">
      <h1 className="text-2xl mb-4">Create an Event</h1>
      {session ? (
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <span className="text-xl">From &nbsp;</span>
            <input
              type="time"
              placeholder="8:00"
              name="startTime"
              className="bg-gray-200 rounded px-2"
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
            <span>&nbsp; to &nbsp;</span>
            <input
              type="time"
              placeholder="8:00"
              name="endTime"
              className="bg-gray-200 rounded px-2 grow"
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div className="flex mt-4">
            <span className="text-xl">Event Name:&nbsp;</span>

            <input
              type="text"
              placeholder="Event Name"
              name="eventName"
              className="bg-gray-200 rounded text-lg px-2  w-4 grow"
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
          <div className="flex my-4">
            <span className="text-xl">Event Location: &nbsp;</span>
            <input
              type="text"
              placeholder="Event Location"
              name="eventLocation"
              className="bg-gray-200 rounded text-lg px-2 w-4 grow"
              onChange={(e) => setEventLocation(e.target.value)}
              required
            />
          </div>
          <span className="text-xl ">Event Description: &nbsp;</span>
          <textarea
            placeholder="Event Name"
            name="eventDescription"
            className="bg-gray-200 rounded text-lg p-2 mb-4 mt-4 h-16 w-full"
            onChange={(e) => setEventDescription(e.target.value)}
            required
          />
          <br />
          <span className="text-xl">Event Tags: &nbsp;</span>
          <input
            type="text"
            placeholder="#tag1 #tag2 #tag3"
            name="eventLocation"
            className="bg-gray-200 rounded text-lg px-2 mb-4"
            onChange={(e) => setEventTags(e.target.value)}
            required
          />
          <div className="flex gap-2 mb-4">
            {eventTags &&
              eventTags.split(" ").map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-lg rounded-sm px-2 "
                >
                  {tag}
                </span>
              ))}
          </div>
          <button
            type="submit"
            className="text-lg bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 transition-colors "
          >
            Create Event
          </button>
        </form>
      ) : (
        <p>You must be logged in to create an event</p>
      )}
    </div>
  );
}
