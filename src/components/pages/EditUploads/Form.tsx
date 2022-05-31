import React from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineCloudUpload } from 'react-icons/ai';

function Form() {
    const {register, watch, handleSubmit, formState} = useForm({mode:'onChange',});

    const watchPictureUpload = watch("picture");
    const watchproofOfIdentification = watch("proofOfIdentification");
    const watchproofOfResidence = watch("proofOfResidence");
    const watchSalarySlips = watch("salarySlips");
    const onSubmit = handleSubmit((data)=>{
console.log(data);
    })
  return (
      <form
      onSubmit={onSubmit}
          autoComplete="off"
          autoCorrect="off"
          autoSave="off"
          className="w-full grid grid-cols-12 py-20 md:gap-x-10 gap-y-20 text-darkTextColor"
      >
          <div className="col-span-12">
              <div className=" border-0 border-b-2 border-underlineColor">
                  <label
                      htmlFor="EditUploads__picture"
                      className={
                          "text-sm justify-between pr-10 mb-2 cursor-pointer w-full h-20 flex items-end bg-bgColor p-4 text-gray-400"
                      }
                  >
                      {watchPictureUpload && watchPictureUpload?.length > 0
                          ? watchPictureUpload.item(0)?.name
                          : "Upload Picture"}
                      <AiOutlineCloudUpload
                          className="text-2xl"
                          strokeWidth={50}
                      />
                  </label>
                  <input
                      type="file"
                      {...register("picture", {required:false,})}
                      id="EditUploads__picture"
                      className="outline-none pb-4 hidden"
                      accept=".pdf"
                  />
              </div>
              {<p className="text-xs text-red-900 ">{""}</p>}
          </div>

          <div className="col-span-12">
              <div className=" border-0 border-b-2 border-underlineColor">
                  <label
                      htmlFor="EditUploads__proofOfIdentification"
                      className={
                          "text-sm justify-between pr-10 mb-2 cursor-pointer w-full h-20 flex items-end bg-bgColor p-4 text-gray-400"
                      }
                  >
                      {watchproofOfIdentification &&
                      watchproofOfIdentification?.length > 0
                          ? watchproofOfIdentification.item(0)?.name
                          : "Proof of Identification"}

                      <AiOutlineCloudUpload
                          className="text-2xl"
                          strokeWidth={50}
                      />
                  </label>
                  <input
                      type="file"
                      {...register("proofOfIdentification", {required:false,})}
                      id="EditUploads__proofOfIdentification"
                      className="outline-none pb-4 hidden"
                      accept=".pdf"
                  />
              </div>
              {<p className="text-xs text-red-900 ">{""}</p>}
          </div>

          <div className="col-span-12">
              <div className=" border-0 border-b-2 border-underlineColor">
                  <label
                      htmlFor="EditUploads__proofOfResidence"
                      className={
                          "text-sm justify-between pr-10 mb-2 cursor-pointer w-full h-20 flex items-end bg-bgColor p-4 text-gray-400"
                      }
                  >
                      {watchproofOfResidence &&
                      watchproofOfResidence?.length > 0
                          ? watchproofOfResidence.item(0)?.name
                          : "Proof of Residence"}

                      <AiOutlineCloudUpload
                          className="text-2xl"
                          strokeWidth={50}
                      />
                  </label>
                  <input
                      type="file"
                      {...register("proofOfResidence", {required:false,})}
                      id="EditUploads__proofOfResidence"
                      className="outline-none pb-4 hidden"
                      accept=".pdf"
                  />
              </div>
              {<p className="text-xs text-red-900 ">{""}</p>}
          </div>
          <div className="col-span-12">
              <div className=" border-0 border-b-2 border-underlineColor">
                  <label
                      htmlFor="EditUploads__salarySlips"
                      className={
                          "text-sm justify-between pr-10 mb-2 cursor-pointer w-full h-20 flex items-end bg-bgColor p-4 text-gray-400"
                      }
                  >
                      {watchSalarySlips && watchSalarySlips?.length > 0
                          ? watchSalarySlips.item(0)?.name
                          : "Original/certified copy of the latest salary slips for the past 3 months"}

                      <AiOutlineCloudUpload
                          className="text-2xl min-w-max ml-12 md: ml-4"
                          strokeWidth={50}
                      />
                  </label>
                  <input
                      type="file"
                      {...register("salarySlips",{required:false,})}
                      id="EditUploads__salarySlips"
                      className="outline-none pb-4 hidden"
                      accept=".pdf"
                  />
              </div>
              {<p className="text-xs text-red-900 ">{""}</p>}
          </div>

          <div className="col-span-12">
              <button
                  className={`btn1  float-right w-full md:w-48`}
                  type="submit"
                disabled= {!formState.isDirty}
              >
                  Save
              </button>
          </div>
      </form>
  );
}

export default Form