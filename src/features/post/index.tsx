import { useState, useRef, useEffect } from 'react';
import Avatar from '../../components/user/avatar';
import { useAuthContext } from '../../contexts/authContext';
import { dropdown, emoji, gif, globe, location, media, poll, schedule } from '../../styles/assets/icons/iconData';
import { post } from '../../services/firebase/firestore';

// setPosts is received only from <SignedInHome />
export default function Post({ setShouldUpdate }): JSX.Element {
  const { userProfile } = useAuthContext();
  const [postValue, setPostValue] = useState('');
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const [previewImg, setPreviewImg] = useState<string | undefined>();
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.style.height = '0px';
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + 'px';
  }, [postValue]);

  useEffect(() => {
    if (!imgFile) {
      setPreviewImg(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(imgFile);
    setPreviewImg(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imgFile]);

  const handlePost = () => {
    if (userProfile?.userhandle) {
      if (imgFile)
        void post(userProfile?.userhandle, userProfile?.username, userProfile?.profile_pic, postValue, imgFile).then(
          () => {
            setPostValue('');
            setImgFile(undefined);
            setPreviewImg(undefined);
            setShouldUpdate((prev) => !prev);
          },
        );
      void post(userProfile?.userhandle, userProfile?.username, userProfile?.profile_pic, postValue).then(() => {
        setPostValue('');
        setImgFile(undefined);
        setPreviewImg(undefined);
        setShouldUpdate((prev) => !prev);
      });
    }
    // add post to feed
  };

  return (
    <div className="flex flex-row w-[598px] border-b-[1px] border-searchbar py-1 px-[15px]">
      <div className="pt-1 mr-[11px]">
        <Avatar profile_pic={userProfile?.profile_pic} />
      </div>
      <div className="grow">
        <div className="flex flex-col">
          <div className="flex flex-row pt-[4px] pb-[11px]">
            <div className="flex flex-row items-center border-[1px] border-dark-650 rounded-full text-[13px] leading-[15px] px-[11px] min-w-[23px] min-h-[23px]">
              <span className="text-blue font-bold"> Everyone</span>
              <span>{dropdown}</span>
            </div>
          </div>
          <div className="py-[11px]">
            <textarea
              ref={textareaRef}
              className="border-0 outline-none resize-none w-full"
              placeholder="What's happening?"
              value={postValue}
              onChange={(e) => {
                setPostValue(e.target.value);
              }}
            />
          </div>
          {previewImg && (
            <div className="pb-[11px]">
              <img className="rounded-2xl" src={previewImg} alt="" />
            </div>
          )}
        </div>

        <div className="flex flex-row text-[13px] font-bold leading-[15px] pb-[11px]">
          <div>{globe}</div>
          <span className="text-blue"> Everyone can reply</span>
        </div>

        <div className="flex flex-row justify-between pt-[9px] ml-[-8px]">
          <div className="flex flex-row">
            <div className="blue-icon-positioning">
              <label htmlFor="post-pic" className="cursor-pointer">
                {media}
              </label>
              <input
                id="post-pic"
                accept="image/*"
                type="file"
                className="invisible h-0 w-0"
                onChange={(e) => {
                  if (e.target.files) setImgFile(e.target.files[0]);
                }}
              />
            </div>
            <div className="blue-icon-positioning opacity-40">
              <div>{gif}</div>
            </div>
            <div className="blue-icon-positioning opacity-40">
              <div>{poll}</div>
            </div>
            <div className="blue-icon-positioning opacity-40">
              <div>{emoji}</div>
            </div>
            <div className="blue-icon-positioning opacity-40">
              <div>{schedule}</div>
            </div>
            <div className="blue-icon-positioning opacity-40">
              <div>{location}</div>
            </div>
          </div>
          <div>
            <button
              style={{ opacity: postValue || imgFile ? 1 : 0.5 }}
              className="bg-blue min-w-[34px] min-h-[34px] opacity-50 flex px-[15px] ml-11px rounded-full"
              onClick={() => {
                if (postValue || imgFile) handlePost();
              }}
            >
              <div className="btn-tweet">
                <span className="select-none">Tweet</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
