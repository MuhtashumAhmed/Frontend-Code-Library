
"use client"
 import { Controller } from "react-hook-form"
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select"

type Option = {
 label: string
 value: string
}

interface MySelectProps {
 options: Option[]
 placeholder?: string
 disabled?: boolean

 // RHF mode
 value?: string
 onChange?: (value: string) => void

 // optional RHF support flag (not required but clean)
 useRHF?: boolean
 control?: any
 name?: string
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
}: MySelectProps) {

  // RHF MODE
  if (useRHF && control && name) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    )
  }

  // NORMAL STATE MODE
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
