import React from 'react'
import LoanStatCard from './LoanStatCard'

function LoanStatGroup() {
  return (
      <div className="w-full px-5 md:px-10 ">
          <div className="flex  justify-start md:justify-between items-center overflow-x-scroll space-x-10  md:overflow-auto scrollbar">
              <LoanStatCard title="Loan Applications" amount={56} />
              <LoanStatCard title="Loan Disbursed" amount={33} />
              <LoanStatCard title="Loan Repayed" amount={45} />
              <LoanStatCard title="Declined Loans" amount={10} />
              <LoanStatCard title="Reviewed Loans" amount={23} />
          </div>
      </div>
  );
}

export default LoanStatGroup