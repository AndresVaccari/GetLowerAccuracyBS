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

  const [minStars, setMinStars] = useState(0);
  const [maxStars, setMaxStars] = useState(13);

  const [fetchError, setFetchError] = useState(false);

  async function getList(e) {
    e.preventDefault();
    setList([]);
    setLoading(true);
    setFetchError(false);

    try {
      const response = await fetch(
        `https://web-production-55ce.up.railway.app/https://scoresaber.com/api/player/${userId}/scores?limit=50&sort=top`,
        {
          headers: {
            Accept: "application/json",
          },
          method: "GET",
        }
      );
      const data = await response.json();
      const lastPage = Math.ceil(data.metadata.total / 50);

      let scoreList = [];

      for (let i = 1; i <= lastPage; i++) {
        const response = await fetch(
          `https://web-production-55ce.up.railway.app/https://scoresaber.com/api/player/${userId}/scores?limit=50&sort=top&page=${i}`,
          {
            headers: {
              Accept: "application/json",
            },
            method: "GET",
          }
        );
        const data = await response.json();
        scoreList.push(...data.playerScores);
      }

      scoreList = scoreList.filter(
        (score) => score.leaderboard.ranked === true
      );

      scoreList = scoreList.filter(
        (score) =>
          score.leaderboard.stars >= minStars &&
          score.leaderboard.stars <= maxStars
      );

      scoreList.sort((score1, score2) => {
        const percentage1 =
          score1.score.baseScore / score1.leaderboard.maxScore;
        const percentage2 =
          score2.score.baseScore / score2.leaderboard.maxScore;
        return percentage1 - percentage2;
      });

      scoreList =
        scoreList.length > quantity ? scoreList.slice(0, quantity) : scoreList;

      setList(scoreList);

      setLoading(false);
    } catch (error) {
      setFetchError(true);
      setLoading(false);
    }
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
    element.download = "loweracc.bplist";
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
        minStars={minStars}
        setMinStars={setMinStars}
        maxStars={maxStars}
        setMaxStars={setMaxStars}
        fetchError={fetchError}
      />
      <LoadingComponent loading={loading} />
      <SongList list={list} />
      <Footer />
    </main>
  );
}
