import { formatValue } from '../../Utility/utility';

const Table = ({ headers, data, onClick }) => {
  return (
    <table className="min-w-full bg-white text-sm text-left rtl:text-right text-[#212121] dark:text-gray-400 ">
      <thead className="min-w-full bg-white">
        <tr className="border-b">
          <td className="px-2 py-3">
            <input type="checkbox" />
          </td>
          {headers?.map((header, index) => {
            return (
              <th className="p-2" key={index + '_heading'}>
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 ? (
          data?.map((row, index) => {
            if (row.length == 0) return null;
            return (
              <tr
                key={index + '_cell'}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                onClick={() => {
                  console.log('object', row);
                  onClick(row);
                }}
              >
                <td className="px-2 py-3">
                  <input type="checkbox" />
                </td>
                {headers.map((header, index) => {
                  return (
                    <>
                      <td className="px-2 py-3 " key={index + '_cell'}>
                        {formatValue(row[index]?.value || '--', header)}
                      </td>
                    </>
                  );
                })}
              </tr>
            );
          })
        ) : (
          <div className="w-full flex flex-row px-[2px] py-[1px]">
            <div className="w-full flex justify-center items-center text-base	font-medium	mx-[2px] py-2 bg-[#FCF9EE]">
              No Records Found
            </div>
          </div>
        )}
      </tbody>
    </table>
  );
};
export default Table;
