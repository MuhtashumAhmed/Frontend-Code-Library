// must use React Hook Form ======
// have text,passowrd,email . aslo support teast area if uss ------ as = "textarea" ----

"use client";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  label?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  containerClassName?: string;
  labelClassName?: string;
  textAreaClassName?: string;
  as?: "input" | "textarea";
  icon?: ReactNode;
  footerIcon?: ReactNode;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

const MyInput = ({
  label,
  type = "text",
  register,
  error,
  containerClassName = "",
  labelClassName = "",
  className = "",
  textAreaClassName = "",
  icon,
  footerIcon,
  as = "input",
  ...props
}: InputProps) => {
  const [isPasswordShow, setisPasswordShow] = useState(false);
  const inputType =
    type === "password" ? (isPasswordShow ? "text" : "password") : type;
  return (
    <div className={`flex flex-col gap-1 ${containerClassName}`}>
      {label && (
        <label className={`text-sm font-medium font-poppins ${labelClassName}`}>
          {label}
        </label>
      )}

      <div className="relative">
        {as === "textarea" ? (
          <textarea
            className={`border border-myBrown/85 rounded px-3 py-2 w-full outline-none focus:ring-1 focus:ring-myBrown ${textAreaClassName}`}
            {...register}
            {...props}
          />
        ) : (
          <>
            {icon && (
              <span className="block  absolute left-1 top-1/2 -translate-y-1/2 pointer-events-none  ">
                {icon}
              </span>
            )}

            <input
              type={inputType}
              className={`border border-myBrown/85 rounded px-3 py-2 w-full outline-none focus:ring-1 focus:ring-myBrown ${icon ? "pl-10" : ""} ${className}`}
              {...register}
              {...props}
            />
            {footerIcon && (
              <span className="block border cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none  ">
                {footerIcon}
              </span>
            )}
          </>
        )}
        {type === "password" ? (
          <span
            onClick={() => setisPasswordShow((prev) => !prev)}
            className="block cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
          >
            {isPasswordShow ? <EyeClosedIcon /> : <EyeIcon />}
          </span>
        ) : (
          footerIcon && (
            <span className="block cursor-pointer absolute right-3 top-1/2 -translate-y-1/2">
              {footerIcon}
            </span>
          )
        )}
      </div>

      {error && (
        <p className="text-red-700 text-sm text-left capitalize ">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default MyInput;


// ================ Usage guide =================
 <MyInput
            className="rounded-xl"
            label="Email Address"
            type="email"
            placeholder="john.doe@example.com"
            register={registerExisting("email")}
            error={errorsExisting.email}
          />
<MyInput
              className="rounded-xl"
              label="Last Name"
              placeholder="e.g. Doe"
              register={registerNew("last_name")}
              error={errorsNew.last_name}
            />



