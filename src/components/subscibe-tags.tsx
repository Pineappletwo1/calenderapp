"use client";

import { useState } from "react";

export default function UI() {
  const [tag, setTag] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div>
      <h1>Subscribe to a Tag</h1>
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Enter tag"
      />
      <button>Subscribe</button>
      {message && <p>{message}</p>}
    </div>
  );
}
