import React from "react";

function DefaultLayout({ children }: { children: JSX.Element }) {
    return (
        <div className="bg-bgColor md:py-32 min-h-screen">
            <div className="bg-contColor max-w-5xl mx-auto py-20 px-10 md:py-20 md:px-20 min-h-screen md:min-h-0">
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;
