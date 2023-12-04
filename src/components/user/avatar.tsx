import defaultPic from '../../styles/assets/default_profile.png';

export default function Avatar({
  profile_pic = defaultPic,
  size = 39,
}: {
  profile_pic?: string;
  size?: number;
}): JSX.Element {
  return size === 39 ? (
    <>
      <img className="h-[39px] w-[39px] rounded-full object-cover" src={profile_pic || defaultPic} alt="" />
    </>
  ) : (
    <>
      <img
        className="rounded-full object-cover"
        style={{ height: size, width: size }}
        src={profile_pic || defaultPic}
        alt=""
      />
    </>
  );
}
