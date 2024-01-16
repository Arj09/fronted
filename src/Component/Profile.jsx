import React, { useState } from "react";

export const Profie = ()=>{
    const [select, setselect] = useState('profile')

    const handleHistory = ()=>{
        setselect('history')

    }
    const handleOrder = ()=>{
        setselect('order')
    }
    return(
        <div className="flex flex-row w-full mx-auto bg-red-800">
            <div className="w-1/12 bg-red-600 h-screen">
                <text className=" flex flex-row justify-center my-5 text-white text-xl pb-10">MiniStore</text>
                <div className=" flex flex-col justify-center text-white text-center gap-y-6">
                    <text onClick={()=>setselect('profile')} className=" cursor-pointer">Profile</text>
                    <text onClick={handleOrder} className=" cursor-pointer">Order</text>
                    <text onClick={handleHistory}className=" cursor-pointer">History</text>
                    <text className="flex flex-row mx-auto justify-center pt-96">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>
                    </text>

                    
                   

                </div>

            </div>
            <div className=" flex flex-col mx-auto w-11/12">
            <div className="w-full bg-red-700 h-20 flex flex-row justify-center px-5">
                <input  placeholder=" Search"  className=" px-2 h-10 rounded w-2/5 mt-4"/> 

            </div>
            <div className=" flex flex-col  h-96 my-3 w-4/5 mx-auto text-center text-white">
                {
                    select == 'profile' ? (
                        <div className=" flex flex-col w-4/5 mx-auto my-3 justify-between">
                            <text>Username : Arjun kushwah</text>
                            <text>Email  : Arjunkushwah@gmail.com</text>

                        </div>

                    ):(
                        <div className=" hidden">a</div>
                    )
                }
                {
                    select == 'order' ? (
                        <div>order</div>
                    ):(
                        <div className=" hidden"></div>
                    )
                }
                {
                    select == 'history' ? (
                        <div>history</div>
                    ):(
                        <div className=" hidden"></div>
                    )
                }
                

            </div>
            </div>

            


        </div>
       
    )
}