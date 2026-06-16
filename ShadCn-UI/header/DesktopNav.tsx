import { navItems } from "@/app/header/page";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import Link from "next/link";


const DesktopNav = () => {
  return (
 <nav className="hidden md:flex items-center gap-6">
  {navItems.map((item) =>
    item.children ? (
      <NavigationMenu key={item.title}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {item.title}
            </NavigationMenuTrigger>


            <NavigationMenuContent>
              <ul className="w-44 p-3 [&_li]:hover:text-blue-400 border rounded-md">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link href={child.href}>
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ) : (
      <Link key={item.href} href={item.href}>
        {item.title}
      </Link>
    )
  )}
</nav>
  );
};


export default DesktopNav;
