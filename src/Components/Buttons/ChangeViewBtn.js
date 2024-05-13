import { CiBoxList, CiGrid41 } from "react-icons/ci"

export const ChangeViewBtn =({onclick=()=>{}, view})=>{
    return(<div>
        <button onClick={onclick} className='text-[#4D4D4D] px-4 py-2 bg-[#E9F2EF] text-center text-sm border border-[#E9E9E9] rounded-lg w-fit'>{view === 'grid' || view ? <CiBoxList size={20}/> : <CiGrid41 size={20}/> }</button>
    </div>)
}