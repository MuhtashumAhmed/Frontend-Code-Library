import Link from "next/link";
import HeroBackground from "../HeroBackground";
const HomeHero = () => {
  return (
    <section className="relative min-h-screen lg:h-screen min-h-[calc(100vh-20px)]  rounded-2xl overflow-hidden">
      <HeroBackground
        desktopImg="/home/hero-bg-Square-2.jpg"
        mobileImg="/home/hero-=bg-rectangle-2.jpg"
      />

      {/* content */}

      {/* left */}
      <div className=" absolute top-[3%] sm:top-[10%] 2xl:top-[30%]  mx-auto xl:max-w-[69.5%] w-full  pb-4 flex flex-col lg:gap-4  justify-between  xl:ml-4  xl:min-h-[500px] ">
        <h1 className="hero-heading text-2xl! px-1 sm:px-0 sm:text-3xl lg:text-6xl! text-center xl:text-left lg:leading-16.5 mb-1 sm:mb-4 lg:mb-18 w-full  lg:max-w-6xl  ">
          main hero ehading
        </h1>

        {/* button on mobile hidden  */}
        <div className="flex flex-col  2xl:flex-row justify-between items-center gap-3 hidden   lg:block  ">
          <div className="flex flex-col  md:flex-row  items-center gap-4 py-9 ">
            <Link
              href="coworking-space"
              className="primary-button text-myWhite leading-12  "
            >
              Explore Co-Working & Offices
            </Link>

            <Link
              href="virtual-offices"
              className=" secondary-button !font-bold !border-myWhite !text-myBlack !bg-myWhite hover:!bg-transparent hover:!text-myWhite leading-0 rounded-[50px] py-6 "
            >
              View Virtual Business Packages
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
