import { BankIcon, QuestionIcon } from "@/Icons/KYCIcons";
import { Controller, useFormContext } from "react-hook-form";
import MyInput from "../MyInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";


const BankDetails = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="font-inter">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center h-9 w-9 bg-[#8083FF33] rounded ">
          <BankIcon className="" />
        </div>
        <h3 className="text-xl font-semibold text-[#343B53] ">
          Primary Bank Account
        </h3>
      </div>
      {/* inputs */}
      <div className="mt-8 flex flex-col lg:flex-row w-full gap-6">
        <div className="flex flex-col flex-1 ">
          <label
            htmlFor=""
            className="font-inter font-semibold  text-sm mb-1.5"
          >
            Bank Name *
          </label>
          <Controller
            name="bankName"
            control={control}
            render={({ field }) => (
              <div>
                <Select
                  value={field.value ?? undefined}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    className={`flex-1 w-full h-14! font-inter rounded-[8px] [&>span[data-placeholder]]:text-[#CABBBB] bg-myWhite border ${errors.bankName ? "border-red-500" : "border-[#CCCCE9]/45"}`}
                  >
                    <SelectValue placeholder="Select your  bank" />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="font-inter text-base"
                  >
                    <SelectItem value="toronto_dominion_bank">
                      Toronto-Dominion Bank
                    </SelectItem>
                    <SelectItem value="national_bank_of_nova_scotia">
                      Bank of Nova Scotia
                    </SelectItem>
                    <SelectItem value="national_bank_of_canada">
                      National Bank of Canada
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.bankName && (
                  <p className="text-red-700 text-sm mt-1">
                    {errors.bankName.message as string}
                  </p>
                )}
              </div>
            )}
          />
        </div>
        <Controller
          name="accountNumber"
          control={control}
          render={({ field }) => (
            <MyInput
              label="Account Number"
              placeholder="e.g. Acme Corp Inc."
              labelClassName="text-myBlack font-semibold"
              containerClassName="flex-1"
              className="rounded-[8px]!"
              value={field.value}
              onChange={field.onChange}
              error={errors.accountNumber}
            />
          )}
        />
      </div>
      <div className="mt-8 flex flex-col lg:items-center lg:flex-row w-full gap-6">
        <Controller
          name="transitNumber"
          control={control}
          render={({ field }) => (
            <MyInput
              label="Transit / Routing Number"
              placeholder="e.g. 9 - digit number"
              labelClassName="text-myBlack font-semibold"
              containerClassName="flex-1"
              className="rounded-[8px]!"
              value={field.value}
              onChange={field.onChange}
              error={errors.transitNumber}
            />
          )}
        />
        <div className="flex-1 flex gap-2 text-myRed italic items-center lg:mt-4 text-sm  ">
          <QuestionIcon className="text-myRed shrink-0  h-4 w-4 " />
          Funds will be deposited within 24-48 hours after approval.
        </div>
      </div>
    </div>
  );
};


export default BankDetails;
