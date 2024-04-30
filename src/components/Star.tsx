"use client";
import { useState } from "react";

export default function Star({ day, eventName, className, set }) {
  const [isSet, setIsSet] = useState(set);
  async function setStar() {
    const res = await fetch("/api/setStar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ day, eventName, set: !isSet }),
    });
    console.log(eventName, day);
    const data = await res.json();
    if (data.text == "Star set") {
      setIsSet(!isSet);
    } else {
      alert(data.text);
    }
  }
  return (
    <span className={className} onClick={setStar} >
      {
        isSet ? "★" : "☆"
      }
    </span>
  );
}
