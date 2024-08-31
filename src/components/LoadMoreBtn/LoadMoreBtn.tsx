import css from "./LoadMoreBtn.module.css";

type Props = {
  loadMore: () => void;
};

const LoadMoreBtn: React.FC<Props> = ({ loadMore }) => {
  return (
    <div className={css.loadMoreWrapper}>
      <button className={css.loadMoreBtn} type="button" onClick={loadMore}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
