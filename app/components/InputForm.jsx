import { Tooltip } from "@mui/material";
import Image from "next/image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";

export function InputForm({
  getList,
  list,
  generateDowloadableFile,
  properties,
  setProperties,
}) {
  return (
    <form
      className="flex flex-col gap-2 h-3/5 w-full px-2 items-center justify-center md:w-1/2 md:px-0 lg:w-1/4"
      onSubmit={(e) => getList(e)}
    >
      <div className="flex w-full justify-center items-center gap-2">
        <input
          type="text"
          className={`border-2 border-gray-300 w-full rounded-md p-2 text-black ${
            properties.fetchError && "border-red-500"
          }`}
          placeholder="ScoreSaber ID"
          required
          pattern="^[0-9]+$"
          onChange={(e) =>
            setProperties({ ...properties, userId: e.target.value })
          }
        />
        <Tooltip title="Your ScoreSaber ID can be found in the URL of your ScoreSaber profile. Example: in https://scoresaber.com/u/76561198115619538 the ID is 76561198115619538">
          <button type="button">
            <BiHelpCircle size={25} />
          </button>
        </Tooltip>
      </div>
      <select
        onChange={(e) =>
          setProperties({ ...properties, quantity: e.target.value })
        }
        className="border-2 border-gray-300 rounded-md p-2 text-black w-full"
      >
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="150">150</option>
      </select>
      <div className="w-full flex gap-2">
        <Slider
          range
          min={0}
          max={13}
          defaultValue={[0, 13]}
          onChange={(e) => {
            setProperties({ ...properties, minStars: e[0], maxStars: e[1] });
          }}
          marks={{
            0: "0",
            1: "1",
            2: "2",
            3: "3",
            4: "4",
            5: "5",
            6: "6",
            7: "7",
            8: "8",
            9: "9",
            10: "10",
            11: "11",
            12: "12",
            13: "13",
          }}
          className="mb-5 ml-1"
        />
        <AiFillStar />
      </div>

      <button
        className="border-2 border-gray-300 rounded-md p-2 w-full"
        type="submit"
      >
        Get List
      </button>
      {list.length > 0 && (
        <button
          className="border-2 border-gray-300 rounded-md p-2 w-full"
          onClick={generateDowloadableFile}
          type="button"
        >
          Generate File
        </button>
      )}
    </form>
  );
}
