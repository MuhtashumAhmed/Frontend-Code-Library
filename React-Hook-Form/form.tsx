// npm i react-hook-form 
// npm install zod @hookform/resolvers


"use client";
import MyInput from "../MyInput";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-phone-input-2/lib/style.css";
import { Checkbox } from "@/components/ui/checkbox";
import {
  contactFormSchema,
  ContactFormValues,
} from "@/validation/contactFormSchema";
import PhoneInput from "react-phone-input-2";


const ContactForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful, isValid, isSubmitting },
  } = useForm<ContactFormValues>({
    mode: "onChange",
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      privacyPolicy: true,
    },
  });


  const onSubmit = (data: ContactFormValues) => {
    console.log(data);
    reset();
  };
return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="my-10 bg-myWhite p-8 md:p-14 lg:p-20 rounded-[50px] space-y-4"
    >
      {/* Name */}
      <MyInput
        label="Your Name *"
        placeholder="Enter your name"
        register={register("name")}
        error={errors.name}
      />
  {/* Email + Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <MyInput
          label="Your Email *"
          type="email"
          placeholder="Enter your email"
          register={register("email")}
          error={errors.email}
        />
        <div>
          <label
            className={`text-sm capitalize text-myDeepViolet font-medium font-inter`}
          >
            Phone Number
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                country={"us"}
                value={field.value}
                onChange={(value) => field.onChange("+" + value)}
                inputClass="!w-full !h-[40px] border border-myGreen/45! rounded-[20px]! px-3 py-7 w-full outline-none focus:ring-1 focus:ring-myGreen bg-transparent! "
                searchClass="py-6  "
                buttonClass="rounded-l-[20px]! focus:ring-1 focus:ring-myGreen border border-myGreen/45! "
              />
            )}
          />
        </div>
      </div>


      {/* Privacy Policy Checkbox */}
      <div className="flex items-center gap-2">
        <Controller
          name="privacyPolicy"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="privacy"
              checked={field.value}
              onCheckedChange={field.onChange}
              className="rounded-full  data-[state=checked]:bg-myGreen
    data-[state=checked]:border-myGreen
    data-[state=checked]:text-myWhite  "
            />
          )}
        />
        <label
          htmlFor="privacy"
          className="text-lg font-inter text-myDeepViolet"
        >
          I agree to the privacy policy
        </label>
      </div>


      {errors.privacyPolicy && (
        <p className="text-red-700 font-inter text-sm">
          {errors.privacyPolicy.message}
        </p>
      )}


      {/* Submit */}
      <button
        type="submit"
        className="primary-button py-8! leading-0! rounded-[24px]! disabled:opacity-20 disabled:cursor-not-allowed! disabled:shadow-none! "
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? "sending..." : "Send Message"}
      </button>
    </form>
  );
};


export default ContactForm;
