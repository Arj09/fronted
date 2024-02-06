import React from "react";
import { Navbar1 } from "./Navbar1";



export const Profile = ()=>{
    return(
        <>
        <Navbar1/>
        <div className=" flex flex-col lg:absolute top-0  right-0  bg-orange-500 h-screen   w-full   lg:w-10/12">
            
            <div className=" flex flex-row mx-auto my-4 gap-x-5  border-red-600 border-2 py-5 w-11/12 h-96 mt-10 justify-between px-10 text-white">
                <div className=" flex flex-row gap-x-2">
                    <text>Username :</text>
                    <text>Arjunkushwah</text>
                </div>

                <div className=" flex flex-row gap-x-2">
                    <text>Email Address</text>
                    <text>Arjunkushwah@gmail.com</text>
                </div>

            </div>
        </div>
        </>
    )
}