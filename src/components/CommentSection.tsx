"use client";
import { useSession } from "next-auth/react";
import { useRef } from "react";

export default function CommentSection({
  comments,
  className,
  day,
  eventName,
}) {
  const inputRef = useRef(null);

  const { data: session } = useSession();
  if (!session) {
    return (
      <div className={className}>
        <h2>Sign in to comment</h2>
      </div>
    );
  }
  async function comment() {
    const data = await fetch("/api/addComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: inputRef?.current?.value,
        day,
        event: eventName,
      }),
    });
    const response = await data.json();
    if (response.text === "Comment added") {
      window.location.reload();
    } else {
      alert(response.text);
    }
  }
  return (
    <div className={className}>
      <h2 className="text-4xl mb-2">Comments</h2>
      {comments.map((comment, index) => {
        return (
          comment.name &&
          comment.comment && (
            <div key={index} className="bg-gray-200 p-2 rounded mt-1">
              <h3 className="text-gray-500">{comment.name}</h3>
              <p className="text-xl mt-2">{comment.comment}</p>
            </div>
          )
        );
      })}
      <input
        type="text"
        ref={inputRef}
        placeholder="Comment"
        className="bg-gray-200 px-2 py-1 rounded mt-2"
      />
      <button
        onClick={comment}
        className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
      >
        Comment
      </button>
    </div>
  );
}
