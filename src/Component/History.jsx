import React from "react";
import { Navbar1 } from "./Navbar1";




export const History = ()=>{
    return(
        <>
        <Navbar1/>
        <div className=" flex flex-col lg:absolute top-0  right-0  bg-orange-500 h-screen   w-full   lg:w-10/12">
            
            <div className=" flex flex-row mx-auto my-4 border-red-600 border-2 px-5 w-11/12 h-96 mt-10 justify-center text-white">
                <text className=" text-xl pt-44">It is mainly page desigen for orderHistory</text>

            </div>
        </div>
        </>
    )
}