type Props = {
  small: string;
  regular: string;
  desc: string;
  onClick: (imageUrl: string) => void;
};

const ImageCard: React.FC<Props> = ({ small, regular, desc, onClick }) => {
  const handleClick = (): void => {
    onClick(regular);
  };

  return (
    <div>
      <img
        src={small}
        alt={desc}
        onClick={handleClick}
        width="335"
        height="210"
      />
    </div>
  );
};

export default ImageCard;
