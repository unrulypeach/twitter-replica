import { garbage } from '../../styles/assets/icons/iconData';

interface DeletePostProps {
  setShowDelete: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function DeletePost({ setShowDelete }: DeletePostProps): JSX.Element {
  return (
    <>
      <button
        className="fixed h-[100vh] w-[100vw] bg-blueClear top-0 left-0"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowDelete(false);
        }}
      ></button>
      <button className="absolute top-0 right-0 px-[16px] py-[14px] flex items-center bg-white">
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
