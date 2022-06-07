import React from 'react'

function Header() {
  return (
      <div className="space-y-5">
          <h1 className="heading1 text-center">Email Verification</h1>
          <h4 className="heading-info1 text-center">
              Input the four digit code sent to your email address for
              verification.
          </h4>
      </div>
  );
}

export default Header