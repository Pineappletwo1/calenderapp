"use client";

import { useState } from "react";

export default function UI() {
  const [tag, setTag] = useState("");
  async function addTags() {
    const tags = tag.split(" ");
    let tagsValid = true;
    tags.forEach((tag) => {
      if (tag.charAt(0) !== "#") {
        alert("Tags must start with a #");
        tagsValid = false;
      }
    });
    if (tagsValid) {
      const res = await fetch("/api/addTags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags }),
      });
      const data = await res.json();
      alert(data.text);
      window.location.reload();
    }
  }
  return (
    <div>
      <h2 className="mt-2 text-xl">
        Subscribe to tags (separate tag by space)
      </h2>
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="#chinese #coding"
        className="bg-gray-200 px-2 py-1 rounded mt-2"
      />
      <button
        className="px-2 py-1 bg-blue-400 text-white rounded-tr rounded-br"
        onClick={addTags}
      >
        Subscribe
      </button>
    </div>
  );
}
