const Footer = ({ handleFormSubmit }) => {
  return (
    <div className="w-full h-[60px] border-t-[1px] border-[#E9E9E9]">
      <div className="flex justify-start items-center h-full py-4">
        <button
          className="bg-[#000] text-[#fff] px-4 py-1 rounded-md mx-4 font-bold"
          onClick={handleFormSubmit}
        >
          Save
        </button>
        <button className="text-[#000] px-4 py-1 rounded-md border border-[#000] font-bold">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Footer;
