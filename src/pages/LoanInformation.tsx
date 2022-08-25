// layout
import DefaultLayout from "../components/layout/DefaultLayout";

//components
import { AiOutlineLoading } from "react-icons/ai";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
    Header,
    Information,
    TopBar,
} from "../components/pages/LoanInformation";
import { Loan } from "../typings";
import { loanRequests } from "../services/requests/loanRequests";
import { pendingLoanQueryKey } from "../state/react-query/keys";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { loanSelector } from "../state/redux/loanSlice";
import { authSelector } from "../state/redux/authSlice";

function LoanInformation() {
    const { applicationreference } = useParams<{
        applicationreference: string;
    }>();

    const { user } = useSelector(authSelector);
    const pendingLoan = useQuery<Loan, Error>(pendingLoanQueryKey(), () => {
        return loanRequests.getALoan(applicationreference!);
    });

    const [invalidLoan, setInvalidLoan] = useState(false);

    useEffect(() => {
        if (pendingLoan.isSuccess) {
            console.log(pendingLoan.data.customerNo)
            if (
                !user ||
                (user && pendingLoan.data.customerNo !== user.customerNo)
            ) {
                setInvalidLoan(true);
            }
        }
    }, [pendingLoan.data, user]);

    return (
        <DefaultLayout>
            <>
                <TopBar />
                <Header status={pendingLoan.data?.status || ""} />
                {invalidLoan ? (
                    <div className="py-44 w-full justify-center items-center flex text-primaryColor">
                        Loan is invalid
                    </div>
                ) : pendingLoan.isLoading ? (
                    <div className="py-44 w-full justify-center items-center flex">
                        <AiOutlineLoading className="animate-spin text-primaryColor text-4xl" />
                    </div>
                ) : pendingLoan.isSuccess ? (
                    <Information
                        repaymentAmount={pendingLoan.data.repaymentAmount}
                        key={pendingLoan.data._id}
                        originalAmount={pendingLoan.data.amount}
                        rate={pendingLoan.data.rate}
                        
                    />
                ) : (
                    <div className="py-44 w-full justify-center items-center flex text-primaryColor">
                        An Error occured while getting your loan info
                    </div>
                )}
            </>
        </DefaultLayout>
    );
}

export default LoanInformation;
