import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

interface FormSwitchProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  disabled?: boolean;
}

export function FormSwitch<T extends FieldValues>({
  control,
  name,
  disabled,
}: FormSwitchProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
          disabled={disabled}
        />
      )}
    />
  );
}