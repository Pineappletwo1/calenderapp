"use client";
import { useState } from "react";

export default function Tag({ tag, i, tags, userExists }) {
  const [isSet, setIsSet] = useState(tags.includes(tag));
  async function setTag(tagSetter) {
    const res = await fetch("/api/setTags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tagStatus: tagSetter, tag }),
    });
    const data = await res.json();
    if (data.text == "Tag set") {
      console.log("Tag set");
      setIsSet(tagSetter);
    } else {
      alert("something went wrong");
    }
  }
  return (
    <span
      key={i}
      className={`bg-gray-300  px-2 rounded text-xl ${isSet && "bg-green-300"}`}
      onClick={() => {
        if (userExists) {
          setTag(!isSet);
        } else {
          alert("You must be logged in to set tags");
        }
      }}
    >
      {tag}
    </span>
  );
}
