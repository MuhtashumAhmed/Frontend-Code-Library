import { House } from "@deemlol/next-icons";
import { Users } from "@deemlol/next-icons";
import { Settings } from "@deemlol/next-icons";
import { Calendar } from "@deemlol/next-icons";
import { Search } from "@deemlol/next-icons";
import { AppWindowMac } from "@deemlol/next-icons";
import { DollarSign } from "@deemlol/next-icons";
import { ChevronDown } from "@deemlol/next-icons";
import { FC, SVGProps } from "react";

export interface sidebarGroup {
  label: string;
  items: sidebarItems[];
}

export interface sidebarItems {
  name: string;
  url?: string | undefined | any;
  icon?: FC<SVGProps<SVGSVGElement>>;
  children?: sidebarItems[];
}
export const sidebarData: sidebarGroup[] = [
  {
    label: "Application",
    items: [
      {
        name: "Home",
        url: "/",
        icon: House,
      },
      {
        name: "Index",
        url: "/index",
        icon: AppWindowMac,
      },
      {
        name: "Calendar",
        url: "/calendar",
        icon: Calendar,
      },
      {
        name: "Search",
        url: "/search",
        icon: Search,
      },
      {
        name: "Settings",
        url: "/settings",
        icon: Settings,
      },
    ],
  },
  {
    label: "List",
    items: [
      {
        name: "See All Users",
        url: "/all-users",
        icon: Users,
      },
      {
        name: "See all payments",
        url: "/all-payments",
        icon: DollarSign,
      },
    ],
  },
  {
    label: "Collepsable",
    items: [
      {
        name: "Documentation",
        url: "/",
        icon: ChevronDown,
        children: [
          {
            name: "Indroduction",
            url: "/introduction",
            // icon: Users,
          },
          {
            name: "Get Started",
            url: "/",
            // icon: Users,
          },
          {
            name: "Tutorials",
            url: "/",
            // icon: Users,
          },
        ],
      },
    ],
  },
];
