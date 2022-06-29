import React from "react";

// react-hook-forms
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { loanApplicationFormSchema } from "../utils/validation/loanApplication"; // joi validation

// layout
import DefaultLayout from "../components/layout/DefaultLayout";

// components
import { Form1, Header, TopBar } from "../components/pages/LoanApplication";
import { LoanApplicationFormInfo } from "../typings";
import NavBarLayout from "../components/layout/NavBarLayout";

function LoanApplication() {
    // initiate form state
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        control,
    } = useForm<LoanApplicationFormInfo>({
        defaultValues: {
            amount: "",
            interest: "Interest-15%",
            purpose: "",
            tenor: { value: "", label: "" },
        },
        resolver: joiResolver(loanApplicationFormSchema),
    });

    return (
        <NavBarLayout>
            <DefaultLayout>
                <>
                    <TopBar />
                    <Header />

                    <Form1
                        register={register}
                        errors={errors}
                        handleSubmit={handleSubmit}
                        Controller={Controller}
                        control={control}
                        watch={watch}
                    />
                </>
            </DefaultLayout>
        </NavBarLayout>
    );
}

export default LoanApplication;
