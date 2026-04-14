import { useState } from "react";
import { useStepNavigation } from "../../hooks/useStepNavigations";
import { saveFormData } from "../../redux/formSLice";

import { useAppDispatch, useAppSelector } from "../../hooks/extra";

const Step1 = () => {
  const dispatch = useAppDispatch()
  const { next, back, isFirstStep, isLastStep } = useStepNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  console.log(useAppSelector((state) => state.form.formData));

  // submit func
  const hadnleStep1 = () => {
    console.log();
    const data = {
      name,
      email,
    };
    dispatch(saveFormData({ step: "step1", data: data }))
    next();
  };

  return (
    <form className="space-y-4" onSubmit={hadnleStep1}>
      <h2 className="text-xl font-bold mb-4">Account Information</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          // value={formData.name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          // value={formData.email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
      </div>
      {/* buttons for form submit and back */}
      <div className="flex justify-between mt-4">
        <button
          onClick={back}
          disabled={isFirstStep}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Back
        </button>

        <button
          onClick={hadnleStep1}
          disabled={isLastStep}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step1;
