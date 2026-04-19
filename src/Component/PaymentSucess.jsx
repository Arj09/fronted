import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Http } from "./Http";
import { useContext } from "react";
import { UserContext } from "./ContextAPI/context";



export const  PaymentSucess = ()=>{
    const navigate = useNavigate()
    const [data, setData] = useState()
    const {paymentID, orderID} = useContext(UserContext)

    useEffect(()=>{
        Http.get("/api/payment/success",{
                        headers:{
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("Token")}`,
                        }
                
                    }).then((res)=>{
                        //console.log(res.data)
                        setData(res.data)
                        
                    }).catch((err)=>{
                        console.log(err)
                    })
            
    })


    const handleBack =()=>{
        navigate("/")
    }

    return(
        <>
        <div className=" w-5/5 mx-auto bg-orange-500 h-20 ">
            <p className=" text-white text-2xl text-center p-2">Payment Status : Success</p>
           
        </div>
        <div className=" w-3/5 border-2 h-20 mx-auto m-4 border-orange-500 flex flex-col p-2 ">
            <p className=" font-medium">{`Payment ID : ${orderID?.razorpayPaymentId} `}</p>
            <p className=" font-medium">{`Order ID : ${orderID?.orderCreationId} `}</p>
        </div>
        <div className=" w-4/5 mx-auto ">
            <button className=" px-2 py-1.5  bg-orange-500 text-white rounded " onClick={handleBack}>Back To Home</button>
            
        </div>
            
        </>
    )

}