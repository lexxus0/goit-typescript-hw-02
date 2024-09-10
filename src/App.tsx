import { fetchImages } from "./redux/images/operations";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import Loader from "./components/Loader/Loader";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import SearchBar from "./components/SearchBar/SearchBar";
import {
  selectError,
  selectImages,
  selectIsLoading,
} from "./redux/images/selectors";
import { clearImages } from "./redux/images/slice";
import { Image } from "./redux/images/slice";

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [settedImage, setSettedImage] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const galleryRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const images = useAppSelector(selectImages) as Image[];
  const error = useAppSelector(selectError) as string | null;
  const isLoading = useAppSelector(selectIsLoading) as boolean;

  useEffect(() => {
    if (!query) return;

    dispatch(fetchImages({ query, page }));
  }, [query, page, dispatch]);

  const onSearch = (searchedValue: string): void => {
    setQuery(searchedValue);
    setPage(1);

    dispatch(clearImages());
    dispatch(fetchImages({ query: searchedValue, page: 1 }));
  };

  const loadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const onOpenModal = (small: string): void => {
    setSettedImage(small);
    setModalIsOpen(true);
  };

  const onCloseModal = (): void => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSearch={onSearch} />
      {error && <ErrorMessage />}
      {isLoading && page === 1 && <Loader />}
      <div ref={galleryRef}>
        <ImageGallery onOpenModal={onOpenModal} />
      </div>
      {isLoading && page > 1 && <Loader />}
      {images.length > 0 && !isLoading && <LoadMoreBtn loadMore={loadMore} />}
      <ImageModal
        isOpen={modalIsOpen}
        onClose={onCloseModal}
        small={settedImage}
      />
    </div>
  );
};

export default App;
