import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Http } from "./Http";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./ContextAPI/context";

export const Cart = ()=>{
    const data1 = [1,2,2,2,2,2,2,2,2,2,2]

    const [data, setData] = useState([])
    const [product] = useState([])
    const [no, setNo] = useState(0)
    const [bill, setBill] = useState(0)
    const { setnoofProduct }  = useContext(UserContext)
   
   


    


    useEffect(()=>{
        Http.get("/api/cart",{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }
    
        }).then((res)=>{
            //console.log(res.data.ItemStore)
            setData(res.data.ItemStore)
            setBill(res.data.bill)
            setnoofProduct(res.data.ItemStore.length)
        }).catch((err)=>{
            console.log(err)
        })
    },[ no])
    

    const handleProductMins = (id)=>{
        Http.put(`/api/cart/${id}`,{
            quantity : 1
        },{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }

        }).then((res)=>{
            console.log(res.data)
            setNo(no=>no +=1)
        }).catch((err)=>{
            console.log(err)
        })

    }

    const handleProductPlus = (id)=>{
        
        Http.post(`/api/cart/`,{
            product_id : id,
            quantity:1

        },{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }

        }).then((res)=>{
            setNo(no=>no +=1)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })

    }
    


   
    return(
        <>
       
        <Navbar/>
        
        <div className=" flex flex-row w-4/5 h-16 bg-red-400 mx-auto mt-4 justify-between px-5 pt-4 text-white ">
            <text className=" text-xl">Total Bill :</text>
            <text className=" text-xl">{bill}</text>

        </div>
        <div className=" w-4/5 mx-auto flex flex-col my-5 gap-y-1 border-2 border-red-400 rounded">

            
            {
                data?.map((data, index)=>{
                    return(
                        <div key={index} className=" flex flex-col lg:flex-row md:flex-row  mx-auto my-5 w-4/5 border-2 border-red-400 rounded ">
                            <div  className="  border-red-400 border-b-2  h-48 w-full py-2 lg:w-1/5 lg:border-r-2 md:border-b-0 rounded   ">
                                <img alt="loading" src="https://www.bigbasket.com/media/uploads/p/m/40016990_3-mccain-french-fries.jpg?tr=w-1920,q=80" className=" w-full h-full" />
                            </div>
                            <div  className=" w-4/5 flex flex-col pl-4 pt-2 pb-4 lg:pt-10 md:flex-row md:justify-between md:px-5   ">
                            <div >
                                <text>{ product.filter((data1)=>(data1._id == data.product_id && data1.name )) }</text>
                                 <text></text>
                                
                                <div className="flex flex-row  my-2 rounded ">
                                    <button className=" px-2 bg-red-400 text-white" onClick={()=>handleProductPlus(data.product_id)}>+</button>
                                    <text className=" px-1 bg-red-400 text-white">{data.quantity}</text>
                                    <button className=" px-2 bg-red-400 text-white" onClick={()=>handleProductMins(data.product_id)}>-</button>
                                </div>
                            </div>
                    
                                <text>{`MRP : ${data.price}`}</text>
                            </div>
                        </div>

                    )
                })
            }



        </div>

        <div className=" w-4/5 flex flex-row mx-auto my-3 justify-center  ">
            <button className=" bg-red-400 text-white w-full text-xl py-3 rounded">Order</button>
        </div>
        
        </>
    )
}