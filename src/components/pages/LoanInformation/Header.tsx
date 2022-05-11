import React from 'react'

function Header() {
    return (
        <form>
            <div className="space-y-5 pt-10 ">
                <h1 className="heading1 text-darkTextColor">Loan Infromation</h1>

            </div>


            
            <div className='grid   grid-rows-5 gap-x-2 pt-8 py-10'>



            <h3 className='font-bold text-justify'>
                Name:  <span className=' text-accentColor '>
                Oluwatosin Ajayi
                </span>
            </h3>


                <h3 className=" font-bold text-justify">
                    CSCS Account Number:  <span className="text-accentColor text-14px font-bold text-justify">
                      2312456738
                    </span>
                </h3>


                <h3 className=" font-bold text-justify">
                    Date Issued:  <span className="text-accentColor text-14px font-bold text-center text-justify">
                    04 May,1906
                </span>
                </h3>
                


                <h3 className=" font-bold text-justify">
                    Deadline: <span className="text-accentColor text-14px font-bold text-justify">
                    04 December,1906
                </span>
                </h3>
                



                <h3 className=" font-bold text-justify">
                    Loan Type:  <span className="text-accentColor text-14px font-bold text-justify">
                    Type A
                </span>
                </h3>
                

            </div>





        </form>




    );
}

export default Header