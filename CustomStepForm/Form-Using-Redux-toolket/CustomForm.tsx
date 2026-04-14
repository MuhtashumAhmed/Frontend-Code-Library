// main file show UI
// step 1 ,2 and 3 they are just compoennt ok just have single component to show how to make ok
// every step have its own func won buttons and have own API call ok
// use update func or satue use React hook form instead local states

import Stepper from "../components/customForm/Stepper";
import Step1 from "../components/customForm/Step1";
import Step2 from "../components/customForm/Step2";
import Step3 from "../components/customForm/Step3";
import { PiUserCircleDuotone, PiUserCircleGearDuotone } from "react-icons/pi";
import { GiBanknote } from "react-icons/gi";
import { BsActivity } from "react-icons/bs";

const steps = [
  {
    title: "Account",
    content: <Step1 />,
    icon: <PiUserCircleDuotone />,
  },
  {
    title: "Profile",
    content: <Step2 />,
    icon: <BsActivity />,
  },
  {
    title: "Payment",
    content: <Step3 />,
    icon: <GiBanknote />,
  },
  {
    title: "Finish",
    content: (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-green-600">Done 🎉</h2>
        <p>Form submitted successfully!</p>
      </div>
    ),
    icon: <PiUserCircleGearDuotone />,
  },
];

const CustomForm = () => {
  // console.log(useSelector(state => state.form))
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Stepper steps={steps} />
    </div>
  );
};

export default CustomForm;
