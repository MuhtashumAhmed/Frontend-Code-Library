import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSLice";

export const store = () => {
  return configureStore({
    reducer: {
      form: formReducer,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
