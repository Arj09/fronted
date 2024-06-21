import React, { useEffect, useState } from "react";
import { Navbar1 } from "./Navbar1";
import { Http } from "./Http";




export const History = ()=>{

    const [order, setOrder] = useState([])

    useEffect(()=>{
        Http.get("/api/order",{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }
        }).then((res)=>{
            setOrder(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    })
    return(
        <>
        <Navbar1/>
        <div className=" flex flex-col lg:absolute top-0  right-0  bg-orange-500 h-screen   w-full   lg:w-10/12">
            
            <div className=" flex flex-row mx-auto my-4 border-red-600 border-2 px-5 w-11/12 h-96 mt-10 justify-center text-white">
                <text className=" text-xl pt-44 w-full">
                    {
                        order.length == 0 && (
                            <text className=" flex flex-row justify-center mx-auto w-4/5">Order History is not available </text>
                        )
                    }
                </text>

            </div>
        </div>
        </>
    )
}