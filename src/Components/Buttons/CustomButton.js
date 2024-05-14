export const CustomButton = ({
  title,
  extraClass = '',
  titleClass = '',
  onclick,
}) => {
  return (
    <div>
      <button
        type="button"
        className={`rounded-md px-4 py-2 border  ${extraClass}`}
        onClick={onclick}
      >
        {title}
      </button>
    </div>
  );
};
