import { configureStore } from "@reduxjs/toolkit"
import menuReducer from "@/redux/features/menu/menuSlice"
export const makeStore = () => {
  return configureStore({
    reducer: {
      menu: menuReducer,
    }
  })
}
// types
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
