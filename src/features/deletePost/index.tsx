/* eslint-disable jsx-a11y/click-events-have-key-events */
import { garbage } from '../../styles/assets/icons/iconData';
import { Types } from 'mongoose';
import { useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosInterceptors';
import { handleAxiosError } from '../../scripts/errorHandling';

interface DeletePostProps {
  postid: Types.ObjectId;
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
  deleteTweet?: (postid: Types.ObjectId) => void;
}
export default function DeletePost({ postid, setShowDelete, deleteTweet }: DeletePostProps): JSX.Element {
  const axiosPrivate = useAxiosPrivate();
  // handle close modal with escape key
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setShowDelete(false);
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  function handleDelete() {
    axiosPrivate
      .delete('/post/del', {
        data: { postid },
      })
      .then(() => {
        setShowDelete(false);
        if (deleteTweet) deleteTweet(postid);
      })
      .catch((error) => {
        handleAxiosError(error);
      });
  }

  return (
    <>
      <div
        className="fixed h-[100vh] w-[100vw] top-0 left-0 z-10 cursor-default"
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowDelete(false);
        }}
      ></div>
      <button
        className="w-[200px] rounded-md absolute top-0 right-0 px-[16px] py-[14px] flex items-center bg-white z-20"
        onClick={(e) => {
          e.preventDefault();
          handleDelete();
        }}
      >
        <div className="">
          <span className="fill-deleteColor">{garbage}</span>
        </div>
        <div>
          <span className="text-deleteColor pl-[12px] text-[15px] leading-[20px]">Delete</span>
        </div>
      </button>
    </>
  );
}
