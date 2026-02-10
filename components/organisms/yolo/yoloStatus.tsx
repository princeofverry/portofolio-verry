export function YoloStatus({
  status,
  detectionCount,
}: {
  status: string;
  detectionCount: number;
}) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded p-4 text-sm">
      {status}
      {detectionCount > 0 && (
        <span className="ml-3 text-emerald-400 font-mono">
          {detectionCount} objects
        </span>
      )}
    </div>
  );
}
