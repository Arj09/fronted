import React from "react";
import { Navbar } from "./Navbar";

export const Cart = ()=>{
    const data = [1,2,2,2,2,2,2,2,2,2,2]
    return(
        <>
        <Navbar/>
        

        <div className=" w-4/5 mx-auto border-2 border-red-700 h-96 my-5">
                        <div className=" h-40 w-4/5 border-2 border-gray-400 rounded flex flex-row mx-auto px-10 my-4">
                            <img src="https://m.media-amazon.com/images/I/81GSuovbkwL._AC_UL480_FMwebp_QL65_.jpg" className=" w-1/5 h-full py-2 mr-5" alt="aloo"/>
                            <div className=" flex flex-col pl-4 pt-8 ">
                                <text>Tata Salt, 1kg</text>
                                <text>MRP : 28/-</text>
                                <div className="my-2 ">
                                    <button className="px-3 py-1 bg-red-600 text-white">Add</button>
                                </div>
                            </div>
                        </div>
            
            

        </div>

        
        </>
    )
}