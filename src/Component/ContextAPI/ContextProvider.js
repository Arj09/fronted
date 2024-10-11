import React, { useState } from "react";
import {UserContext} from "./context";

export const UserContextProvider = ({children}) => {
    const [login, setLogin] = useState(false)
    const [data, setData] = useState(true)
    const [noofProduct, setnoofProduct] = useState(0)
    const [show, setShow] = useState(false)
    const [navOn, setNavOn] = useState(false)
    const [cartID, setCartID] = useState("") 
    const [search, setSearch] = useState("all")
    const [item, setItem] = useState()
  
    const [mutlisector, setmultisector] = useState("")
    const [category1, setCategory1] = useState("all")
   
 
    
    return(
        <UserContext.Provider value={{mutlisector,setmultisector, category1, setCategory1,search, setSearch, login, setLogin, data, setData, noofProduct, setnoofProduct, cartID, setCartID}}>
        {children}
        </UserContext.Provider>
    )
}

