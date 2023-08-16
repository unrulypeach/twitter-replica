import defaultPic from "../../styles/assets/default_profile.png";

export default function Avatar({
  photoURL = defaultPic,
  size = 39,
}): JSX.Element {
  return size === 134 ? (
    <>
      <img
        className="h-[134px] w-[134px] rounded-full object-cover"
        src={photoURL || defaultPic}
      />
    </>
  ) : (
    <>
      <img
        className="h-[39px] w-[39px] rounded-full object-cover"
        src={photoURL || defaultPic}
      />
    </>
  );
}
