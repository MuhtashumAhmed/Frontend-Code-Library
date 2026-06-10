// Main parent component
"use client";
import BankDetails from "@/components/KYC/BankDetails";
import KYCSelectLoanAmount from "@/components/KYC/KYCSelectLoanAmount";
import RepaymentMethod from "@/components/KYC/RepaymentMethod";
import SelectLoanAmount from "@/components/KYC/SelectLoanAmount";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  setBankDetailsData,
  setLoanAmount,
} from "@/redux/services/kyc/kycSlice";
import {
  BankDetailsFormValues,
  BankDetailsSchema,
} from "@/validation/KYCFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const loanAmount: any = useAppSelector((state) => state.kyc.loan_amount);

  const methods = useForm({
    resolver: zodResolver(BankDetailsSchema as any),
    defaultValues: {
      accountNumber: "",
      bankName: "",
      loanAmount: Number(loanAmount) || 0,
      transitNumber: "",
      repaymentMethod: "pre-authorized",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = methods;
  console.log(errors);

  const onSubmit = async (data: BankDetailsFormValues) => {
    window.localStorage.setItem("kycBankDetailData", JSON.stringify(data));
    dispatch(setBankDetailsData(data));
    dispatch(setLoanAmount(data.loanAmount));

    // router.push("/apply-for-loan/verifications");
   
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>  
        <div className="mt-14 font-inter">
          <h2 className="font-bold text-3xl text-[#0B1C30]">Bank Details</h2>
          <p className="mb-6 text-base text-[#464555]  ">
            Provide your primary banking information for fund disbursement and
            secure repayment setups.
          </p>
          <div className=" bg-myWhite rounded-[12px] p-5 lg:p-8    border border-[#F1F5F9] min-h-62.5 z-50 ">
            <BankDetails />
          </div>
          {/* workspace address */}
          <div className="mt-10 bg-myWhite rounded-[12px] p-5 lg:p-8    border border-[#F1F5F9] min-h-62.5 z-50 ">
            <RepaymentMethod />
          </div>
        </div>

        {/* ---- buttons ------- */}
        <div className="mt-10 flex gap-4 bg-myWhite border font-inter border-[#777587] rounded-[12px] p-6  justify-between ">
          <button
            type="button"
            onClick={() => router.push("/apply-for-loan/employment-details")}
            className="hover:bg-myAliceBlue border border-[#E0E7FF]  text-myRed px-4 py-1.5 rounded-2xl cursor-pointer transition-all ease-in duration-200 "
          >
            Previous
          </button>

          <button
            type="submit"
            className={`primary-button rounded-full! leading-0 `}
          >
            Continue →
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default page;
