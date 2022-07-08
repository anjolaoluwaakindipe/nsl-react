import React from 'react';
import NavBarLayout from '../components/layout/NavBarLayout';

import { Header, LoanActivity, LoanBalanceDet, ZeroState } from '../components/pages/UserDashboard';

function Dashboard() {


    

    return (
        <NavBarLayout>
            <div className="bg-bgColor2 min-h-screen">
                <div className="md:max-w-6xl md:mx-auto w-full">
                    <Header />
                    <ZeroState/>
                    {/* <LoanBalanceDet /> */}
                    {/* <LoanActivity /> */}
                </div>
            </div>
        </NavBarLayout>
    );
}

export default Dashboard;
