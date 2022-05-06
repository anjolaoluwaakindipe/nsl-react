import useForms from "../../../services/customHooks/useForms";

// input patterns
import {
    currency,
    numbersNoDecimal
} from "../../../utils/constants/inputValidationPatterns";

// validation
import { bankCardValidation } from "../../../utils/validation/loanPaymentOption";

function BankCardForm() {
    const onSubmitForm = () => {
        setTimeout(() => {
            setSubmitButtonDisabled(false);
        }, 10000);
    };

    const {
        formFields,
        handleFormChanges,
        handleFormSubmit,
        validationErrors,
        isSubmitButtonDisabled,
        setSubmitButtonDisabled,
    } = useForms({
        initialValues: {
            amount: 0.00,
            cardNumber: "",
            cvv: "",
            cardName: "",
        },
        validation: bankCardValidation,
        callback: onSubmitForm,
    });

    return (
        <form
            action="/"
            className="w-full grid grid-cols-12 py-20 md:gap-x-10 gap-y-20 text-darkTextColor"
            onSubmit={handleFormSubmit}
            autoComplete="off"
            autoSave="off"
        >
            <div className=" col-span-12 md:col-span-6 ">
                <div className="border-0 border-b-2 border-underlineColor flex items-end ">
                    <label htmlFor="LoanPaymentOption__amount"></label>
                    <input
                        type="text"
                        name="amount"
                        formNoValidate={true}
                        id="LoanPaymentOption__amount"
                        className="outline-none pb-4  w-full"
                        step={0.01}
                        pattern={currency}
                        placeholder="Amount"
                        value={formFields.amount}
                        onChange={handleFormChanges}
                    />
                </div>
                {validationErrors.amount && (
                    <p className="text-xs text-red-900 ">
                        {validationErrors.amount}
                    </p>
                )}
            </div>
            <div className=" col-span-12 md:col-span-6">
                <div className="border-0 border-b-2 border-underlineColor">
                    <label htmlFor="LoanPaymentOption__cardNumber"></label>
                    <input
                        type="text"
                        name="cardNumber"
                        pattern={numbersNoDecimal}
                        formNoValidate={true}
                        max={10}
                        id="LoanPaymentOption__cardNumber"
                        className="outline-none pb-4  w-full"
                        placeholder="Card Number"
                        value={formFields.cardNumber}
                        onChange={handleFormChanges}
                    />
                </div>
                {validationErrors.cardNumber && (
                    <p className="text-xs text-red-900 ">
                        {validationErrors.cardNumber}
                    </p>
                )}
            </div>
            <div className=" col-span-12 md:col-span-6">
                <div className="border-0 border-b-2 border-underlineColor">
                    <label htmlFor="LoanPaymentOption__accountName"></label>
                    <input
                        type="text"
                        name="accountName"
                        max={3}
                        id="LoanPaymentOption__cvv"
                        className="outline-none pb-4  w-full"
                        placeholder="CVV"
                        value={formFields.cvvv}
                        onChange={handleFormChanges}
                    />
                </div>
                {validationErrors.cvv && (
                    <p className="text-xs text-red-900 ">
                        {validationErrors.cvv}
                    </p>
                )}
            </div>

            <div className=" col-span-12 md:col-span-6 ">
                <div className="border-0 border-b-2 border-underlineColor">
                    <label htmlFor="LoanPaymentOption__cardName"></label>
                    <input
                        type="text"
                        name="cardName"
                        max={10}
                        id="LoanPaymentOption__cardName"
                        className="outline-none pb-4  w-full"
                        placeholder="Card Name"
                        value={formFields.cardName}
                        onChange={handleFormChanges}
                    />
                </div>
                {validationErrors.cardName && (
                    <p className="text-xs text-red-900 ">
                        {validationErrors.cardName}
                    </p>
                )}
            </div>
            <button
                className={`col-span-12 md:col-span-6 btn1 bg-darkTextColor `}
                type="submit"
                disabled={isSubmitButtonDisabled}
            >
                Proceed
            </button>
        </form>
    );
}

export default BankCardForm;
