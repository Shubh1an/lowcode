
export const FieldButton = ({ title, icon, extraClass = '', titleClass = '' ,onclick}) => {
    return (
    <div>
        <button type="button" className={`rounded-md px-4 py-2 flex space-x-2 ${extraClass}`} onClick={onclick} >
            <img src={icon} alt="icon"/><span>{title}</span></button>
    </div>    
    )
}