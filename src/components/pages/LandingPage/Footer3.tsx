import React from "react";


function Footer3() {
    return (
        <div className=" flex center text-center items-center grid grid-rows-3">
            <div className="grid grid-cols-6">
                <h1> Home</h1>
                <h1>Experience </h1>
                <h1>News</h1>
                <h1>About Us</h1>
                <h1>Jobs</h1>
                <h1>Contact</h1>
            </div>

            {/* social media */}
            <div className="grid grid-cols-3 pt-10 gap-7">
                <div>facebook</div>
                <div>twitter</div>
                <div>youtube</div>
            </div>


            <div className="pt-10">
                copyright 2022- NSL 24
            </div>
        </div>
    )
}

export default Footer3;