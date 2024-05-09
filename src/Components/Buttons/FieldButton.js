
export const FieldButton = ({ title, icon, extraClass = '', titleClass = '', onclick }) => {
    return (
        <button type="button" className={`rounded-md px-4 py-2 flex space-x-2 shadow-[0_0_14px_0_rgba(34,122,96,0.1)] ${extraClass} h-[40px] items-center`} onClick={onclick} >
            {icon}<span>{title}</span></button>
    )
}