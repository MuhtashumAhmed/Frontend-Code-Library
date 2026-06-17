 "use client";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCreateBranchModal } from "@/redux/services/modal/modalSlice";
import CreateBranchDialog from "./CreateBranchDialog";
const CenterCreateNewBranchCard = () => {
  const dispatch = useDispatch();
  const open = useSelector(
    (state: RootState) => state.modal.isCreateBranchModalOpen,
  );
  return (
    <>
      <div className="border border-dashed border-[#C7C4D7] bg-[#FFFFFFD9] rounded-lg p-6 flex flex-col items-center justify-center   ">
        <button
          onClick={() => dispatch(setCreateBranchModal(true))}
          className="h-16 w-16 bg-myWhite hover:bg-myWhite/75 cursor-pointer mb-4 border border-[#C7C4D7] rounded-full grid place-content-center"
        >
          <Plus className="text-myRed" />
        </button>
        <Dialog
          open={open}
          onOpenChange={(value) => dispatch(setCreateBranchModal(value))}
        >
          <CreateBranchDialog />
        </Dialog>
        <h4 className="text-myBluishColor text-xl font-semibold text-center ">
          Expand Reach
        </h4>
        <p className="mt-2 text-myDarkGray text-sm  text-center lg:w-sm">
          Initialize a new branch office to begin servicing a new territory.
        </p>
      </div>
    </>
  );
};


export default CenterCreateNewBranchCard;
