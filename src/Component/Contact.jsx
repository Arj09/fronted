import React from "react";
import { Navbar } from "./Navbar";

export const Contact = ()=>{
    return(
        <>
        <Navbar/>
        <div className=" flex flex-col w-4/5 border-2 border-grey-400 mx-auto my-4 h-96">
            <text className=" text-center text-2xl pt-10 ">Contact with us by email </text>
            <text className=" text-center text-orange-500 ">Contact@MiniMart.com</text>
            

        </div>
        
        </>
    )
}