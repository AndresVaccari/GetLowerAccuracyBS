import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";

export function SongList({ list }) {
  function getDaysAgo(score) {
    const daysAgo = Math.floor(
      (new Date() - new Date(score.score.timeSet)) / (1000 * 60 * 60 * 24)
    );

    if (daysAgo === 0) {
      return "Today";
    }

    if (daysAgo > 365) {
      return `${Math.floor(daysAgo / 365)} y ago`;
    }

    if (daysAgo > 30) {
      return `${Math.floor(daysAgo / 30)} m ago`;
    }

    if (daysAgo > 7) {
      return `${Math.floor(daysAgo / 7)} w ago`;
    }

    return `${daysAgo} d ago`;
  }

  return (
    <>
      {list.length > 0 && (
        <div className="flex flex-col gap-2 mt-4 overflow-y-scroll overflow-x-hidden grow w-full items-center">
          {list.map((score, index) => (
            <div
              className={`grid grid-cols-8 gap-2 w-full md:w-1/2 rounded-md p-2 border-2 border-gray-700`}
              style={{
                background: `linear-gradient(to left, rgba(36,36,36,.93), rgba(33,33,33)), url(${score.leaderboard.coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              key={index}
            >
              <div className="flex gap-2 justify-start col-span-2">
                <div className="flex flex-col items-center justify-center w-1/3">
                  <span className="text-white flex gap-1 items-center justify-center">
                    <BiWorld /> #{score.score.rank}
                  </span>
                  <span className="text-white flex gap-2 items-center justify-center">
                    {getDaysAgo(score)}
                  </span>
                </div>
                <Image
                  src={score.leaderboard.coverImage}
                  width={100}
                  height={100}
                  alt="cover"
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col col-span-4 gap-2">
                <span className="text-white">{score.leaderboard.songName}</span>
                <span className="text-white">
                  By {score.leaderboard.songAuthorName}
                </span>
                <span className="text-white">
                  {score.leaderboard.levelAuthorName}
                </span>
              </div>
              <div className="flex flex-col gap-2 items-end justify-center col-span-2">
                <span className="text-white flex gap-1 items-center justify-center">
                  {score.leaderboard.stars}
                  <AiFillStar />
                </span>
                <span className="text-white flex items-center justify-center">
                  {(
                    (score.score.baseScore / score.leaderboard.maxScore) *
                    100
                  ).toFixed(2) + "%"}
                </span>
                <span className="text-white flex items-center justify-center">
                  {score.leaderboard.difficulty.difficultyRaw.split("_")[1]}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
