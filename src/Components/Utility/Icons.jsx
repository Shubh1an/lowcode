import React from 'react';
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlinePhone,
} from 'react-icons/ai';
import { BiText } from 'react-icons/bi';
import { BsMap } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { MdPeopleAlt } from 'react-icons/md';

const Icons = ({ name }) => {
  switch (name) {
    case 'AiOutlineCalendar':
      return <AiOutlineCalendar />;
    case 'AiOutlineClockCircle':
      return <AiOutlineClockCircle />;
    case 'AiOutlinePhone':
      return <AiOutlinePhone />;
    case 'HiOutlineMail':
      return <HiOutlineMail />;
    case 'BsMap':
      return <BsMap />;
    case 'MdPeopleAlt':
      return <MdPeopleAlt />;
    case 'BiText':
      return <BiText />;
    case 'User':
      return <MdPeopleAlt />;
    default:
      return <BiText />;
  }
};

//

export default Icons;
