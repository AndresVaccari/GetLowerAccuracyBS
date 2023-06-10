export function InputForm({
  setUserId,
  getList,
  list,
  generateDowloadableFile,
  quantity,
  setQuantity,
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
