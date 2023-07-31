"use client";

import { useState } from "react";
import { SongList } from "./components/SongList";
import { InputForm } from "./components/InputForm";
import { LoadingComponent } from "./components/LoadingComponent";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import { image64 } from "@/public/image64";

export default function Home() {
  const [list, setList] = useState([]);
  const [properties, setProperties] = useState({
    minStars: 0,
    maxStars: 13,
    loading: false,
    quantity: 50,
    fetchError: false,
    userId: "",
  });

  async function getList(e) {
    e.preventDefault();
    setList([]);
    setProperties({ ...properties, loading: true, fetchError: false });

    try {
      const response = await fetch(
        `https://cors-anywhere-andresvaccari.onrender.com/https://scoresaber.com/api/player/${properties.userId}/scores?limit=1&sort=top`,
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
          `https://cors-anywhere-andresvaccari.onrender.com/https://scoresaber.com/api/player/${properties.userId}/scores?limit=50&sort=top&page=${i}`,
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
          score.leaderboard.stars >= properties.minStars &&
          score.leaderboard.stars <= properties.maxStars
      );

      scoreList.sort((score1, score2) => {
        const percentage1 =
          score1.score.baseScore / score1.leaderboard.maxScore;
        const percentage2 =
          score2.score.baseScore / score2.leaderboard.maxScore;
        return percentage1 - percentage2;
      });

      scoreList =
        scoreList.length > properties.quantity
          ? scoreList.slice(0, properties.quantity)
          : scoreList;

      setList(scoreList);
      setProperties({ ...properties, loading: false });
    } catch (error) {
      console.log(error);
      setProperties({ ...properties, loading: false, fetchError: true });
    }
  }

  function generateDowloadableFile() {
    const formatedList = {
      AllowDuplicates: true,
      playlistTitle: `Lower scores [${properties.minStars}⭐-${properties.maxStars}⭐]`,
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
    element.download = `lower_acc_${properties.minStars}_${properties.maxStars}.bplist`;
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
        properties={properties}
        setProperties={setProperties}
      />
      <LoadingComponent loading={properties.loading} />
      <SongList list={list} />
      <Footer list={list} />
    </main>
  );
}
