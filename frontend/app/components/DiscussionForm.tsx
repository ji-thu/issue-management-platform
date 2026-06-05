"use client";

import { useState } from "react";

export default function DiscussionForm({
  onSubmit,
}: {
  onSubmit: (message: string) => Promise<void>;
}) {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!message.trim()) return;

    await onSubmit(message);
    setMessage("");
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-3">
        Add Discussion
      </h3>

      <textarea
        className="w-full border rounded p-3 text-white bg-gray-900"
        rows={4}
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
      />

      <button
        onClick={handleSubmit}
        className="mt-3 bg-blue-600 px-4 py-2 rounded text-white"
      >
        Submit
      </button>
    </div>
  );
}