import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";


export const Home = ()=>{
    const data = [1,1,1,1,2,1,1,1,1,1,25]
    const navigate = useNavigate()

   

    const handleProduct = ()=>{
        navigate("/productpage")
    }
    return(
        <div>
            <Navbar/>
            <div className=" flex flex-row mx-auto w-4/5 my-5 border-2 file:border-gray-500 h-96  rounded">
                
            </div>
            <text className=" w-4/5 mx-auto flex flex-row text-2xl"> New add Product</text>

            <div className=" grid grid-rows-1 grid-flow-col w-4/5 h-72 gap-x-2 pt-2   mx-auto my-2 overflow-scroll overflow-x-scroll overflow-y-hidden">
            {
                data.map((data, index)=>{
                    return(
                        <div className=" h-64 w-48 border-2 border-gray-400 rounded">
                            <img src="https://m.media-amazon.com/images/I/81GSuovbkwL._AC_UL480_FMwebp_QL65_.jpg" className=" w-4/5 h-3/5 mx-auto py-2" alt="aloo"/>
                            <div className=" flex flex-col pl-4">
                                <text>Tata Salt, 1kg</text>
                                <text>MRP : 28/-</text>
                                <div className="my-2 ">
                                    <button className="px-3 py-1 bg-red-600 text-white rounded">Add</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

                        <div className=" h-64 w-48 border-2 border-gray-400 rounded">
                             <text className=" flex flex-row justify-center align-middle mx-auto pt-28 cursor-pointer text-blue-700"  onClick={handleProduct}> More</text>
                        </div>
            </div>
            


            <text className=" w-4/5 mx-auto flex flex-row text-2xl"> New add Product</text>

            <div className=" grid grid-rows-1 grid-flow-col w-4/5 h-72 gap-x-2 pt-2   mx-auto my-2 overflow-scroll overflow-x-scroll overflow-y-hidden">
            {
                data.map((data, index)=>{
                    return(
                        <div className=" h-64 w-48 border-2 border-gray-400 rounded">
                            <img src="https://m.media-amazon.com/images/I/81GSuovbkwL._AC_UL480_FMwebp_QL65_.jpg" className=" w-4/5 h-3/5 mx-auto py-2" alt="aloo"/>
                            <div className=" flex flex-col pl-4">
                                <text>Tata Salt, 1kg</text>
                                <text>MRP : 28/-</text>
                                <div className="my-2 ">
                                    <button className="px-3 py-1 bg-red-600 text-white rounded">Add</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

                        <div className=" h-64 w-48 border-2 border-gray-400 rounded">
                             <text className=" flex flex-row justify-center align-middle mx-auto pt-28 cursor-pointer text-blue-700" onClick={handleProduct}> More</text>
                        </div>
            </div>



            <img  src="" />
            


            


            




           

            
            


           
            
        </div>
    )
}