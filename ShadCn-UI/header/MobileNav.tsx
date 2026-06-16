import Link from "next/link";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { navItems } from "@/app/header/page";


const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>


      <SheetContent side="right">
        <div className="mt-8">
          {navItems.map((item) =>
            item.children ? (
              <Accordion key={item.title} type="single" collapsible>
                <AccordionItem value={item.title}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>


                  <AccordionContent>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-2 pl-4"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link key={item.href} href={item.href!} className="block py-2">
                {item.title}
              </Link>
            ),
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};


export default MobileNav;
