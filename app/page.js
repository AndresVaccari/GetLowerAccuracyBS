"use client";

import { useState } from "react";
import { SongList } from "./components/SongList";
import { InputForm } from "./components/InputForm";
import { LoadingComponent } from "./components/LoadingComponent";
import Footer from "./components/Footer";
import Logo from "./components/Logo";

export default function Home() {
  const [userId, setUserId] = useState("");

  const [list, setList] = useState([]);

  const [loading, setLoading] = useState(false);

  const [quantity, setQuantity] = useState(50);

  async function getList() {
    setList([]);

    setLoading(true);

    const response = await fetch(
      `https://scoresaber.com/api/player/${userId}/scores?limit=50&sort=top`
    );
    const data = await response.json();
    const lastPage = Math.ceil(data.metadata.total / 50);

    let scoreList = [];

    for (let i = 1; i <= lastPage; i++) {
      const response = await fetch(
        `https://scoresaber.com/api/player/${userId}/scores?limit=50&sort=top&page=${i}`
      );
      const data = await response.json();
      scoreList.push(...data.playerScores);
    }

    scoreList = scoreList.filter((score) => score.leaderboard.ranked === true);
    scoreList.sort((score1, score2) => {
      const percentage1 = score1.score.baseScore / score1.leaderboard.maxScore;
      const percentage2 = score2.score.baseScore / score2.leaderboard.maxScore;
      return percentage1 - percentage2;
    });

    scoreList =
      scoreList.length > quantity ? scoreList.slice(0, quantity) : scoreList;

    setList(scoreList);

    setLoading(false);

    console.log(scoreList);
  }

  function generateDowloadableFile() {
    const formatedList = {
      AllowDuplicates: false,
      playlistTitle: "Lower Scores",
      playlistAuthor: "Andres Vaccari",
      image:
        "base64,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",
      songs: list.map((score) => {
        return {
          hash: score.leaderboard.songHash,
          difficulties: [
            {
              characteristic: "Standard",
              name: score.leaderboard.difficulty.difficultyRaw.split("_")[1],
            },
          ],
        };
      }),
    };

    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(formatedList)], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "playlist.bplist";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center bg-black">
      <Logo list={list} />
      <InputForm
        generateDowloadableFile={generateDowloadableFile}
        getList={getList}
        list={list}
        setUserId={setUserId}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <LoadingComponent loading={loading} />
      <SongList list={list} />
      <Footer />
    </main>
  );
}
