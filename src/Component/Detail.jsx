import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Http } from "./Http";
import { UserContext } from "./ContextAPI/context";

export const Detail = ()=>{
    const navigate = useNavigate()
    const [show, setShow] = useState(true)
    const [editProductID ] = useContext(UserContext)
    const [Mobile, setMobile] = useState()
    const [Detail, setDetail] =useState({})



    const handleMobile = (e) =>{
        e.preventDefault();

        Http.put(`api/product/${editProductID._id}`,{
        
                    
        
                },{
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("Token")}`,
                    },
                }
                    
                ).then((res)=>{
                    console.log(res.data)
                   // setCount(count+1)
                   alert("Product Add Sucessfully")
                   navigate("/admin")
                   
                   
                }).catch((err)=>{
                    console.log(err)
                
                    
                })

    } 
    const handleNext =()=>{
        navigate("/payment")
    }
    return(
        <>
        <div className=" flex-row flex justify-end mx-auto w-4/5 mt-10">
            <button className=" py-1.5 px-4 bg-orange-500 text-white text-2xl rounded" onClick={handleNext}>Next</button>

        </div>

        {
            show && (
                <>
                <text  className="mt-5 flex flex-row mx-auto w-4/5 text-gray-500 justify-start text-2xl">Add or Update Your Delivery Address</text>
                <form className=" flex flex-col w-4/5 border-2 border-gray-400 mx-auto my-5 py-5 px-2 gap-y-5 rounded">
                    <input placeholder=" Enter State Name" className=" border-2 border-gray-400 pl-2 rounded py-1.5" />
                    <input placeholder=" Enter City Name" className=" border-2 border-gray-400 pl-2 rounded py-1.5" />
                    <input placeholder=" Enter address1 " className=" border-2 border-gray-400 pl-2 rounded py-1.5" />
                    <input placeholder=" Enter address2 " className=" border-2 border-gray-400 pl-2 rounded py-1.5" />
                    <input placeholder=" Enter address3 " className=" border-2 border-gray-400 pl-2 rounded py-1.5" />
                    <button className=" bg-orange-500 text-white py-2.5 rounded">Save</button>
                </form>

                <text  className="mt-5 flex flex-row mx-auto w-4/5 text-gray-500 justify-start text-2xl">Add or Update Your Mobile Number</text>
                <form  onSubmit={handleMobile}  className=" flex flex-col w-4/5 border-2 border-gray-400 mx-auto my-5 py-5 px-2 gap-y-5 rounded">
                    <input placeholder=" Enter Mobile Number " className=" border-2 border-gray-400 pl-2 rounded py-1.5" onChange={(e)=>setMobile(e.target.value)} />
                    <button className=" bg-orange-500 text-white py-2.5 rounded">Save</button>
                </form>
                
                
                
                </>
            )
        }
        
        </>
    )
}