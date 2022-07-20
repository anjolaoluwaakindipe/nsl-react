import { AiFillEdit, AiOutlineCloudUpload } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSelector } from "../../../state/authSlice";
import { paths } from "../../../utils/constants/allPaths";

function UploadSummaryInfo() {
    const navigate = useNavigate();

    const editUploads = () => {
        navigate(paths.EDIT_UPLOADS);
    };

    const { proofOfAddressImage, identificationDocumentImage,} = useSelector(authSelector)?.user!;

    return (
        <div className="col-span-1 space-y-6">
            <div className="w-full flex justify-between items-end">
                <h1 className="font-semibold">Uploads</h1>

                <AiFillEdit
                    className="cursor-pointer text-primaryColor brightness-125 "
                    onClick={editUploads}
                />
            </div>

            <div className="grid grid-cols-2   text-sm  gap-y-4 text-primaryColor">
                <div className="col-span-2 bg-bgColor px-5 md:px-10 pb-8 pt-5 rounded-md space-y-4">
                    {identificationDocumentImage&&<img
                        className="object-cover h-20 md:h-80 w-full"
                        src={"data:image/png;base64," + identificationDocumentImage}
                        alt="proof_of_address"
                    />}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <GrDocumentText
                                className="text-2xl text-primaryColor"
                                strokeWidth={50}
                            />
                            <h1 className="font-semibold">
                                Proof of Identification
                            </h1>
                        </div>

                        <AiOutlineCloudUpload
                            className="text-2xl"
                            strokeWidth={50}
                        />
                    </div>
                </div>
                <div className="col-span-2 bg-bgColor px-5 md:px-10 pb-8 pt-5 rounded-md space-y-4">
                    { proofOfAddressImage && <img
                        className="object-cover h-20 md:h-80 w-full"
                        src={"data:image/png;base64," + proofOfAddressImage}
                        alt="proof_of_address"
                    />}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <GrDocumentText
                                className="text-2xl"
                                strokeWidth={50}
                            />
                            <h1 className="font-semibold">
                                Proof of residence
                            </h1>
                        </div>

                        <AiOutlineCloudUpload
                            className="text-2xl"
                            strokeWidth={50}
                        />
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default UploadSummaryInfo;
