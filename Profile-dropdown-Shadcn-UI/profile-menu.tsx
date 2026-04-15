
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React from 'react'

const profileDropdownMenu = () => {
  return (
    <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/*  Makes Avatar the trigger */}
                  <div className="cursor-pointer">
                    <FaCircleUser className="" size={30} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2 mr-4 p-2">
                  {/* Optional: set width */}
                  <Link href="/user-subscription">
                    <DropdownMenuItem className="font-poppins text-sm ">
                      {/* <UserIcon className="mr-2 h-4 w-4" /> */}
                      User Subscriptions
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="bg-myBrown/85 text-myCream hover:bg-myBrown cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOutIcon className="mr-2 h-4 w-4 text-myCream " />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
  )
}

export default profileDropdownMenu



