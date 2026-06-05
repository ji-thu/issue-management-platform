type Discussion = {
  id: string;
  message: string;
};

export default function DiscussionList({
  discussions,
}: {
  discussions: Discussion[];
}) {
  if (!discussions.length) {
    return (
      <p className="text-gray-400">
        No discussions yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {discussions.map((discussion) => (
        <div
          key={discussion.id}
          className="border rounded-lg p-3"
        >
          {discussion.message}
        </div>
      ))}
    </div>
  );
}