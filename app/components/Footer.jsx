export default function Footer({ list }) {
  if (list.length > 0) return null;

  return (
    <div className="flex flex-col gap-2 h-20 justify-center items-center absolute bottom-0 w-full bg-gray-800">
      <span className="text-white">
        Made by{" "}
        <a href="https://github.com/AndresVaccari" className="text-blue-500">
          Andres Vaccari
        </a>
      </span>
      <span className="text-white">
        Source code{" "}
        <a
          href="https://github.com/AndresVaccari/GetLowerAccuracyBS "
          className="text-blue-500"
        >
          here
        </a>
      </span>
    </div>
  );
}
