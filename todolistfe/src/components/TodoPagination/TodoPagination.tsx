type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function TodoPagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="mt-5 grid grid-cols-2 items-center gap-2 sm:mt-6 sm:flex sm:justify-center sm:gap-3">
      <button
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
        className="rounded-lg border px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:text-base"
      >
        Trước
      </button>

      <span className="col-span-2 row-start-1 text-center text-sm text-gray-700 sm:col-span-1 sm:row-auto sm:text-base">
        Trang {page + 1} / {totalPages || 1}
      </span>

      <button
        disabled={page + 1 >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-lg border px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:text-base"
      >
        Sau
      </button>
    </div>
  );
}
