import React, { useState } from "react";
import {UserContext} from "./context";

export const UserContextProvider = ({children}) => {
    const [login, setLogin] = useState(false)
    const [data, setData] = useState(true)
    const [noofProduct, setnoofProduct] = useState(0)
    const [show, setShow] = useState(false)
    const [navOn, setNavOn] = useState(false)
   
 
    
    return(
        <UserContext.Provider value={{ login, setLogin, data, setData, noofProduct, setnoofProduct}}>
        {children}
        </UserContext.Provider>
    )
}

