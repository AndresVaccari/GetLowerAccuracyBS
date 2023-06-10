import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { AiFillStar } from "react-icons/ai";

export function InputForm({
  setUserId,
  getList,
  list,
  generateDowloadableFile,
  setQuantity,
  setMinStars,
  setMaxStars,
}) {
  return (
    <div className="flex flex-col gap-2 h-1/3 items-center justify-center">
      <input
        type="text"
        className="border-2 border-gray-300 rounded-md p-2 text-black"
        placeholder="ScoreSaber ID"
        onChange={(e) => setUserId(e.target.value)}
      />

      <select
        onChange={(e) => setQuantity(e.target.value)}
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
            setMinStars(e[0]);
            setMaxStars(e[1]);
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
        onClick={getList}
      >
        Get List
      </button>
      {list.length > 0 && (
        <button
          className="border-2 border-gray-300 rounded-md p-2 w-full"
          onClick={generateDowloadableFile}
        >
          Generate File
        </button>
      )}
    </div>
  );
}
