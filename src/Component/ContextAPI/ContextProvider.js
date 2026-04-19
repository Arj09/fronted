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
    const [paymentID, setPaymentID] = useState()
   const [orderDetail, setOrderDetail]= useState()
    const [orderID, setOrderID] = useState({})
    const [user, setUser] = useState()
     
  
    
    
    return(
        <UserContext.Provider value={{paymentID,user, setUser, orderDetail, setOrderDetail,  setPaymentID,orderID, setOrderID,  productID, sub, setSub , setProductID,  productEdit, setProductedit, editProductID, setEditproductID ,search, setSearch, login, setLogin, data, setData, noofProduct, setnoofProduct, cartID, setCartID}}>
        {children}
        </UserContext.Provider>
    )
}

