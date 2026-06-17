"use client";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


type Option = {
  label: string;
  value: string;
};


interface MySelectProps {
  options: Option[];
  placeholder?: string;
  disabled?: boolean;


  // RHF mode
  value?: string;
  onChange?: (value: string) => void;


  // optional RHF support flag (not required but clean)
  useRHF?: boolean;
  control?: any;
  name?: string;
  tiggerButtonClassname?: string;
  label?: string;
  labelClassName?: string;
}


export function MySelect({
  options,
  placeholder,
  disabled,
  value,
  onChange,
  useRHF,
  control,
  name,
  tiggerButtonClassname = "",
  label,
  labelClassName = "",
}: MySelectProps) {
  // RHF MODE
  if (useRHF && control && name) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="flex flex-col gap-1">
            <label
              className={`text-myDarkGray! text-xs! uppercase ${labelClassName} `}
            >
              {label}
            </label>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={disabled}
            >
              <SelectTrigger
                className={`w-full bg-[#EFF4FF] ${tiggerButtonClassname} `}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>


              <SelectContent position="popper" className="font-poppins">
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      />
    );
  }


  // NORMAL STATE MODE
  return (
    <div className="flex flex-col gap-1">
      <label
        className={`text-myDarkGray! text-xs! uppercase ${labelClassName} `}
      >
        {label}
      </label>


      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          className={`w-full bg-[#EFF4FF] ${tiggerButtonClassname}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>


        <SelectContent position="popper" className="font-poppins ">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}


