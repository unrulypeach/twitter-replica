import { useEffect, useState, useRef } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosInterceptors';
import Avatar from '../../components/user/avatar';
import useAuthContext from '../../hooks/useAuthContext';
import { emoji, gif, media, location, closeModalX } from '../../styles/assets/icons/iconData';
import { handleAxiosValidationError } from '../../scripts/errorHandling';

interface ReplyProps {
  postid: string;
}
export default function Reply({ postid }: ReplyProps): JSX.Element {
  const axiosPrivate = useAxiosPrivate();
  const { userProfile } = useAuthContext();
  const textareaRef = useRef(null);
  const [postValue, setPostValue] = useState('');
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const [previewImg, setPreviewImg] = useState<string | undefined>();

  // handle textarea resize
  useEffect(() => {
    textareaRef.current.style.height = '0px';
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + 'px';
  }, [postValue]);

  // sets the selected image for preview
  useEffect(() => {
    if (!imgFile) {
      setPreviewImg(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(imgFile);
    setPreviewImg(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imgFile]);

  const handleSubmitReply = async () => {
    const config = {
      ...(postValue && { content: postValue }),
      postid,
    };
    try {
      const uploadReply = await axiosPrivate.post('/post/reply', config);
      if (uploadReply.status === 200) {
        setPostValue('');
        // setImgFile(undefined);
        // setPreviewImg(undefined);
      }
    } catch (error) {
      handleAxiosValidationError(error);
    }
  };

  return (
    <div className="px-[15px] flex items-center py-[14px] border-b-[1px] border-searchbar">
      <div className="pt-1 mr-[11px]">
        <Avatar profile_pic={userProfile?.profile_pic || ''} />
      </div>
      <div className="grow">
        <div className="flex flex-col">
          <label className="grow py-[11px]">
            <textarea
              className="w-full resize-none focus:outline-none"
              placeholder="Post your reply!"
              ref={textareaRef}
              value={postValue}
              onChange={(e) => setPostValue(e.target.value)}
            />
          </label>
          {previewImg && (
            <div className="pb-[11px] relative">
              <img className="rounded-2xl w-full" src={previewImg} alt="" />
              <button
                className="cursor-pointer absolute top-[5px] right-[5px] flex justify-center items-center w-[32px] h-[32px] rounded-full bg-imgBg"
                onClick={() => {
                  setImgFile(() => undefined);
                }}
              >
                <span className="w-[18px] inline-block invert">{closeModalX}</span>
              </button>
            </div>
          )}
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
              <div>{emoji}</div>
            </div>
            <div className="blue-icon-positioning opacity-40">
              <div>{location}</div>
            </div>
          </div>
          <div>
            <button
              style={{ opacity: postValue.trim() || imgFile ? 1 : 0.5 }}
              className="bg-blue min-w-[34px] min-h-[34px] opacity-50 flex px-[15px] ml-11px rounded-full"
              onClick={() => {
                if (postValue.trim() || imgFile) void handleSubmitReply();
              }}
            >
              <div className="btn-tweet">
                <span className="select-none">Tweet</span>
              </div>
            </button>
          </div>
        </div>
        {/* <button
        onClick={handleSubmitReply}
        className="h-[34px] ml-[11px] px-[15px] rounded-full text-[14px] leading-[10px] font-bold text-white bg-blue"
      >
        Reply
      </button> */}
      </div>
    </div>
  );
}
