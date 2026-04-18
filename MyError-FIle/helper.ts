// handleApiError.ts
// utils/handleApiError.ts
import { MyErrors } from "@/constants/errors";
import { toast } from "sonner"; // ya jo use kr rhe ho
export const handleApiError = (error: unknown, fallback?: string) => {
  const errorMessage = (error as any)?.message;
  const errorText =
    errorMessage &&
    typeof errorMessage === "string" &&
    Object.keys(MyErrors).includes(errorMessage)
      ? MyErrors[errorMessage as keyof typeof MyErrors]
      : null;
  toast.error(errorText || fallback || "Something went wrong");
};


export const handleApiSuccess = (message: string, fallback?: string) => {
const successText =
MyErrors[message as keyof typeof MyErrors] || fallback;

toast.success(successText);
};


// =========== How to use it (example) ===================
const onSubmit = async (data: LoginFormType) => {
  try {
//     Api Call here 

    handleApiSuccess(
      res?.message,
      "Verification code resent to your email."
    );

    
  } catch (error) {
    handleApiError(error, "Login failed. Please try again.");
  }
};