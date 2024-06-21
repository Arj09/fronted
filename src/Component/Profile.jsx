import React, { useEffect, useState } from "react";
import { Navbar1 } from "./Navbar1";
import { useSearchParams } from "react-router-dom";
import { Http } from "./Http";



export const Profile = ()=>{
    const [data, setData] = useState({})

    useEffect(()=>{
        Http.get("/api/user/current",{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }
        }).then((res)=>{
            setData(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    


    return(
        <>
        <Navbar1/>
        <div className=" flex flex-col lg:absolute top-0  right-0  bg-orange-500 h-screen   w-full   lg:w-10/12 ">
            
            <div className=" flex flex-col mx-auto my-4 gap-y-3 text-xl rounded  border-red-600 border-2 py-5 w-11/12 h-96 mt-10  px-10 text-white">
                <text className="  text-2xl text-black">Personal Information</text>
               
                <text>{`Username : ${data.username}`}</text>
                <text>{`Email : ${data.email}`}</text>

                

                

            </div>
        </div>
        </>
    )
}