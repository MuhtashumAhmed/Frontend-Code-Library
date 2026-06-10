"use client";


import { GuardIcon, NoteIcon2 } from "@/Icons/KYCIcons";
import Image from "next/image";
import { useFormContext, useWatch } from "react-hook-form";
const repaymentOptions = [
  {
    id: "pre-authorized",
    title: "Pre-authorized Debit",
    description: "Automated monthly withdrawals from linked account.",
  },
  {
    id: "manual",
    title: "Manual Repayment",
    description: "Manually pay via bank transfer or app each month.",
  },
];
const RepaymentMethod = () => {
  const {
    register,
    control,


    setValue,
    formState: { errors },
  } = useFormContext();


  const selectedMethod = useWatch({
    name: "repaymentMethod",
  });
  return (
    <div className="font-inter flex flex-col md:flex-row gap-6  ">
      <div className="flex-1 flex flex-col gap-6 ">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-9 w-9 bg-[#8083FF33] rounded-md ">
            <NoteIcon2 className="text-[#343B53]  " />
          </div>


          <h3 className="text-xl font-semibold text-[#343B53] ">
            Repayment Method
          </h3>
        </div>
        <div className="w-full max-w-[380px] space-y-3 font-inter">
          {repaymentOptions.map((option) => {
            const isSelected = selectedMethod === option.id;


            return (
              <div
                key={option.id}
                onClick={() =>
                  setValue("repaymentMethod", option.id, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  })
                }
                className={`
              flex cursor-pointer items-start gap-4
              rounded-[14px] border bg-white
              px-4 py-4 transition-all
              ${isSelected ? "border-[#EF4444]" : "border-[#D9D9D9]"}
            `}
              >
                {/* Radio Circle */}
                <div
                  className={`
                mt-1 flex h-5 w-5 items-center
                justify-center rounded-full border-2
                ${isSelected ? "border-[#EF4444]" : "border-[#0F172A]"}
              `}
                >
                  <div
                    className={`
                  h-2.5 w-2.5 rounded-full
                  ${isSelected ? "bg-[#EF4444]" : "bg-[#0F172A]"}
                `}
                  />
                </div>


                {/* Content */}
                <div>
                  <h3 className="text-[18px] font-semibold text-[#1E293B]">
                    {option.title}
                  </h3>


                  <p className="mt-1 text-[15px] leading-[20px] text-[#475569]">
                    {option.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* right */}
      <div className="flex-1 self-center md:self-auto ">
        <div className="lg:ml-10 flex flex-col  items-center justify-center bg-[#DADAF5] border-2 border-myRed rounded-[12px] p-6   h-[268px] w-[240px]   ">
          <div className="font-inter  flex flex-col  items-center justify-center ">
            <GuardIcon className="h-8 w-10 shrink-0  " />
            <h5 className="text-myRed font-semibold text-base mt-2">
              Secure Encryption
            </h5>
            <p className="text-[#0B1C30] text-sm  text-center mt-1.5  ">
              Your banking information is protected by bank-level AES- 256
              encryption. We do not store your raw credentials.
            </p>
          </div>


          {/* bottom */}
          <div className="mt-2.5 flex gap-4 px-2 bg-myWhite/40 opacity-50 ">
            <Image
              src="/KYC-form/secure-img-1.jpg"
              alt="image"
              height={32}
              width={32}
            />
            <Image
              src="/KYC-form/secure-img-2.jpg"
              alt="image"
              height={32}
              width={32}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default RepaymentMethod;
