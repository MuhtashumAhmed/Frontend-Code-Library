// main form Page where show all steps adn make layout design
// like left imaeg right form etc
// ---------------- 'content'  ki jagha compleet form component send hoga ok lik:
//  content : ()=> <UserDetail />  
//  content : ()=> <PaymentDetail />  
//  content : ()=> <ReviewDetail />  

// Main page file (where to use)
import Stepper from "@/components/AI/Stepper";
import { Banknote, UserIcon } from "lucide-react";

const Page = () => {
  const steps = [
    {
      title: "Account",
      content: <div>Create your account</div>,
      icon: <UserIcon />,
    },
    {
      title: "Profile",
      content: <div>Fill profile info</div>,
      icon: <UserIcon />,
    },
    {
      title: "Payment",
      content: <div>Add payment method</div>,
      icon: <Banknote />,
    },
    {
      title: "Finish",
      content: <div>Done 🎉</div>,
      icon: <UserIcon />,
    },
  ];

  return (
    <div className="p-8">
      <Stepper steps={steps} orientation="horizontal" />
    </div>
  );
};

export default Page;

