import { useEffect, useState } from "react";
import React from "react";
import { Navbar } from "../Navbar";
import { Http } from "../Http";



export const Order = ()=>{

    const [order, setOrder] = useState()



    useEffect(()=>{
                 Http.get("/api/order",{
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("Token")}`,
                    }
            
                }).then((res)=>{
                    console.log(res.data)
                    setOrder(res.data)
                   
                    
                    
                }).catch((err)=>{
                    console.log(err)
                })
        
            }, [])
    
    


    return(
        <>
        <Navbar/>
        <div className=" w-4/5 mx-auto bg-red-600  rounded text-white p-2  m-4">
            <text> Receive Order from Custuber</text>

        </div>


        <div className=" w-4/5 mx-auto">
            {
                order?.map((data, index)=>{
                    return(
                        <div key={index} className="">
                            <text>{data.user_id}</text>
                            
                            <div>
                                {
                                    data.ItemStore.map((data, index)=>{
                                        return(
                                            <text>{data.text}</text>
                                        )
                                    })
                                }
                            </div>


                        </div>
                    )

                })
            }
        </div>


        
        
        
        
        
        
        
        
        
        </>
    )
}