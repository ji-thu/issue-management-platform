"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../services/api";

export default function EditIssuePage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [priority, setPriority] =
    useState("MEDIUM");

  useEffect(() => {
    fetchIssue();
  }, []);

  const fetchIssue = async () => {
    try {
      const res = await api.get(
        `/issues/${id}`
      );

      setTitle(res.data.title);
      setDescription(
        res.data.description
      );
      setPriority(res.data.priority);
    } catch (error) {
      console.error(error);
    }
  };

  const updateIssue = async () => {
    try {
      await api.patch(
        `/issues/${id}`,
        {
          title,
          description,
          priority,
        }
      );

      alert(
        "Issue updated successfully!"
      );

      router.push(
        `/issues/${id}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-2xl">
        <button
  onClick={() => router.back()}
  className="mb-4 bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded text-white"
>
  ← Back
</button>
      <h1 className="text-3xl font-bold mb-6">
        Edit Issue
      </h1>

      <div className="space-y-4">

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border p-3 rounded text-white"
          placeholder="Title"
        />

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full border p-3 rounded text-white"
          rows={6}
        />

        <select
          value={priority}
          onChange={(e) =>
            setPriority(
              e.target.value
            )
          }
          className="border p-3 rounded text-white"
        >
          <option value="LOW">
            LOW
          </option>

          <option value="MEDIUM">
            MEDIUM
          </option>

          <option value="HIGH">
            HIGH
          </option>
        </select>

        <div>
          <button
            onClick={updateIssue}
            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-white"
          >
            Update Issue
          </button>
        </div>

      </div>
    </div>
  );
}