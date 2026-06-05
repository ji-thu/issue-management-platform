"use client";

import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    const res = await api.get("/issues");
    setIssues(res.data);
  };

  const total = issues.length;

  const open = issues.filter(
    (i: any) => i.status === "OPEN"
  ).length;

  const resolved = issues.filter(
    (i: any) => i.status === "RESOLVED"
  ).length;

  const high = issues.filter(
    (i: any) => i.priority === "HIGH"
  ).length;

  return (
    <div className="p-6">
        <button
  onClick={() => router.back()}
  className="mb-4 bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded text-white"
>
  ← Back
</button>
      <h1 className="text-4xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-4">
        <div className="border p-6 rounded-lg">
          <h2>Total Issues</h2>
          <p className="text-4xl">
            {total}
          </p>
        </div>

        <div className="border p-6 rounded-lg">
          <h2>Open Issues</h2>
          <p className="text-4xl">
            {open}
          </p>
        </div>

        <div className="border p-6 rounded-lg">
          <h2>Resolved</h2>
          <p className="text-4xl">
            {resolved}
          </p>
        </div>

        <div className="border p-6 rounded-lg">
          <h2>High Priority</h2>
          <p className="text-4xl">
            {high}
          </p>
        </div>
      </div>
    </div>
  );
}