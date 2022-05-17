import React from "react";

// react-hook-forms
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { loanApplicationFormSchema } from "../utils/validation/loanApplication"; // joi validation

// layout
import DefaultLayout from "../components/layout/DefaultLayout";

// components
import {
    Form1,
    Form2,
    Header,
    TopBar,
} from "../components/pages/LoanApplication";
import { LoanApplicationFormInfo } from "../typings";
import { useState } from "react";

function LoanApplication() {
    const [nextPage, setNextPage] = useState(false);

    // initiate form state
    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
        watch,
        control,
    } = useForm<LoanApplicationFormInfo>({
        defaultValues: {
            amount: "",
            interest: "",
            narration: "",
        },
        resolver: joiResolver(loanApplicationFormSchema),
    });

    console.log(getValues());

    return (
        <DefaultLayout>
            <>
                <TopBar />
                <Header />

                {nextPage ? (
                    <Form2
                        register={register}
                        watch={watch}
                        handleSubmit={handleSubmit}
                    />
                ) : (
                    <Form1
                        register={register}
                        errors={errors}
                        handleSubmit={handleSubmit}
                        setNextPage={setNextPage}
                        Controller={Controller}
                        control={control}
                        watch = {watch}
                    />
                )}
            </>
        </DefaultLayout>
    );
}

export default LoanApplication;
