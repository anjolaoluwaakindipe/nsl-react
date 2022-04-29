import React from 'react'
import { Link } from 'react-router-dom';

function Form() {
  return (
      <form action="/" className="w-full py-20 space-y-16  text-darkTextColor">
          <div className="w-full md:w-1/2 border-0 border-b-2  border-underlineColor">
              <label htmlFor="cscsAccountNumber"></label>
              <input
                  type="text"
                  name="cscsAccountNumber"
                  id="Login__cscsAccountNumber"
                  className="outline-none pb-4  w-full"
                  placeholder="CSCS Account Number"
              />
          </div>
          <div className="w-full md:w-1/2  space-y-5">
              <div className="w-full border-0 border-b-2  border-underlineColor ">
                  <label htmlFor="password"></label>
                  <input
                      type="password"
                      name="password"
                      id="Login__password"
                      className="outline-none pb-4  border-0 "
                      placeholder="Password"
                  />
              </div>

              <div>
                  <Link className="text-accentColor" to={"/"}>
                      Forgot Password?
                  </Link>
              </div>
          </div>

          <div className=" w-full md:w-1/2 space-y-6">
              <button
                  className="w-full px-5 py-4 bg-primaryColor text-contColor rounded-lg cursor-pointer hover:shadow-sm hover:bg-accentColor duration-100 ease-in-out transition-all"
                  type="submit"
              >
                  Proceed
              </button>
          </div>
      </form>
  );
}

export default Form