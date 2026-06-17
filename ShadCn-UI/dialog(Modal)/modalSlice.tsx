import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ModalState {
    isCreateBranchModalOpen: boolean;
}


const initialState: ModalState = {
    isCreateBranchModalOpen: false,
};


const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openCreateBranchModal: (state) => {
            state.isCreateBranchModalOpen = true;
        },


        closeCreateBranchModal: (state) => {
            state.isCreateBranchModalOpen = false;
        },


        setCreateBranchModal: (state, action: PayloadAction<boolean>) => {
            state.isCreateBranchModalOpen = action.payload;
        },
    },
});


export const {
    openCreateBranchModal,
    closeCreateBranchModal,
    setCreateBranchModal,
} = modalSlice.actions;


export default modalSlice.reducer;
