import defaultPic from '../../styles/assets/default_profile.png';

export default function Avatar({ photoURL = defaultPic, size = 39 }): JSX.Element {
  const picSize = (size) => {
    return `h-[${size}px] w-[${size}px]`;
  };
  const twSize = picSize(size);
  return size === 39 ? (
    <>
      <img className="h-[39px] w-[39px] rounded-full object-cover" src={photoURL || defaultPic} alt="" />
    </>
  ) : (
    <>
      <img
        className="rounded-full object-cover"
        style={{ height: size, width: size }}
        src={photoURL || defaultPic}
        alt=""
      />
    </>
  );
}
