/* eslint-disable @typescript-eslint/no-explicit-any */

const LoadMoreDataBtn = ({
  handleLoadMore,
}: {
  handleLoadMore: () => void;
}) => {
  return (
    <button
      onClick={handleLoadMore}
      className="text-dark-grey p-2 px-3 hover:bg-grey/30 text-center bg-grey w-full rounded-md flex items-center justify-center gap-2"
    >
      Load More
    </button>
  );
};

export default LoadMoreDataBtn;
