import React from "react";
import { AiFillEdit, AiOutlineCloudUpload } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../utils/constants/allPaths';

function UploadInfo() {
    const navigate  = useNavigate();

    const editUploads = () =>{
        navigate(paths.EDIT_UPLOADS)
    }

    return (
        <div className="col-span-1 space-y-6">
            <div className="w-full flex justify-between items-end">
                <h1 className="font-semibold">Uploads</h1>

                <AiFillEdit className="cursor-pointer text-primaryColor brightness-125 " onClick={editUploads} />
            </div>

            <div className="grid grid-cols-2   text-sm  gap-y-4 text-primaryColor">
                <div className="col-span-2 bg-bgColor px-10 py-8 flex items-center justify-between rounded-md">
                    <div className="flex items-center space-x-4">
                        <GrDocumentText className="text-2xl text-primaryColor" strokeWidth={50} />
                        <h1 className="font-semibold">
                            Proof of Identification
                        </h1>
                    </div>

                    <AiOutlineCloudUpload
                        className="text-2xl"
                        strokeWidth={50}
                    />
                </div>
                <div className="col-span-2 bg-bgColor px-10 py-8 flex items-center justify-between rounded-md">
                    <div className="flex items-center space-x-4">
                        <GrDocumentText className="text-2xl" strokeWidth={50} />
                        <h1 className="font-semibold">Proof of residence</h1>
                    </div>

                    <AiOutlineCloudUpload
                        className="text-2xl"
                        strokeWidth={50}
                    />
                </div>
                <div className="col-span-2 bg-bgColor px-10 py-8 flex items-center justify-between rounded-md">
                    <div className="flex items-center space-x-4">
                        <GrDocumentText className="text-2xl" strokeWidth={50} />
                        <h1 className="font-semibold">Salary Slip</h1>
                    </div>

                    <AiOutlineCloudUpload
                        className="text-2xl"
                        strokeWidth={50}
                    />
                </div>
            </div>
        </div>
    );
}

export default UploadInfo;
