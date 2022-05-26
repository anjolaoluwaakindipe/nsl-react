import React from 'react'
import NavBarLayout from '../components/layout/NavBarLayout'
import { Description } from '../components/pages/TermLoan'
import ActiveLoanDetails from '../components/pages/TermLoan/ActiveLoanDetails'

function TermLoan() {
  return (
    <NavBarLayout>
<div className='w-full bg-bgColor2 '>
<div className='md:max-w-6xl md:mx-auto w-full px-5'>
    <h1 className="heading1">Term Loan</h1>
    <Description/>

    <ActiveLoanDetails/>

    <button className='btn1'>Repay Loan</button>
    

</div>
</div>
    </NavBarLayout>
  )
}

export default TermLoan