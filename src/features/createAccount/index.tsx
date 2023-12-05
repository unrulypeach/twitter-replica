import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { SIGNUP_PAGE_CONTEXT, NEW_USER_CONTEXT } from '../../contexts/userContext';
import CloseModal from '../signupModal/closeModal';

export default function CreateAccount(): JSX.Element {
  const { setSignupPage } = useContext(SIGNUP_PAGE_CONTEXT);
  const { setNewUserData } = useContext(NEW_USER_CONTEXT);
  const years = [];
  const currYr: number = moment().year();
  for (let i = currYr; i > currYr - 120; i--) {
    years.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }

  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [year, setYear] = useState(0);

  const [days, setDays] = useState([] as JSX.Element[]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // const submitDataToCreateUser = (email) => {};

  useEffect(() => {
    const defaultMonth = month === 0 ? 1 : month;
    const newDays = moment(`${currYr}-${defaultMonth}`, 'YYYY-MM').daysInMonth();
    const newDaysArr = [];
    for (let i = 1; i <= newDays; i++) {
      newDaysArr.push(
        <option value={i} key={i}>
          {i}
        </option>,
      );
    }
    setDays(newDaysArr);
  }, [month, currYr]);

  return (
    <div className="max-w-[600px] h-[650px] flex flex-col">
      <div className="flex flex-row w-full pt-3">
        <CloseModal />

        <div className="ml-10">
          <span className="text-[20px] leading-[24px] font-bold">Step: 1 of 5</span>
        </div>

        <div className="grow" />
      </div>

      <div className="flex flex-col h-full shrink">
        <div className="flex flex-col px-[80px] grow">
          <div className="my-[20px]">
            <span className="text-[31px] leading-[36px] font-bold">Create your account</span>
          </div>

          <div className="flex flex-col ">
            <div className="py-[12px] px-0">
              <div
                className="border-[1px] border-greyBorder rounded-[4px] group 
                          focus-within:outline focus-within:outline-blue focus-within:outline-[2px]
                          focus-within:border-clear"
              >
                <label className="">
                  <div className="flex flex-row absolute w-[438px]">
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
                      <span className="">{name.length}/50</span>
                    </div>
                  </div>
                  <div className="label-signup">
                    <input
                      type="text"
                      className="input-signup"
                      maxLength={50}
                      placeholder=" "
                      required
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                </label>
              </div>
            </div>

            <div className="py-[12px] px-0">
              <div
                className="border-[1px] border-greyBorder rounded-[4px] group 
                            focus-within:outline focus-within:outline-blue focus-within:outline-[2px]
                            focus-within:border-clear"
              >
                <label>
                  <div className="flex flex-row absolute w-[438px]">
                    {email.length > 0 ? (
                      <div className="input-name-text-signup">
                        <span>Email</span>
                      </div>
                    ) : (
                      <div className="input-name-signup">
                        <span>Email</span>
                      </div>
                    )}
                    <div className="input-counter hidden group-focus-within:block">
                      <span className="">{email.length}/50</span>
                    </div>
                  </div>
                  <div className="label-signup">
                    <input
                      required
                      type="email"
                      className="input-signup"
                      maxLength={50}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </label>
              </div>
            </div>

            <div className="mt-[20px] flex flex-col">
              <div>
                <span className="text-[15px] leading-[20px] font-bold">Date of birth</span>
              </div>
              <div>
                <span className="text-[14px] leading-[16px] text-greyTxt">
                  This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet,
                  or something else.
                </span>
              </div>

              <div className="flex">
                <div className="my-[16px] flex flex-row w-full">
                  <div className="select-signup-container grow-[2] mr-[11px] group">
                    <label htmlFor="month" className="select-label-signup">
                      Month
                    </label>
                    <select
                      required
                      name="month"
                      id="month"
                      className="select-signup"
                      onChange={(e) => {
                        setMonth(Number(e.target.value));
                      }}
                    >
                      <option value="" disabled selected />
                      <option value="01">Janurary</option>
                      <option value="02">Feburary</option>
                      <option value="03">March</option>
                      <option value="04">April</option>
                      <option value="05">May</option>
                      <option value="06">June</option>
                      <option value="07">July</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </div>

                  <div className="select-signup-container grow mr-[11px] group">
                    <label htmlFor="day" className="select-label-signup">
                      Day
                    </label>
                    <select
                      required
                      name="day"
                      id="day"
                      className="select-signup"
                      onChange={(e) => {
                        setDay(Number(e.target.value));
                      }}
                    >
                      <option value="" disabled selected />
                      {days}
                    </select>
                  </div>

                  <div className="select-signup-container grow group">
                    <label htmlFor="year" className="select-label-signup">
                      Year
                    </label>
                    <select
                      required
                      name="year"
                      id="year"
                      className="select-signup"
                      onChange={(e) => {
                        setYear(Number(e.target.value));
                      }}
                    >
                      <option value="" disabled selected />
                      {years}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col px-[80px]">
          <button
            disabled={!month || !day || !year || !name || !email}
            className="my-[23px] bg-black text-white h-[49px] w-full rounded-full text-[16px] leading-[19px] font-bold disabled:opacity-75"
            type="button"
            onClick={() => {
              if (setNewUserData)
                setNewUserData({
                  name,
                  email,
                  birthdate: new Date(year, month - 1, day),
                });
              if (setSignupPage) setSignupPage(2);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
