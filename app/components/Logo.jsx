export default function Logo({ list }) {
  return (
    <>
      {!list.length > 0 && (
        <div className="flex flex-col gap-2 h-20 items-center justify-center">
          <span className="text-white">Lower Accuracy BS</span>
          <span className="text-white">
            Get the lower accuracy Beat Saber songs on ScoreSaber
          </span>
        </div>
      )}
    </>
  );
}
