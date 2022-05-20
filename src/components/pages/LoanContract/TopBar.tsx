import React from 'react'
import { FaAngleLeft } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';



function TopBar() {
  return (
      <div className="w-full flex justify-between ">
         <Link to="/dashboard">
            <FaAngleLeft className="text-2xl cursor-pointer" />
            </Link>

            <Link to = "/dashboard">
              
          <IoMdClose className="text-2xl cursor-pointer" />

            </Link>
      </div>
  );
}

export default TopBar