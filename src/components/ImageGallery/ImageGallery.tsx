import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { useAppSelector } from "../../redux/hooks";
import { selectImages } from "../../redux/images/selectors";
import { Image } from "../../redux/images/slice";

type Foo = {
  onOpenModal: (small: string) => void;
};

const ImageGallery: React.FC<Foo> = ({ onOpenModal }) => {
  const images = useAppSelector(selectImages) as Image[];

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
