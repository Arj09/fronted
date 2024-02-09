import React, { useEffect, useState } from "react";
import { Http } from "./Http";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";


export const ProductPage = ()=>{
    const [data, setData] = useState([])
    const [userID, setUserID] = useState()
    const [admin, setAdmin] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        Http.get("/api/product",{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }
    
        }).then((res)=>{
            console.log(res.data)
            setData(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const handleAddProduct = (id)=>{
        Http.post('/api/cart',{
            product_id : id,
            quantity : 1

        },{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
        }).then((res)=>{
            console.log(res,data)
        }).catch((err)=>{
            console.log(err
                )
        })
        
    }

    

    const handleUser = ()=>{
        Http.get("/api/admin/current",{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
            
        }).then((res)=>{
            console.log(res.data.id)
            setUserID(res.data.id)
        }).catch((err)=>{
            console.log(err)
        })

        
    
    }

    const handleProduct =()=>{
        navigate("/addProduct")
    }




    return(
        <>
        <Navbar/>

        <div className=" w-4/5 mx-auto my-3 flex flex-row justify-between border-2 border-red-500 rounded sm:px-5 px-1 py-1">
            <div className=" flex flex-row border-2 border-red-400 rounded  ">

                <text className="bg-red-400 px-2  sm:px-8 sm:pt-1.5 text-white   ">Filter</text>
                
                <select className=" ">
                    <option>Grocery</option>
                    <option>Pulse</option>
                    <option>Rice</option>
                    <option>Food</option>
                </select>
               

            </div>
            <button className=" bg-red-400  text-white   px-2 sm:py-2 sm:px-8 rounded" onClick={handleProduct}>Add Product</button>
            

        </div>
        
        <div  className=" grid grid-rows-1 grid-cols-1  w-5/5 gap-y-5 border-2 justify-between pl-10 mx-auto my-5 px-2 py-4   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:w-4/5 lg:border-slate-400 lg:border-2  cursor-pointer">
            {
                data.map((data, index)=>{
                    return(
                        <div className=" w-11/12 h-96 border-2 border-red-600 rounded">
                            <img alt="loading" src={`https://store-backend-o5qm.onrender.com/images/${data.image}`} className=" w-4/5 h-3/5 mx-auto py-2 rounded"/>

                            <div className=" flex flex-col pl-5">
                                <text>{data.name}</text>
                                <text>{`MRP ${data.price}`}</text>
                                <div className="my-2"> 
                                    <button className="px-3 py-1 bg-red-600 text-white" onClick={()=>handleAddProduct(data._id)}>Add</button>
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