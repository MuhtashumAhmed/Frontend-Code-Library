import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface FormState {
  currentStep: number;
  totalSteps: number;
  formData: any;
}

const initialState: FormState = {
  currentStep: 0,
  totalSteps: 4,
  formData: {
    step1: {},
    step2: {},
    step3: {},
  },
};
interface updateFormDataInterface {
  step: string;
  data: any;
}

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentStep < state.totalSteps - 1) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    goToStep: (state, action: PayloadAction<number>) => {
      const step = action.payload;
      if (step >= 0 && step < state.totalSteps) {
        state.currentStep = step;
      }
    },
    saveFormData: (state, action: PayloadAction<updateFormDataInterface>) => {
      const { step, data } = action.payload;
      state.formData[step] = data;
    },
    resetForm: () => initialState,
  },
});

export const { nextStep, prevStep, goToStep, saveFormData, resetForm } =
  formSlice.actions;
export default formSlice.reducer;
