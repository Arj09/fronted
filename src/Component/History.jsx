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
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])



    return(
        <>
        <Navbar1/>
        <div className=" flex flex-col lg:absolute top-0  right-0  bg-orange-500    w-full   lg:w-10/12">
            {
                order.map((data, index)=>{
                    return(
                        <div className=" flex flex-col gap-3 p-5 ">
                            
                            <div className=" flex flex-row justify-between p-3 bg-red-800  text-white">
                            <text>{`Order date : ${data.order_date}`}</text>
                            <text>{`Order status : ${data.order_status}`}</text>
                            </div>
                            <div className=" flex flex-row justify-between bg-blue-700 text-white p-2">
                                <text>Item Name</text>
                                <text>Quantity</text>
                                <text>Price</text>

                            </div>
                            {
                                data.ItemStore.map((data)=>{
                                    return(
                                        <div className=" flex flex-row justify-between bg-red-600 text-white p-2 ">
                                            <text>{data.name}</text>
                                            <text>{data.quantity}</text>
                                            <text>{data.price}</text>
                                        </div>

                                    )
                                })
                            }
                            <text className=" bg-red-600 text-white flex flex-row justify-end p-3">{`Total amount : ${data.bill}`}</text>
                            



                        </div>
                    )

                })
            }
        </div>
        </>
    )
}