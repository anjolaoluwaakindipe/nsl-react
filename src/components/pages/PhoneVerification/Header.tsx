import React from 'react'
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
  return (
      <div className="space-y-5">
          <IoIosArrowBack
          onClick={()=> navigate (-1)}
          size={32}
          className="cursor-pointer"/>
          <h1 className="heading1 text-center">Phone Number verification</h1>
          <h4 className="heading-info1 text-center">
              Input the 
              <span className='text-primaryColor font-bold'> FOUR (4)</span>
               digit code sent to your Phone Number for
              verification
          </h4>
      </div>
  );
}

export default Header