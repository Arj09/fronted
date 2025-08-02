import React, { useEffect, useState } from "react";
import { Navbar1 } from "./Navbar1";
import { Http } from "./Http";
import { useNavigate, Link } from "react-router-dom";




export const History = ()=>{

    const [order, setOrder] = useState([])
    const navigate = useNavigate()

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

   const handleBack = ()=>{
     navigate("/profile")
   }

    return(
        <>
        <div className=" flex flex-row bg-orange-500 w-full mb-5 p-3 ">
             <button className=" px-3 py-2 text-orange-500 bg-white rounded" onClick={handleBack}>Back</button>
        </div>
        <div className=" flex flex-col   mx-auto w-4/5 rounded   ">
            {
                order.map((data, index)=>{
                    return(
                        <div className=" w-4/5 flex flex-col gap-2 p-2 my-5  rounded   mx-auto  ">
                            
                            <div className=" w-5/5 flex flex-col p-3 bg-orange-500  text-white">
                            <text>{`Order Date : ${data.order_date}`}</text>
                            <text>{`Order Status : ${data.order_status}`}</text>
                            </div>
                            
                            {
                                data.ItemStore.map((data)=>{
                                    return(
                                        <div className=" flex flex-col w-full rounded border-2">
                                            <div className=" w-5/5 h-[120px] bg-gray-100  rounded ">
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
                            <text className=" rounded bg-orange-500 text-white flex flex-row justify-end p-3">{`Total amount : ${data.bill}`}</text>
                            



                        </div>
                    )

                })
            }
        </div>
        </>
    )
}