import React from 'react'
import LoanBalanceCard from './LoanBalanceCard'

function LoanBalanceDet(){
    return (
        <div className='w-full px-5'>
            <div className='flex justify-start'>
                <LoanBalanceCard title="Loan Balance" amount={500000}/>
            </div> 

        </div>

    );
}

export default LoanBalanceDet;