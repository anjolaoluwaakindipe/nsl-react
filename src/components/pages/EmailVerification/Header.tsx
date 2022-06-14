import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

function Header() {
    const navigate = useNavigate();
    return (
        <div className="space-y-5">
            <IoIosArrowBack
            className='cursor-pointer'
                size={32}
                onClick={() => navigate(-1)} />
            <h1 className="heading1 text-center">Email Verification</h1>
            <h4 className="heading-info1 text-center">
                Input the
                <span className='font-bold text-primaryColor' > FOUR (4)</span>
                digit code sent to your email address for
                verification.
            </h4>
        </div>
    );
}

export default Header