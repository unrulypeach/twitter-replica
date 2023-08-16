import { useContext, useState } from "react";
import CloseModal from "../signupModal/closeModal";
import { SIGNUP_PAGE_CONTEXT } from "../../contexts/userContext";
import { useAuthContext } from "../../contexts/authContext";

export default function PickApfp(): JSX.Element {
  const { signupPage, setSignupPage } = useContext(SIGNUP_PAGE_CONTEXT);
  const [file, setFile] = useState<File>();
  const { uploadUserPhoto } = useAuthContext();
  function handleNext(): void {
    if (uploadUserPhoto && file) void uploadUserPhoto(file);
    if (setSignupPage) setSignupPage(Number(signupPage) + 1);
  }

  return (
    <div className="max-w-[600px] h-full">
      <div className="flex flex-row w-full pt-3">
        <CloseModal />

        <div className="ml-10">
          <span className="text-[20px] leading-[24px] font-bold">
            Step: 3 of 5
          </span>
        </div>

        <div className="grow" />
      </div>

      <div className="flex flex-col justify-between h-5/6">
        <div className="flex flex-col px-[80px]">
          <div>
            <div className="my-[20px]">
              <span className="text-[31px] leading-[36px] font-bold">
                Pick a profile
              </span>
            </div>
            <div>
              <span className="text-[14px] leading-[16px] text-greyTxt">
                Have a favorite selfie? Upload it now.
              </span>
            </div>
          </div>

          <div className="flex flex-col ">
            <div className="py-[12px] px-0">
              <div className="border-[1px] border-greyTxt rounded-[4px] group focus-within:border-blue focus-within:border-[2px]">
                <label className="">
                  <div className="">
                    <input
                      type="file"
                      className=""
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files) {
                          setFile(e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-[80px]">
        <button
          className="bg-black text-white h-[49px] w-full rounded-full text-[16px] leading-[19px] font-bold"
          type="button"
          onClick={handleNext}
        >
          {file ? "Submit" : "Skip for now"}
        </button>
      </div>
    </div>
  );
}
