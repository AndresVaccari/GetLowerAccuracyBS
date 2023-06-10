import Image from "next/image";
import { AiFillStar } from "react-icons/ai";

export function SongList({ list }) {
  return (
    <>
      {list.length > 0 && (
        <div className="flex flex-col gap-2 mt-4 h-2/3 overflow-y-scroll w-full items-center">
          {list.map((score, index) => (
            <div
              className="grid grid-cols-6 gap-2 w-1/2 rounded-md p-2 bg-gray-800"
              key={index}
            >
              <Image
                src={score.leaderboard.coverImage}
                width={100}
                height={100}
                alt="cover"
                className="rounded-md"
              />
              <div className="flex flex-col col-span-4 gap-2">
                <span className="text-white">{score.leaderboard.songName}</span>
                <span className="text-white">
                  {score.leaderboard.songAuthorName}
                </span>
              </div>
              <div className="flex flex-col gap-2 align-bottom">
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
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
