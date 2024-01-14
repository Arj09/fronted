import React from "react";

export const Profie = ()=>{
    return(
        <div className="flex flex-row w-full mx-auto bg-red-800">
            <div className="w-1/12 bg-red-600 h-screen">
                <text className=" flex flex-row justify-center my-8 text-white text-xl pb-10">MiniStore</text>
                <div className=" flex flex-col justify-center text-white text-center gap-y-6">
                    <text>Profile</text>
                    <text>Order</text>
                    <text >History</text>
                    
                   

                </div>

            </div>
            <div className="w-11/12 bg-red-700 h-24 flex flex-row justify-center px-5">
                <input  placeholder=" Search"  className=" px-2 h-10 rounded w-2/5 mt-7"/> 

            </div>


        </div>
       
    )
}