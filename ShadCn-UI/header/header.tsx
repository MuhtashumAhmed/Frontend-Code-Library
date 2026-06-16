import DesktopNav from "@/components/header-sahdcn/DesktopNav";
import MobileNav from "@/components/header-sahdcn/MobileNav";
import Link from "next/link";


const page = () => {
  return (
    <>
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">Logo</Link>


          <DesktopNav />


          <MobileNav />
        </div>
      </header>
    </>
  );
};


export default page;
