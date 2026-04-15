// image place on background and then put all content onto image (text ,button etc)

import Link from "next/link";
import { Button } from "../ui/button";
import { handleGoToForm } from "@/utils/extra";

const MedicalOfficeHeroPage = () => {
  return (
    <main
      className="min-h-screen w-full my-5 rounded-2xl
    bg-zinc-700 "
    >
      {/* Content top on image */}
      <div className=" flex flex-col items-start justify-center h-full container mx-auto p-4 text-white ">
        <h1 className="hero-heading font-merriweather  font-bold mb-4 lg:mb-0 lg:mt-16 max-w-5xl leading-9 lg:leading-16 ">
          Min Heading
        </h1>
        <p className="mb-6 text-base md:text-lg lg:my-8 max-w-3xl font-poppins hidden lg:block ">
          any pargraph
        </p>

        {/* CTA Buttons */}
        <div className="hidden lg:flex  gap-4">
          <Button
            onClick={handleGoToForm}
            className=" px-6! lg:px-8!  py-3 primary-button   rounded-md font-semibold transition duration-300"
          >
            Book a Tour
          </Button>
          <Link
            href="contact-us"
            className=" px-6! lg:px-8!  py-3 bg-myWhite!   primary-button text-black hover:bg-gray-200! rounded-md font-semibold transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
};

export default MedicalOfficeHeroPage;
