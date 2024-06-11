import { BiUserCircle } from 'react-icons/bi';

export const UserPills = ({ user }) => {
  let profile = user?.profile_image;
  return (
    <span className="flex items-center justify-center gap-2 rounded-full bg-[#4691FF] p-2 text-[#fff] w-[40px]">
      {profile ? (
        <img src={profile} className="w-8 h-8 rounded-full" />
      ) : (
        <span className="text-14">{user.name}</span>
      )}
    </span>
  );
};
