import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Http } from "./Http";
import { UserContext } from "./ContextAPI/context";

import front  from "../Component/image/rename21.jpg"


export const Home = ()=>{
    
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const { login } = useContext(UserContext)
    



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

        login ?(
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
        ):(
            navigate("/login")
        )
        

        
        
    }


   

    const handleProduct = ()=>{
        navigate("/productpage")
    }

    const handleProduct1 = ()=>{
        navigate("/productpage")
    }
    return(
        <div>
            <Navbar/>
            <div className=" flex flex-row mx-auto w-4/5 my-5 border-2 file:border-gray-500 h-48 sm:h-96  ">
                <img src={front} className=" w-full rounded object-fill sm:object-cover " />
            </div>

           

            <text className=" text-2xl flex flex-row w-4/5 mx-auto py-3.5 my-3  justify-center rounded bg-orange-500 text-white ">New Offer Coming Soon.</text>

            


            <text className=" w-4/5 mx-auto flex flex-row text-2xl"> New add Product</text>

            <div className=" grid grid-rows-1 grid-flow-col w-4/5 h-72 gap-x-2 pt-2   mx-auto my-2 overflow-scroll overflow-x-scroll overflow-y-hidden ">
            {
                data?.map((data, index)=>{
                    return(
                        <div className=" shadow-md h-64 w-48 border-2 border-gray-400 rounded hover:border-orange-500 hover:text-orange-500" onClick={handleProduct1}>
                            <img src={`http://localhost:5000/images/${data.image}`} alt="loading" className=" w-4/5 h-2/5 mx-auto py-2 object-contain"/>
                            <div className=" flex flex-col pl-4">
                                <text>{data.name}</text>
                                <p>&#x20B9;{data.price}</p>
                                <div className="my-2 ">
                                    <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-orange-500" onClick={handleAddProduct}>Add</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

                        <div className=" h-64 w-48 border-2 border-gray-400 rounded  hover:border-orange-500" onClick={handleProduct}>
                             <text className=" flex flex-row justify-center align-middle mx-auto pt-28 cursor-pointer text-blue-700  hover:text-orange-500 text-xl"  onClick={handleProduct}> More</text>
                        </div>
            </div>
            


            <text className=" w-4/5 mx-auto flex flex-row text-2xl"> New add Product</text>

            <div className=" grid grid-rows-1 grid-flow-col w-4/5 h-72 gap-x-2 pt-2   mx-auto my-2 overflow-scroll overflow-x-scroll overflow-y-hidden">
            {
                data?.map((data, index)=>{
                    return(
                        <div className=" h-64 w-48 border-2 border-gray-400 rounded hover:border-orange-500 hover:text-orange-500" onClick={handleProduct1}>
                            <img src={`http://localhost:5000/images/${data.image}`} alt="loading" className=" w-4/5 h-2/5 mx-auto py-2 object-contain"/>
                            <div className=" flex flex-col pl-4">
                                <text>{data.name}</text>
                                <p>&#x20B9;{data.price}</p>
                                <div className="my-2 ">
                                    <button className="px-3 py-1 bg-red-600 text-white rounded  hover:bg-orange-500 " onClick={handleAddProduct}>Add</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

                        <div className=" h-64 w-48 border-2 border-gray-400 rounded hover:border-blue-500 " onClick={handleProduct}>
                             <text className=" flex flex-row justify-center align-middle mx-auto pt-28 cursor-pointer  hover:text-orange-500 text-blue-700 text-xl" onClick={handleProduct}> More</text>
                        </div>
            </div>



            


            


            




           

            
            


           
            
        </div>
    )
}