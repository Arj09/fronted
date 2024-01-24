import React, { useEffect, useState } from "react";
import { Http } from "./Http";
import { Navbar } from "./Navbar";

export const ProductPage = ()=>{
    const [data, setData] = useState([])

    useEffect(()=>{
        Http.get("/api/product",{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }
    
        }).then((res)=>{
            console.log(res.data)
            setData(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])


    return(
        <>
        <Navbar/>
        
        <div  className=" grid grid-rows-1 grid-cols-1  w-5/5 gap-y-5 border-2 justify-between pl-10 mx-auto my-5 px-2 py-4   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:w-4/5 lg:border-slate-400 lg:border-2  cursor-pointer">
            {
                data.map((data, index)=>{
                    return(
                        <div className=" w-11/12 h-96 border-2 border-red-600">
                            <img src={data.image} className=" w-4/5 h-3/5 mx-auto py-2"/>

                            <div className=" flex flex-col pl-5">
                                <text>{data.name}</text>
                                <text>{`MRP ${data.price}`}</text>
                                <div className="my-2"> 
                                    <button className="px-3 py-1 bg-red-600 text-white">Add</button>
                                </div>

                            </div>
                        </div>
                    )
                })
            }
            

        </div>

        
        </>

    )
}