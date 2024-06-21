import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./ContextAPI/context";
import { Http } from "./Http";

export const PaymentPage = ()=>{
    const [option, setOption] = useState(false)
    const [option1, setOption1] = useState(false)
    const [show, setShow ] = useState(false)
    const { cartID } = useContext(UserContext)

    const navigate = useNavigate()

    const handleOption =(id)=>{
        console.log(id)
        if(id === "option2"){
            setOption1(true)
            setOption(false)
        }
        else{
            setOption(true)
            setOption1(false)

        }

    }


    const handleClose = ()=>{

        setShow(false)
        navigate("/")
    }

    const handleNext = (e)=>{
        console.log(cartID)
        
        
        //setShow(true)
    }

    const handleBack = ()=>{
        navigate("/")
        
    }

    const handleEdit = ()=>{
        navigate("/detail")
        
    }

    const handlePayment = (e)=>{
        
        console.log("request send", cartID)
        e.preventDefault()
        Http.post(`/api/order`,{
            cart_id:cartID
        },{

            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }

        }).then((res)=>{
        
            console.log(res.data)
            setShow(true)
            
        }).catch((err)=>{
            console.log(err)
        })

    }
    
    
    return(
        <>
        <text className=" flex-row flex justify-center py-5 text-2xl bg-orange-500 text-white">Payment Page</text>
        <div className=" flex flex-row  w-4/5 my-5 mx-auto rounded gap-x-4  ">
            <button className=" bg-orange-500 text-white py-1.5 px-3  rounded" onClick={handleBack}>Back to home</button>
            <button className=" bg-orange-500 text-white py-1.5 px-3  rounded"onClick={handleEdit} >Edit address & Mobile Number</button>
        </div>
        <text className=" flex flow-row justify-start text-gray-400 w-4/5 mx-auto text-2xl mt-10"> Choose Payment Method</text>
        <form className=" flex flex-col mx-auto my-5  w-4/5 " onSubmit={handleNext}>

            {
                show && (
                    <div className=" flex flex-col w-4/5 bg-gray-500 h-60 rounded mx-auto absolute right-0 left-0 sm:w-2/5  ">
                
                        <text className="flex flex-row justify-end pt-5 pr-10 text-2xl text-white cursor-pointer"  onClick={handleClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </text>
                        <text className=" flex flex-col justify-center mx-auto text-2xl mt-14"> Order Sucessfully</text>

                    </div>
                )
            }
            

            <label className=" flex flex-row gap-x-4 px-3">
                <input type="radio" value="option1" checked={option} onClick={(e)=>handleOption(e.target.value)}  />
                <label>Cash on Delivery</label>
            </label>

            <label className=" flex flex-row gap-x-4 px-3">
                <input type="radio" value="option2" checked={option1} onClick={(e)=>handleOption(e.target.value)}  />
                <label> Payment Online</label>
            </label>

            <button className=" px-3 py-1.5 bg-orange-500 text-white mt-10 text-2xl rounded" onClick={handlePayment}>Next</button>
           
            
        </form>
        
        </>
    )
}