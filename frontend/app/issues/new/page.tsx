"use client";

import { useState } from "react";
import { api } from "../../services/api";
import { useRouter } from "next/navigation";

export default function NewIssuePage() {

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    await api.post("/issues", {
      title,
      description,
      priority,
    });

    router.push("/issues");
  };

  return (
    <div className="p-6">
        <button
  onClick={() => router.back()}
  className="mb-4 bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded text-white"
>
  ← Back
</button>
      <h1 className="text-3xl font-bold mb-6">
        Create Issue
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <select
          className="border p-2"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
        >
          <option>LOW</option>
          <option>MEDIUM</option>
          <option>HIGH</option>
        </select>

        <button
          className="bg-green-600 px-4 py-2 rounded ml-4"
        >
          Create
        </button>
      </form>
    </div>
  );
}