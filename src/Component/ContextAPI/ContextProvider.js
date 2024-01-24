import React, { useState } from "react";
import {UserContext} from "./context";

export const UserContextProvider = ({children}) => {
    const [login, setLogin] = useState(false)
    const [data, setData] = useState(true)
   
 
    
    return(
        <UserContext.Provider value={{ login, setLogin, data, setData}}>
        {children}
        </UserContext.Provider>
    )
}

