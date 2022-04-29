import React from 'react'

function Header() {
  return (
      <div className="space-y-5 pt-10 ">
          <h1 className="heading1 text-darkTextColor">Loan Application</h1>
          <h4 className="heading-info1 font-light leading-6 text-justify">
              Based on your portfolio evalution, you are eligible to a maximum
              loan amount of N 500,000, The principal and interest shall be
              rolled over at maturity at the prevailing terms and conditions, if
              the principal and accrued interest are not received at maturity.
              Rolled over will not be more than once.
          </h4>
          <h4 className="heading-info1 font-light leading-6 text-justify">
              <span className="font-normal"> Note:</span> The loan will range
              from 30 days – 90 days
          </h4>
      </div>
  );
}

export default Header