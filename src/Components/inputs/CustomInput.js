export const CustomInput = ({
  type = 'text',
  id = ' ',
  label = '',
  extraClasses = '',
  name = '',
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
      >
        {label}
      </label>
      {type === 'radio' ? (
        <div className="flex space-x-2">
          <div className="flex space-x-2">
            <input
              type={type}
              name={name}
              id={id}
              className={`appearance-none checked:border-[6px] border-2 border-[#A6A6A6] rounded-full w-5 h-5 checked:border-[#227A60] ${extraClasses}`}
            />
            <label
              htmlFor="checked-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Yes
            </label>
          </div>

          <div className="flex space-x-2">
            <input
              type={type}
              name={name}
              id={id}
              className={`appearance-none checked:border-[6px] border-2 border-[#A6A6A6] rounded-full w-5 h-5 checked:border-[#227A60]${extraClasses}`}
            />
            <label
              htmlFor="checked-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              No
            </label>
          </div>
        </div>
      ) : (
        <div>
          <input
            type={type}
            id={id}
            className={`block w-full font-semibold p-2 text-[#212121] border border-gray-300 rounded-lg bg-[#BDD7CF] text-base focus:ring-blue-500 focus:border-blue-500 ${extraClasses}`}
          />
        </div>
      )}
    </div>
  );
};
