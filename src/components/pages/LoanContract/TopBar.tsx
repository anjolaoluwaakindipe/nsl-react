import React from 'react'
import { FaAngleLeft } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

function TopBar() {
  return (
      <div className="w-full flex justify-between ">
          <FaAngleLeft className="text-2xl cursor-pointer" />
          <IoMdClose className="text-2xl cursor-pointer" />
      </div>
  );
}

export default TopBar