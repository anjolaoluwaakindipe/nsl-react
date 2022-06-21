import { PaystackButton } from "react-paystack";
function TestPayment() {
    // const handlePaystackSuccessAction = (reference) => {
    //     // Implementation for whatever you want to do with reference and after success call.
    //     console.log(reference);
    // };

    // // you can call this function anything
    // const handlePaystackCloseAction = () => {
    //     // implementation for  whatever you want to do when the Paystack dialog closed.
    //     console.log("closed");
    // };
    return (
        <div>
            <PaystackButton  email="anjyakindipe" amount={12300} publicKey="12345"/>
        </div>
    );
}

export default TestPayment;
