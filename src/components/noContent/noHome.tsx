export default function NoHome(): JSX.Element {
  return (
    <div className="max-w-[600px] mx-auto flex">
      <div className="flex flex-col mx-[109px] my-[30px] px-[30px]">
        <div>
          <span className="text-[29px] leading-[34px] font-bold">
            Welcome to Twitter!
          </span>
        </div>
        <div className="mb-[27px]">
          <span className="text-[14px] leading-[19px] text-greyTxt">
            This is the best place to see what’s happening in your world. Find
            some people and topics to follow now.
          </span>
        </div>

        <div className="self-start bg-blue min-w-[49px] min-h-[49px] flex px-[30px] ml-11px rounded-full">
          <div className="flex justify-center items-center">
            <span className="select-none text-[16px] leading-[19px] text-white font-bold">{`Let's go!`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
