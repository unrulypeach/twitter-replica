import { useEffect, useState } from 'react';
import { closeModalX, uploadPic } from '../../styles/assets/icons/iconData';
import { type DocumentData } from 'firebase/firestore';
import Avatar from '../../components/user/avatar';
import { useAuthContext } from '../../contexts/authContext';
import UserProps from '../../types/userProps';
import useAxiosPrivate from '../../hooks/useAxiosInterceptors';

interface IEditProfile {
  showModal: boolean;
  setShowModal: () => void;
  data: UserProps;
  setUserInfo: React.Dispatch<React.SetStateAction<DocumentData | null>>;
}
export default function EditProfile({ showModal, setShowModal, data, setUserInfo }: IEditProfile): JSX.Element {
  const axiosPrivate = useAxiosPrivate();
  const { uploadUserPhoto, uploadBgPhoto, userProfile, setUserProfile } = useAuthContext();
  const { bio, location, website, username, profile_pic /* userhandle */ } = data;
  const [name, setName] = useState(username ?? '');
  const [bioState, setBioState] = useState(bio ?? '');
  const [locationState, setLocationState] = useState(location ?? '');
  const [websiteState, setWebsiteState] = useState(website ?? '');
  const [profPicState, setProfPicState] = useState<string | undefined>();
  const [bgPicState, setBgPicState] = useState();
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const [bgImgFile, setBgImgFile] = useState<File | undefined>(undefined);

  const handleSave = async () => {
    let userPic: string | undefined;
    let bgPhoto: string | undefined;
    if (imgFile) userPic = await uploadUserPhoto(imgFile);
    if (bgImgFile) bgPhoto = await uploadBgPhoto(bgImgFile);

    const newEdit = {
      ...(bioState && { bio: bioState }),
      ...(name && { username: name }),
      ...(locationState && { location: locationState }),
      ...(websiteState && { website: websiteState }),
      ...(userPic && { profile_pic: userPic }),
      ...(bgPhoto && { header_pic: bgPhoto }),
    };

    axiosPrivate.put(`/user/${_id}`, newEdit);
    // move this to after submitting
    setUserProfile((prev) => {
      return { ...prev, profile_pic: userPic };
    });
  };

  const handleClosePg = () => {
    setName(username ?? '');
    setBioState(bio ?? '');
    setLocationState(location ?? '');
    setWebsiteState(website ?? '');
    setImgFile(undefined);
    setBgImgFile(undefined);
  };

  useEffect(() => {
    if (!imgFile) {
      setProfPicState(profile_pic ?? '');
      return;
    }
    const objectUrl = URL.createObjectURL(imgFile);
    setProfPicState(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imgFile]);

  useEffect(() => {
    if (!bgImgFile) {
      setBgPicState(data?.header_pic ?? '');
      return;
    }
    const objectUrl = URL.createObjectURL(bgImgFile);
    setBgPicState(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [bgImgFile]);

  return (
    <>
      {showModal && (
        <div className="absolute top-[10%] w-full h-full flex flex-row z-20">
          <div
            onClick={() => {
              setShowModal();
              handleClosePg();
            }}
            role="button"
            tabIndex={0}
            className="bg-darkClear fixed top-0 bottom-0 left-0 right-0"
          />
          <div className="overflow-scroll z-10 h-[650px] min-w-[600px] max-w-[80vw] min-h-[400px] max-h-[650px] bg-white rounded-[16px]">
            <div className="flex flex-col ">
              <div className="flex mx-[15px] h-[50px] items-center">
                <button
                  className="h-[19px] w-[19px] mr-[24px]"
                  onClick={() => {
                    setShowModal();
                    handleClosePg();
                  }}
                >
                  {closeModalX}
                </button>
                <div className="grow">
                  <span className="text-[19px] leading-[23px] font-bold">Edit Profile</span>
                </div>
                <div>
                  <button
                    className="bg-black px-[15px] rounded-full h-[30px]"
                    onClick={() => {
                      handleSave();
                      setShowModal();
                    }}
                  >
                    <div className="flex h-full items-center">
                      <span className="text-white text-[13px] leading-[15px] font-bold">Save</span>
                    </div>
                  </button>
                </div>
              </div>
              <div>
                <div
                  style={{ backgroundImage: `url(${bgPicState})` }}
                  className="flex items-center justify-center h-[200px] bg-dark-650"
                >
                  <div className="p-[10px] rounded-full bg-imgBg hover:bg-imgHov">
                    <label
                      className="flex h-full justify-center items-center hover:cursor-pointer fill-white"
                      htmlFor="bg-input"
                    >
                      {uploadPic}
                      <input
                        className="invisible w-0 h-0"
                        id="bg-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files) {
                            setBgImgFile(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-between basis-auto items-start">
                  <div className="flex items-center ml-[14px] relative mt-[-5%] mb-[11px] border-white border-2 rounded-full">
                    <Avatar profile_pic={profPicState} size={104} />
                    {/* <div className="hover:cursor-pointer absolute right-[31.5px] p-[10px] bg-imgBg hover:bg-imgHov rounded-full fill-white"> */}
                    <div className="bg-imgBg hover:bg-imgHov absolute right-[31.5px] rounded-full h-[41px] w-[41px]">
                      <label
                        className="flex h-full justify-center items-center hover:cursor-pointer fill-white"
                        htmlFor="file-input"
                      >
                        {uploadPic}
                        <input
                          className="invisible w-0 h-0"
                          id="file-input"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files) {
                              setImgFile(e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-[11px] px-[15px]">
                <div
                  className="border-[1px] border-greyBorder rounded-[4px] group 
                          focus-within:outline focus-within:outline-blue focus-within:outline-[2px]
                          focus-within:border-clear"
                >
                  <label className="">
                    <div className="flex flex-row relative w-[565px]">
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
                        <span className="">{name.length} / 50</span>
                      </div>
                    </div>
                    <div className="label-signup">
                      <input
                        type="text"
                        className="input-signup"
                        maxLength={50}
                        placeholder=" "
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                  </label>
                </div>
              </div>

              <div className="py-[11px] px-[15px]">
                <div
                  className="border-[1px] border-greyBorder rounded-[4px] group 
                            focus-within:outline focus-within:outline-blue focus-within:outline-[2px]
                            focus-within:border-clear"
                >
                  <label>
                    <div className="flex flex-row relative w-[565px]">
                      {bioState.length > 0 ? (
                        <div className="input-name-text-signup">
                          <span>Bio</span>
                        </div>
                      ) : (
                        <div className="input-name-signup">
                          <span>Bio</span>
                        </div>
                      )}
                      <div className="input-counter left-[492px] hidden group-focus-within:block">
                        <span className="">{bioState.length} / 160</span>
                      </div>
                    </div>
                    <div className="label-signup">
                      <textarea
                        className="input-signup resize-none"
                        rows={3}
                        maxLength={160}
                        value={bioState}
                        onChange={(e) => {
                          setBioState(e.target.value);
                        }}
                      />
                    </div>
                  </label>
                </div>
              </div>

              <div className="py-[11px] px-[15px]">
                <div
                  className="border-[1px] border-greyBorder rounded-[4px] group 
                            focus-within:outline focus-within:outline-blue focus-within:outline-[2px]
                            focus-within:border-clear"
                >
                  <label>
                    <div className="flex flex-row relative w-[565px]">
                      {locationState.length > 0 ? (
                        <div className="input-name-text-signup">
                          <span>Location</span>
                        </div>
                      ) : (
                        <div className="input-name-signup">
                          <span>Location</span>
                        </div>
                      )}
                      <div className="input-counter hidden group-focus-within:block">
                        <span className="">{locationState.length} / 30</span>
                      </div>
                    </div>
                    <div className="label-signup">
                      <input
                        type="text"
                        className="input-signup"
                        maxLength={30}
                        value={locationState}
                        onChange={(e) => {
                          setLocationState(e.target.value);
                        }}
                      />
                    </div>
                  </label>
                </div>
              </div>

              <div className="py-[11px] px-[15px]">
                <div
                  className="border-[1px] border-greyBorder rounded-[4px] group 
                            focus-within:outline focus-within:outline-blue focus-within:outline-[2px]
                            focus-within:border-clear"
                >
                  <label>
                    <div className="flex flex-row relative w-[565px]">
                      {websiteState.length > 0 ? (
                        <div className="input-name-text-signup">
                          <span>Website</span>
                        </div>
                      ) : (
                        <div className="input-name-signup">
                          <span>Website</span>
                        </div>
                      )}
                      <div className="input-counter left-[492px] hidden group-focus-within:block">
                        <span className="">{websiteState.length} / 100</span>
                      </div>
                    </div>
                    <div className="label-signup">
                      <input
                        type="email"
                        className="input-signup"
                        maxLength={100}
                        value={websiteState}
                        onChange={(e) => {
                          setWebsiteState(e.target.value);
                        }}
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
