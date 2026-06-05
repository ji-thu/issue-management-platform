"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "../../services/api";
import DiscussionList from "../../components/DiscussionList";
import DiscussionForm from "../../components/DiscussionForm";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function IssueDetailsPage() {
    const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [issue, setIssue] = useState<any>(null);
  const [analysis, setAnalysis] = useState("");
const [loadingAnalysis, setLoadingAnalysis] = useState(false);
const [discussions, setDiscussions] = useState([]);
const [status, setStatus] = useState("");

  useEffect(() => {
    if (id) {
      fetchIssue();
      fetchDiscussions();
    }
  }, [id]);

  const fetchIssue = async () => {
    try {
      const res = await api.get(`/issues/${id}`);
      console.log(res.data);
      setIssue(res.data);
      setStatus(res.data.status);
    } catch (error) {
      console.error(error);
    }
  };

  const addDiscussion = async (message: string) => {
  await api.post("/discussions", {
    issueId: id,
    message,
  });

  fetchDiscussions();
};
const deleteIssue = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this issue?"
  );

  if (!confirmed) return;

  try {
    await api.delete(
      `/issues/${id}`
    );

    router.push("/issues");
  } catch (error) {
    console.error(error);
  }
};

const generateAnalysis = async () => {
  try {
    setLoadingAnalysis(true);

    const res = await api.post(
      `/analysis/${id}`
    );

    setAnalysis(res.data.analysis);
  } catch (error) {
    console.error(error);
  } finally {
    setLoadingAnalysis(false);
  }
};

const fetchDiscussions = async () => {
  try {
    const res = await api.get(`/discussions/${id}`);
    setDiscussions(res.data);
  } catch (error) {
    console.error(error);
  }
};

const updateStatus = async () => {
  try {
    await api.patch(
      `/issues/${id}/status`,
      {
        status,
      }
    );

    fetchIssue();
  } catch (error) {
    console.error(error);
  }
};

  if (!issue) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
        <button
  onClick={() => router.back()}
  className="mb-4 bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded text-white"
>
  ← Back
</button>
      <h1 className="text-4xl font-bold mb-6">
        {issue.title}
      </h1>

      <div className="border rounded-lg p-6">
        <p className="mb-4">{issue.description}</p>

        <p>Status: {issue.status}</p>
        <p>Priority: {issue.priority}</p>
      </div>
      <div className="mt-4">
  <label>Status</label>

  <div className="flex gap-2 mt-2">
    <select
      value={status}
      onChange={(e) =>
        setStatus(e.target.value)
      }
      className="border p-2 rounded text-white"
    >
      <option value="OPEN">
        OPEN
      </option>

      <option value="IN_PROGRESS">
        IN_PROGRESS
      </option>

      <option value="RESOLVED">
        RESOLVED
      </option>

      <option value="CLOSED">
        CLOSED
      </option>
    </select>

    <button
      onClick={updateStatus}
      className="bg-blue-600 px-4 py-2 rounded"
    >
      Update
    </button>
  </div>
</div>
<Link
  href={`/issues/edit/${id}`}
  className="bg-yellow-600 hover:bg-yellow-700 px-4 py-3 rounded text-white mt-5 mr-2"
>
  Edit Issue
</Link>
<button
  onClick={deleteIssue}
  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white mt-5"
>
  Delete Issue
</button>
      <div className="mt-6">
  <button
  onClick={generateAnalysis}
  disabled={loadingAnalysis}
  className={`px-4 py-2 rounded text-white ${
    loadingAnalysis
      ? "bg-gray-500 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700"
  }`}
>
  {loadingAnalysis
    ? "Analyzing..."
    : "Generate AI Analysis"}
</button>
{loadingAnalysis && (
  <div className="mt-4 text-yellow-400">
    Generating AI analysis...
  </div>
)}
</div>
{analysis && (
  <div className="mt-6 border rounded-lg p-4">
    <h2 className="text-2xl font-bold mb-4">
      AI Analysis
    </h2>

    <pre className="whitespace-pre-wrap">
      {analysis}
    </pre>
  </div>
)}

<h2 className="text-2xl font-bold mt-8 mb-4">
  Discussions
</h2>

<DiscussionList discussions={discussions} />

<DiscussionForm onSubmit={addDiscussion} />
    </div>
  );
}