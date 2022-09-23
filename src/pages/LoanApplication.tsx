
// react-hook-forms

// layout
import DefaultLayout from "../components/layout/DefaultLayout";

// components
import NavBarLayout from "../components/layout/NavBarLayout";
import { Form1, Header, TopBar } from "../components/pages/LoanApplication";
import { useCards } from '../services/customHooks/useCards';

function LoanApplication() {
    
    return (
        <NavBarLayout>
            <DefaultLayout>
                <>
                    <TopBar />
                    <Header />

                    <Form1
                       
                    />
                </>
            </DefaultLayout>
        </NavBarLayout>
    );
}

export default LoanApplication;
