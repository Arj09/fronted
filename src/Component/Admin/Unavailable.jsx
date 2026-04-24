import React from "react";
import { useEffect, useState, useContext } from "react";

import { Navbar } from "../Navbar";
import { Http } from "../Http";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../ContextAPI/context";



export const Unavailable = ()=>{


    const [Unavailable, setUnavailable] = useState()
    const { login, mutlisector, category1 , noofProduct, setProductedit,setEditproductID, setmultisector,  } = useContext(UserContext)
    const navigate = useNavigate()
    
    
        useEffect(()=>{
                     Http.get("/api/product/unavailable",{
                        headers:{
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("Token")}`,
                        }
                
                    }).then((res)=>{
                        console.log(res.data)
                        setUnavailable(res.data)
                       
                        
                        
                    }).catch((err)=>{
                        console.log(err)
                    })
            
                }, [])



     const handleEdit =(id)=>{
        if(login) { navigate("/")}
        setEditproductID(id)
        setProductedit(true)
        navigate("/addProduct")
        

    }

    return(
        <>
        <text className=" mx-auto bg-red-500 text-white p-2 m-2 w-4/5 flex ">Unavailable Product</text>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 grid-flow-row mx-auto border-none w-5/5 sm:w-11/12 md:w-4/5 p-2 my-5">

            {
                Unavailable?.map((data, index)=>{
                    return(
                        <div className="   w-5/5 rounded border-2 shadow-lg shadow-orange-200 hover:border-red-700 px-1 py-2 flex flex-col gap-2">
                            <div className=" w-5/5 h-[120px] rounded ">
                                <img className="w-4/5 h-full mx-auto  object-contain rounded"  src={`${Http.getUri()}/images/${data.image} ` } />
                            </div>
                            
                            <text>{data.name}</text>

                            <button className=" px-2 py-1.5 text-white bg-red-700  rounded " onClick={()=>handleEdit(data)}>Avilable</button>



                        </div>
                    )
                })
            }


        </div>

        <text className=" flex mx-auto w-4/5 bg-red-600 text-white p-2 rounded"> Reday</text>
        
        
        
        
        
        
        </>
    )
}