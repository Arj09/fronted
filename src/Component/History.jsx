import React, { useEffect, useState } from "react";
import { Navbar1 } from "./Navbar1";
import { Http } from "./Http";




export const History = ()=>{

    const [order, setOrder] = useState([])

    const url = Http.getUri()

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

    console.log(Http.getUri())

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
                            
                            {
                                data.ItemStore.map((data)=>{
                                    return(
                                        <div className=" w-[400px] h-[450px] rounded  border-2 border-gray-100  mx-auto  ">
                                            <div className=" w-full bg-gray-100 h-72 rounded ">
                                                <img alt="loading" src={`${Http.getUri()}/images/${data.image} ` } className="  w-4/5 h-full mx-auto py-6 bg-none   mix-blend-multiply object-contain"/>
                                            </div>
                                            <div className=" flex flex-col pl-5 pt-5  ">
                                                <text className="">{data.name}</text>
                                                <text>{`Quantity : ${data.quantity}`}</text>
                                                <text>{`Price : ${data.price}`}</text>
                                                

                                            </div>
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