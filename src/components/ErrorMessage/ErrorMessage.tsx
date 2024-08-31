import css from "./ErrorMessage.module.css";
import { selectError } from "../../redux/images/selectors";
import { useSelector } from "react-redux";

const ErrorMessage = () => {
  const error = useSelector(selectError);

  return (
    <div className={css.errorMessage}>
      {error
        ? `${error}, please try again!`
        : "An unknown error occured. Please try again!"}
    </div>
  );
};

export default ErrorMessage;
