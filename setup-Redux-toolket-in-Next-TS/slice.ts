import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPlans } from "@/services/plansApi";
import { PlansApiResponse, PlansState } from "@/types/planTypes";

// Async thunk
// export const fetchPlans = createAsyncThunk<PlansApiResponse, string>(
//   "plans/fetchPlans",
//   async (planType, thunkAPI) => {
//     try {
//       const data = await getPlans(planType);
//       return data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// Initial state
const initialState: PlansState = {
  plans:  null, // 
  loading: false,
  error: null,
};

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload; // <- PlansApiResponse
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default plansSlice.reducer;