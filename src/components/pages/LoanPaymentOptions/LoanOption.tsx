import React from 'react'

interface LoanOptionProps {
    name: string;
    children: string;
}

function LoanOption({ name, children }: LoanOptionProps) {
    return (
        <div className="p-10 w-full bg-bgColor">
            <span className="flex">
                <span>
                    <input
                        className="hidden"
                        type="checkbox"
                        name={name}
                        id={"LoanOption__" + name}
                    />
                    <span></span>
                    <label htmlFor={"LoanOption__" + name}>{children}</label>
                </span>
            </span>
        </div>
    );
}


export default LoanOption