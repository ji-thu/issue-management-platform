"use client";

import { useEffect, useState } from "react";
import { api } from "../services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";


interface Issue {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
}

export default function IssuesPage() {
    const router = useRouter();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] =
  useState("ALL");
  useEffect(() => {
    fetchIssues();
  }, []);
  const [priorityFilter, setPriorityFilter] =
  useState("ALL");

  const fetchIssues = async () => {
    try {
      const res = await api.get("/issues");

      console.log("FULL RESPONSE");
      console.log(res.data);

      setIssues(res.data);
    } catch (error) {
      console.error(error);
    }
  };
const filteredIssues = issues.filter(
  (issue: any) => {

    const matchesSearch =
      issue.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      issue.description
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      issue.status === statusFilter;

    const matchesPriority =
      priorityFilter === "ALL" ||
      issue.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  }
);

  return (
    <div className="p-6">
        <button
  onClick={() => router.back()}
  className="mb-4 bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded text-white"
>
  ← Back
</button>
      <h1 className="text-3xl font-bold mb-6">
        Issue Management
      </h1>
      <input
  type="text"
  placeholder="Search issues..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  className="w-full border rounded-lg p-3 mb-6 text-white"
/>
{filteredIssues.length === 0 && (
  <div className="text-gray-400 mb-4">
    No issues found.
  </div>
)}

<div className="flex gap-4 mb-6">

  <select
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(e.target.value)
    }
    className="border p-2 rounded "
  >
    <option value="ALL">All Status</option>
    <option value="OPEN">OPEN</option>
    <option value="IN_PROGRESS">IN_PROGRESS</option>
    <option value="RESOLVED">RESOLVED</option>
    <option value="CLOSED">CLOSED</option>
  </select>

  <select
    value={priorityFilter}
    onChange={(e) =>
      setPriorityFilter(e.target.value)
    }
    className="border p-2 rounded "
  >
    <option value="ALL">All Priority</option>
    <option value="LOW">LOW</option>
    <option value="MEDIUM">MEDIUM</option>
    <option value="HIGH">HIGH</option>
  </select>

</div>

      <div className="space-y-8">
  {filteredIssues.map((issue) => (
    <div key={issue.id}>
      <Link href={`/issues/${issue.id}`} className="block">
        <div className="border rounded-lg p-5 shadow hover:bg-gray-900 hover:border-blue-500 transition-all cursor-pointer">
          <h2 className="font-bold text-xl">
            {issue.title}
          </h2>

          <p className="mt-3">
            {issue.description}
          </p>

          <div className="mt-4">
            Status: {issue.status}
          </div>

          <div>
            Priority: {issue.priority}
          </div>
        </div>
      </Link>
    </div>
  ))}
</div>

      <div className="mt-6">
        <Link
          href="/issues/new"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white inline-block"
        >
          Create Issue
        </Link>
      </div>

    <div className="mt-5">
      <Link
  href="/dashboard"
  className="bg-purple-600 px-4 py-2 rounded"
>
  Dashboard
</Link>
</div>
      
    </div>
  );
}