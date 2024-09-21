"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/actions/logout";
//import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage =  () => {
    //const user =  useCurrentUser();

    const onClick = () => {
       logout()
    }
    
    return ( 
        <div className="bg-white p-10 rounded-xl">
            
            
                <Button onClick={onClick} type="submit">
                    signOut
                </Button>
           
        </div>
     );
}
 
export default SettingsPage;