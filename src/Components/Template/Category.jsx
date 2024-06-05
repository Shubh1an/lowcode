import React, { useContext, useState } from 'react';
// @ts-ignore
import Accordion from '../Accordion/CustomAccordion';
import { IoMdAddCircle } from 'react-icons/io';
import GlobalContext from '../../Context/Context';
import ShortModal from '../ShortModal/ShortModal';
export const Category = () => {
  // @ts-ignore
  const { category, setCategory } = useContext(GlobalContext);
  const [selectedCategory, setSelectedCategory] = useState([category[0]]);
  const [isopen, setIsOpen] = useState(false);
  const [addcategory, setAddCategory] = useState('');
  const [subcategory, setSubCategory] = useState(false);

  const onClose = () => {
    setIsOpen(!isopen);
    setSubCategory(false);
    setAddCategory('');
  };

  return (
    <div className="w-full">
      <div className="bg-[#fff] min-h-96 rounded-2xl mx-6 px-4 pt-4 pb-2 overflow-auto">
        <div className="font-Nunito_Sans font-bold content-center items-center flex">
          Category{' '}
          <span
            className="ml-4 cursor-pointer"
            onClick={() => setIsOpen(!isopen)}
          >
            <IoMdAddCircle fill="#000" size={30} />
          </span>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            {category.map((cat, key) => (
              <div className="rounded-md mb-2 shadow-lg mt-4" key={key}>
                <div
                  className={`flex font-bold justify-between rounded-xl items-center p-4 cursor-pointer ${cat?.category === selectedCategory[0]?.category && 'bg-[#000] text-white'}`}
                  onClick={() => setSelectedCategory([cat])}
                >
                  {cat?.category}
                </div>
              </div>
            ))}
          </div>
          <div className="w-1/2 shadow-xl border rounded-2xl">
            <div className="font-Nunito_Sans  font-bold content-center items-center flex m-5">
              Sub-Category{' '}
              <span
                className="ml-4 cursor-pointer"
                onClick={() => (setIsOpen(!isopen), setSubCategory(true))}
              >
                <IoMdAddCircle fill="#000" size={30} />
              </span>
            </div>
            <div className="w-1/2">
              {selectedCategory?.map(
                (
                  cat,
                  // @ts-ignore
                  key,
                ) =>
                  cat?.subCategory.map((subcat, key) => (
                    <div className="" key={key}>
                      <div className="flex font-semibold justify-between items-center px-4 pb-2 cursor-pointer">
                        {subcat}
                      </div>
                    </div>
                  )),
              )}
            </div>
          </div>
        </div>
      </div>
      <ShortModal
        onClose={() => onClose()}
        isOpen={isopen}
        tittle={`${subcategory ? 'Add Sub-Category' : 'Add Category'}`}
        tittleClass="font-bold text-[#4D4D4D]"
      >
        <div className="mt-4">
          <div className="min-w-96">
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-lg font-bold text-[#212121]"
              >
                {subcategory ? 'Sub-Category' : 'Category'}
              </label>
              <input
                onChange={(e) => setAddCategory(e.target?.value)}
                type="text"
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder={`${subcategory ? 'Enter Sub-Category' : 'Enter Category'}`}
                required
              />
            </div>
            <div className="">
              <div className="flex pt-4">
                <button
                  className="bg-[#000] text-[#fff] px-4 py-1 rounded-md mr-4 font-bold"
                  onClick={() => (
                    addcategory !== '' && subcategory
                      ? console.log(
                          category.map(
                            (cat) =>
                              cat.category === selectedCategory[0]?.category &&
                              cat.subCategory.push(addcategory),
                          ),
                        )
                      : setCategory([
                          ...category,
                          {
                            category: addcategory,
                            subCategory: [],
                          },
                        ]),
                    onClose()
                  )}
                >
                  Save
                </button>
                <button
                  className="text-[#000] px-4 py-1 rounded-md border border-[#000] font-bold"
                  onClick={() => onClose()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </ShortModal>
    </div>
  );
};
