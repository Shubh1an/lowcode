import React, { useEffect, useState } from 'react'
import { getPageDetails } from '../../../Requests/form';
import { formatValue } from '../../../Utility/utility';
import { getFillPage } from '../../../Requests/pade_data';

const ListData = ({ newPageData }) => {
    const [page_detail_id, setPage_detail_id] = useState('');
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([])


    useEffect(() => {
        if (!page_detail_id) return
        console.log("Page ID:", page_detail_id)
        getFillPage(page_detail_id).then(res => {
            if (!res.data) return
            let { data } = res
            setHeaders(Object.keys(data[0]))
            setData(data)
        }).catch(err => {
            console.log("Error", err)
        })
    }, [page_detail_id])
    console.log("New Page Data", newPageData)
    getPageDetails(newPageData?.id).then((
        { data }
    ) => {
        console.log('get Page details ID', data);
        setPage_detail_id(data?.[0]?._id);
    })
    return (
        <div><Table headers={headers} data={data} /></div>
    )
}

const Table = ({ headers, data }) => {
    return (
        <div className="w-full h-full flex flex-col overflow-auto px-4">
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
            {data.length > 0 ? (
                data.map((row, index) => {
                    return (
                        <div
                            className="w-full flex flex-row px-[2px] hover:bg-[#E9E9E9] cursor-pointer"
                            key={index + '_cell'}
                            onClick={() => {
                            }}
                        >
                            {headers.map((header, index) => {
                                return (
                                    <div
                                        className="w-full flex justify-center items-center text-base	font-medium	py-2 border border-[#E9E9E9]"
                                        key={index + '_cell'}
                                    >
                                        {formatValue(row[header], header)}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })
            ) : (
                <div className="w-full flex flex-row px-[2px] py-[1px]">
                    <div className="w-full flex justify-center items-center text-base	font-medium	mx-[2px] py-2 bg-[#E9F2EF]">
                        No Records Found
                    </div>
                </div>
            )}
        </div>
    );
};
export default ListData