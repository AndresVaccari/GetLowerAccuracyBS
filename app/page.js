"use client";

import { useState } from "react";
import { SongList } from "./components/SongList";
import { InputForm } from "./components/InputForm";
import { LoadingComponent } from "./components/LoadingComponent";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import { image64 } from "@/public/image64";

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
        `https://web-production-55ce.up.railway.app/https://scoresaber.com/api/player/${userId}/scores?limit=1&sort=top`,
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
      AllowDuplicates: true,
      playlistTitle: `Lower scores [${minStars}⭐-${maxStars}⭐]`,
      playlistAuthor: "https://github.com/AndresVaccari/GetLowerAccuracyBS",
      image: `base64,${image64}`,
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
    element.download = `lower_acc_${minStars}_${maxStars}.bplist`;
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
      <Footer list={list} />
    </main>
  );
}
