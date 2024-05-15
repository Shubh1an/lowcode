import moment from "moment";

export const checkValidDate = (date) => {
    // 2024-05-13T12:21:48.200+00:00
    let isValid = moment(date, 'YYYY-MM-DD', true).isValid();
    if (!isValid) {
        isValid = moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ', true).isValid();
    }
    return isValid;
};

export const UserPill = ({ user }) => {
    return (
        <div className="flex items-center gap-2 rounded-full bg-[#227A60] p-2 text-[#fff]">
            <img src={user?.profile_image} className='w-8 h-8 rounded-full' />
            <span className="text-14">{user.name}</span>
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
    } else {
        if (value.length > 20) {
            return value.slice(0, 10) + '...' + value.slice(-5);
        } else {
            return value;
        }
    }
};