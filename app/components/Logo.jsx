import Image from "next/image";

export default function Logo({ list }) {
  return (
    <>
      {!list.length > 0 && (
        <div className="flex flex-col gap-2 h-1/6 items-center justify-center md:h-1/6">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="rounded-xl"
          />
          <span className="text-white">Lower Accuracy BS</span>
          <span className="text-white">
            Get the lower accuracy Beat Saber songs on ScoreSaber
          </span>
        </div>
      )}
    </>
  );
}
