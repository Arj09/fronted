import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Http } from "./Http";
import { UserContext } from "./ContextAPI/context";

import front1  from "../Component/image/rename1.jpg"
import front2  from "../Component/image/rename2.jpg"


export const Home = ()=>{
    
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const { login } = useContext(UserContext)
    const [p, setp] = useState(front1)
    



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


    const paper = [front1, front2]
    
    const handleBack = ()=>{
        if(p==0){
            setp(paper.length)
        }
        setp(paper[1])

    }

    const handlePlus = ()=>{
        if(p>=paper.length-1){
            setp(-1)
        }
        setp(paper[0])
    }


    return(
        <div>
            <Navbar/>
            

            <div className=" relative  w-11/12 h-[250px]  md:h-[600px] my-10  mx-auto p-5  ">
            
                <img className="  w-full h-full object-cover"  src={p} />

            
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 absolute bg-red-800  rounded-full  text-white left-0 top-1/2 cursor-pointer" onClick={handleBack}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 bg-red-800 rounded-full absolute right-0  text-white top-1/2 cursor-pointer" onClick={handlePlus}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
           
            </div>

           

            <text className=" text-2xl flex flex-row w-4/5 mx-auto py-3.5 my-3  justify-center rounded bg-orange-500 text-white ">New Offer Coming Soon.</text>

            


            <text className=" w-4/5 mx-auto flex flex-row text-2xl"> New add Product</text>

            <div className=" grid grid-rows-1 grid-flow-col w-4/5 h-72 gap-x-2 pt-2   mx-auto my-2 overflow-scroll overflow-x-scroll overflow-y-hidden ">
            {
                data?.map((data, index)=>{
                    return(
                        <div className=" shadow-md h-64 w-48 border-2 border-gray-400 rounded hover:border-orange-500 hover:text-orange-500" onClick={handleProduct1}>
                            <img src={`https://store-backend-o5qm.onrender.com/images/${data.image}`} alt="loading" className=" w-4/5 h-2/5 mx-auto py-2 object-contain"/>
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
                            <img src={`https://store-backend-o5qm.onrender.com/images/${data.image}`} alt="loading" className=" w-4/5 h-2/5 mx-auto py-2 object-contain"/>
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