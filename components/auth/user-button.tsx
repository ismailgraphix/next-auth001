"use client";
import { FaUser } from "react-icons/fa";
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,

 } from "../ui/dropdown-menu";
 import { Avatar,
    AvatarImage,
    AvatarFallback,
  } from "@radix-ui/react-avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./logout-buttton";
import { ExitIcon } from "@radix-ui/react-icons";


  export const UserButton = () => {
    const user = useCurrentUser();
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src={user?.image || "undefined"}/>
                        <AvatarFallback className="bg-sky-500">
                            <FaUser className="text-white"/>
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                    <LogoutButton>
                        <DropdownMenuItem>
                            <ExitIcon className="h-4 w-4 mr-2"/>
                            Logout
                        </DropdownMenuItem>
                    </LogoutButton>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
  }