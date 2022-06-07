
function LoginUnsuccessfulModal(prop: { cancelModal: () => void }) {
    const onProceed = () =>{
        
        prop.cancelModal()
       
    }
    return (
        <div className=" m-10 md:w-96 h-auto bg-white p-10 rounded-xl">
            <img
                src="assets/unsuccessfulcross.svg"
                alt="unsuccessful_img"
                className="object-contain md:w-20 w-16 mx-auto"
            />
            <h3 className="pt-5 text-2xl md:text-4xl font-bold text-primaryColor text-center">
                Login Failed
            </h3>
            <h5 className="md:max-w-[600px]  max-w-[500px] min-w-[200px] text-center md:text-2xl  py-10">
                Please input the correct details to login to your dashboard
            </h5>

            <button className="btn1 w-full" onClick={onProceed}>
                Cancel
            </button>
        </div>
    );
}

export default LoginUnsuccessfulModal;
