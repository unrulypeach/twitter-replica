import { useState } from "react";

export default function EditProfile(): JSX.Element {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");

  return (
    <div className="fixed w-full h-full flex flex-row items-center justify-center z-20">
      <div className="bg-darkClear fixed top-0 bottom-0 left-0 right-0" />
      <div className="z-10 h-[650px] min-w-[600px] max-w-[80vw] min-h-[400px] max-h-[650px] bg-white rounded-[16px]">
        <div className="flex flex-col ">
          <div className="py-[12px] px-0">
            <div
              className="border-[1px] border-greyBorder rounded-[4px] group 
                          focus-within:outline focus-within:outline-blue focus-within:outline-[2px]
                          focus-within:border-clear"
            >
              <label className="">
                <div className="flex flex-row absolute w-[438px]">
                  {name.length > 0 ? (
                    <div className="input-name-text-signup">
                      <span>Name</span>
                    </div>
                  ) : (
                    <div className="input-name-signup">
                      <span>Name</span>
                    </div>
                  )}
                  <div className="input-counter hidden group-focus-within:block">
                    <span className="">{name.length}/50</span>
                  </div>
                </div>
                <div className="label-signup">
                  <input
                    type="text"
                    className="input-signup"
                    maxLength={50}
                    placeholder=" "
                    required
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="py-[12px] px-0">
            <div
              className="border-[1px] border-greyBorder rounded-[4px] group 
                            focus-within:outline focus-within:outline-blue focus-within:outline-[2px]
                            focus-within:border-clear"
            >
              <label>
                <div className="flex flex-row absolute w-[438px]">
                  {bio.length > 0 ? (
                    <div className="input-name-text-signup">
                      <span>Bio</span>
                    </div>
                  ) : (
                    <div className="input-name-signup">
                      <span>Bio</span>
                    </div>
                  )}
                  <div className="input-counter hidden group-focus-within:block">
                    <span className="">{bio.length}/160</span>
                  </div>
                </div>
                <div className="label-signup">
                  <input
                    type="text"
                    className="input-signup"
                    maxLength={160}
                    onChange={(e) => {
                      setBio(e.target.value);
                    }}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="py-[12px] px-0">
            <div
              className="border-[1px] border-greyBorder rounded-[4px] group 
                            focus-within:outline focus-within:outline-blue focus-within:outline-[2px]
                            focus-within:border-clear"
            >
              <label>
                <div className="flex flex-row absolute w-[438px]">
                  {location.length > 0 ? (
                    <div className="input-name-text-signup">
                      <span>Location</span>
                    </div>
                  ) : (
                    <div className="input-name-signup">
                      <span>Location</span>
                    </div>
                  )}
                  <div className="input-counter hidden group-focus-within:block">
                    <span className="">{location.length}/30</span>
                  </div>
                </div>
                <div className="label-signup">
                  <input
                    type="text"
                    className="input-signup"
                    maxLength={30}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="py-[12px] px-0">
            <div
              className="border-[1px] border-greyBorder rounded-[4px] group 
                            focus-within:outline focus-within:outline-blue focus-within:outline-[2px]
                            focus-within:border-clear"
            >
              <label>
                <div className="flex flex-row absolute w-[438px]">
                  {website.length > 0 ? (
                    <div className="input-name-text-signup">
                      <span>Website</span>
                    </div>
                  ) : (
                    <div className="input-name-signup">
                      <span>Website</span>
                    </div>
                  )}
                  <div className="input-counter hidden group-focus-within:block">
                    <span className="">{website.length}/100</span>
                  </div>
                </div>
                <div className="label-signup">
                  <input
                    type="email"
                    className="input-signup"
                    maxLength={100}
                    onChange={(e) => {
                      setWebsite(e.target.value);
                    }}
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
