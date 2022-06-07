import React from "react";

function EmptyStatus() {
    return (
        <div className="md:p-5 p-5 w-full gap-10 flex justify-center italic">
            <h3>
            <img
                    src="assets/emptynote.svg"
                    alt="no loans available "
                    className="object-contain w-50 md:w-50 md:px-10  pb-5  "
                   
                />
                 you don't have any pending requests</h3>
        </div>
    );
}

export default EmptyStatus;
