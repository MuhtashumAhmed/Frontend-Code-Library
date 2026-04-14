// make sure to install sidebar compoentn from Shadcn UI

"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import Image from "next/image";
import Link from "next/link";

import { Code } from "@deemlol/next-icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { sidebarData } from "./appSidebarData";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  return (
    <Sidebar className="ring-sidebar-primary ring-1 h-full  " collapsible="icon">
      {/* <Sidebar className="  "> */}
      <SidebarHeader className=" border-b-2 ring-sidebar-primary border-sidebar-primary ">
        <DropdownMenu>
          <DropdownMenuTrigger className=" outline-0 ">
            {" "}
            <div className="flex items-center justify-between p-1  ">
              <div className="flex items-center gap-1.5 ">
                <Image
                  src="/profile.jpg"
                  alt="profile"
                  height={32}
                  width={32}
                  className="rounded-full"
                />

                <h2 className="font-extrabold group-data-[collapsible=icon]:hidden  ">
                  DashB
                </h2>
              </div>
              {/* icon */}
              <Code
                className="text-sm rotate-90 group-data-[collapsible=icon]:hidden     "
                size={14}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-3 mt-2 w-3xs bg-background ">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Setting</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>

      {/* ======== side bar main links or content ======= */}
      <SidebarContent className="">
        {sidebarData?.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon; // Capital variable

                  // console.log(item?.children);
                    const path = usePathname();
                  let active = path === item.url;

                  if (item?.children) {
                    return (
                      <SidebarMenuItem key={item.name}>
                        <Collapsible className="group/collapsible group-data-[collapsible=icon]:hidden">
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                              {Icon && <Icon className="h-4" />}
                              <span>{item.name}</span>
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            {/* left line come from sidebarMenuSub */}
                            <SidebarMenuSub>
                              {item?.children?.map((child) => {
                                const ChildIcon = child.icon;

                                return (
                                  <Link
                                    key={child.name}
                                    href={child?.url}
                                    className={`  `}
                                  >
                                    <SidebarMenuSubItem
                                      className={`flex items-center cursor-pointer gap-2 rounded-md px-2 py-1 text-sm hover:bg-primary hover:text-white `}
                                    >
                                      {ChildIcon && (
                                        <ChildIcon className="h-4" />
                                      )}

                                      {child.name}
                                    </SidebarMenuSubItem>
                                  </Link>
                                );
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </Collapsible>
                      </SidebarMenuItem>
                    );
                  }
                  // ==== Retrun normal links havning no child ============
                
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        className={`${
                          active
                            ? "bg-primary w-auto  hover:text-white text-white hover:bg-primary "
                            : "hover:bg-primary hover:text-white"
                        } `}
                      >
                        {/* <Link href="#"> */}
                        <Link href={item?.url}>
                          {Icon && <Icon className="mr-2 h-4 w-4" />}

                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="text-center text-xs text-gray-900/50 dark:text-gray-300/40 group-data-[collapsible=icon]:hidden">
        admin@dashboard.dash
      </SidebarFooter>
    </Sidebar>
  );
}
