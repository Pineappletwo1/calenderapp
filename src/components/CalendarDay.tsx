"use client";
import { useState, useEffect } from "react";

export default function ({ index, day }) {
  const [show, setShow] = useState(false);
  return (
    <div
      key={index}
      className="p-2 w-auto h-20 bg-blue-100 rounded-lg flex items-center justify-center font-bold hover:bg-blue-200 hover:scale-105 transition-transform relative"
      onClick={() => setShow(true)}
    >
      {day}
      <span className="absolute top-2 right-2 bg-blue-400 p-4 rounded-full font-mono h-4 w-4 flex items-center justify-center text-white text-center">
        <span>!</span>
      </span>
    </div>
  );
}
