import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectImages } from "../../redux/images/selectors";

type Foo = {
  onOpenModal: (small: string) => void;
};

interface Images {
  id: string;
  description: string;
  urls: {
    small: string;
    regular: string;
  };
}

const useAppSelector: (selector: (state: RootState) => unknown) => unknown =
  useSelector;

const ImageGallery: React.FC<Foo> = ({ onOpenModal }) => {
  const images = useAppSelector(selectImages) as Images[];

  return (
    <ul className={css.galleryList}>
      {images.map((image) => (
        <li key={image.id} className={css.galleryItem}>
          <ImageCard
            small={image.urls.small}
            desc={image.description}
            regular={image.urls.regular}
            onClick={onOpenModal}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
