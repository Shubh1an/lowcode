import moment from "moment";
import { BiUserCircle } from "react-icons/bi";
import { BsTable, BsViewList } from "react-icons/bs";

export const checkValidDate = (date) => {
  // 2024-05-13T12:21:48.200+00:00
  let isValid = moment(date, 'YYYY-MM-DD', true).isValid();
  if (!isValid) {
    isValid = moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ', true).isValid();
  }
  return isValid;
};

export const UserPill = ({ user }) => {
    console.log("User", user)
    let profile = user?.profile_image
    return (
        <div className="flex items-center gap-2 rounded-full bg-[#66CCFF] p-2 text-[#fff]">
            {profile ? <img src={profile} className='w-8 h-8 rounded-full' /> : <BiUserCircle className="w-6 h-6"/>}
            <span className="text-14">{user.name}</span>
        </div>
    )
}

export const TypePill = ({ type }) => {
    return (
        <div className="flex items-center gap-2 rounded-full bg-[#00C875] p-2 text-[#fff]">
            {type.toLowerCase() === "form" ? <BsTable /> : <BsViewList />}
            <span className="text-14">{type}</span>
        </div>
    )
}

export const formatValue = (value, header) => {
    if (typeof value === 'object') {
        if (header === "created_by") {
            return <UserPill user={value} />
        }
        return 'Custom Object';
    } else if (checkValidDate(value)) {
        return moment(value).format('DD/MM/YYYY');
    }
    else if(header === "page_type") {
        return <TypePill type={value} />
    }
     else {
        if (value?.length > 20) {
            return value.slice(0, 10) + '...' + value.slice(-5);
        } else {
            return value;
        }
    }
};
