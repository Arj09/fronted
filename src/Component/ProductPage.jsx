import React, { useState } from "react";

export const ProductPage = ()=>{
    const [data, setData] = useState([,1,1,,1,1,1,1,1,1,1,1,1,1,1,1,1,])
    return(
        <>
        <div className=" w-4/5 bg-orange-400 text-white h-10 mx-auto my-5">

        </div>
        <div  className=" grid grid-rows-1 grid-cols-1  w-5/5 gap-y-5 border-2 justify-between pl-10 mx-auto my-5 px-2 py-4   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:w-4/5 lg:border-slate-400 lg:border-2  cursor-pointer">
            {
                data.map((data, index)=>{
                    return(
                        <div className=" w-10/12 h-72 border-2 border-red-600">
                            <img src="https://m.media-amazon.com/images/I/81GSuovbkwL._AC_UL480_FMwebp_QL65_.jpg" className=" w-4/5 h-3/5 mx-auto py-2"/>

                            <div className=" flex flex-col pl-5">
                                <text>Tata Salt, 1kg</text>
                                <text>MRP : 28/-</text>
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