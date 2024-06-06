const { Link } = require('react-router-dom');
const { formatValue } = require('../../../Utility/utility');

const TableView = ({ data = { headers: [], cells: [] }, linkto }) => {
  const { headers, cells } = data;
  return (
    <div className="w-full flex flex-col overflow-auto px-4">
      <div className="w-full flex flex-row px-[2px] pt-[12px] sticky top-0 bg-[#fff]">
        {headers.map((header, index) => {
          return (
            <div
              className="w-full flex justify-center items-center text-base	font-medium py-2 border border-[#E9E9E9] overflow-hidden"
              key={index + '_heading'}
            >
              {header}
            </div>
          );
        })}
      </div>
      {cells.map((row, index) => {
        return (
          <Link to={`${linkto}=${row?.id}`} key={index + '_link'}>
            <div
              className={`w-full flex flex-row px-[2px] hover:bg-[#E9E9E9] cursor-pointer  ${row?.['type'] == 'defination' ? 'bg-[#E9E9E9]' : ''}`}
              key={index + '_cell'}
            >
              {headers.map((header, index) => {
                return (
                  <div
                    className={`w-full flex justify-center items-center text-base font-medium py-2 border border-[#E9E9E9]`}
                    key={index + '_cell'}
                  >
                    {formatValue(row[header], header)}
                  </div>
                );
              })}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TableView;
