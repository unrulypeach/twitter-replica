export default function SignupTos(): JSX.Element {
  return (
    <div className="mb-[16px] px-[12px] flex">
      <span className="text-[12px] leading-[15px] ">
        By signing up, you agree to the{" "}
        <a className="text-blue" href="https://twitter.com/tos">
          Terms of Service
        </a>
        {" and "}
        <a className="text-blue" href="https://twitter.com/privacy">
          Privacy Policy
        </a>
        {", including "}
        <a
          className="text-blue"
          href="https://help.twitter.com/rules-and-policies/twitter-cookies"
        >
          Cookie Use
        </a>
      </span>
    </div>
  );
}
