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
    const [editProductID, setEditproductID] = useState()
    const [productEdit, setProductedit] = useState(false)
    const [productID , setProductID] = useState("all")
    const [sub, setSub] = useState([])
     
  
    
    
    return(
        <UserContext.Provider value={{ productID, sub, setSub , setProductID,  productEdit, setProductedit, editProductID, setEditproductID ,search, setSearch, login, setLogin, data, setData, noofProduct, setnoofProduct, cartID, setCartID}}>
        {children}
        </UserContext.Provider>
    )
}

