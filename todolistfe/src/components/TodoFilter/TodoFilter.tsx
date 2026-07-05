type Props = {
  keyword: string;
  completed: string;
  onKeywordChange: (value: string) => void;
  onCompletedChange: (value: string) => void;
  onSearch: () => void;
};

export default function TodoFilter({
  keyword,
  completed,
  onKeywordChange,
  onCompletedChange,
  onSearch,
}: Props) {
  return (
    <div className="mb-5 grid gap-3 sm:mb-6 md:grid-cols-[minmax(0,1fr)_180px_auto]">
      <input
        className="min-w-0 rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500 sm:px-4 sm:text-base"
        placeholder="Tìm kiếm theo tiêu đề..."
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />

      <select
        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500 sm:px-4 sm:text-base"
        value={completed}
        onChange={(e) => onCompletedChange(e.target.value)}
      >
        <option value="all">Tất cả</option>
        <option value="completed">Hoàn thành</option>
        <option value="uncompleted">Chưa hoàn thành</option>
      </select>

      <button
        onClick={onSearch}
        className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 md:w-auto sm:text-base"
      >
        Tìm kiếm
      </button>
    </div>
  );
}
