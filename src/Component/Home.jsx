import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Http } from "./Http";
import { UserContext } from "./ContextAPI/context";

import front1  from "../Component/image/rename1.png"
import front2  from "../Component/image/rename2.jpg"
import front3  from "../Component/image/Rename5.png"


export const Home = ()=>{
    
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const { login,setmultisector, setCategory1 } = useContext(UserContext)
    const [p, setp] = useState(front2)

    const app = ["Atta , dal & rice", " Cleaning Essentials", "Masala, oil & more", "Breakfast & instant food", "Sauces & Spreads", "Sweet & Chocolate"]
    const Category1 = [
        {
            "name":"Aata  Oil & Dal"
        }
    ]
    



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
        setCategory1("all")
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


   

    const handleCategory = (index)=>{
        const  first = ["pulse", "Wheat floor", "rice"]
        const second = ["detergent powder"]
        const third = ["masale", "oil", ]
        const forth =  ["Tea", "noodles"]
        const fifth = ["jam","souce"]
        const six = ["sweet", "chocolate"]
        if( index == 0 ){
            setmultisector(first)
            setCategory1("all1")
        }
        if(index == 1){
            setmultisector(second)
            setCategory1("all1")
        }
        if(index == 2){
            setmultisector(third)
            setCategory1("all1")
        }
        if(index == 3){
            setmultisector(forth)
            setCategory1("all1")
        }
        if(index == 4){
            setmultisector(fifth)
            setCategory1("all1")
        }
        if(index == 5){
            setmultisector(six)
            setCategory1("all1")
        }
        navigate("/ProductPage")

    }

  
    const handleGotoProductpage = ()=>{
        setCategory1("all")
        navigate("/productpage")
    }

    return(
        <div>
            <Navbar/>
            

            <div className=" relative  w-11/12 h-[250px]  md:h-[600px] my-10  mx-auto p-5  ">
            
                <img className="  w-full h-full object-cover"  src={p} />

            
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 sm:size-10 absolute bg-red-800  rounded-full  text-white left-0 top-1/2 cursor-pointer" onClick={handleBack}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 sm:size-10 bg-red-800 rounded-full absolute right-0  text-white top-1/2 cursor-pointer" onClick={handlePlus}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
           
            </div>
 
           
            <text className=" text-2xl flex flex-row w-11/12 sm:w-4/5 mx-auto py-3.5 my-3  justify-center rounded bg-orange-500 text-white "> Minimum order amount Rs 500/-</text>
            <text className=" text-2xl flex flex-row w-11/12 sm:w-4/5 mx-auto py-3.5 my-3  justify-center rounded bg-orange-500 text-white ">New Offer Coming Soon.</text>



            

            
            <div className=" flex flex-row  w-4/5 mx-auto  my-4">
                <text className=" text-3xl ">Category</text>
            </div>

            <div className=" grid grid-rows-1 grid-cols-2   w-5/5 gap-y-3 border-none rounded pl-10 justify-between  mx-auto my-5 px-2 py-4   sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 lg:w-4/5 lg:border-slate-400 lg:border-2  cursor-pointer">
                {
                    app.map((data, index)=>{
                        return(
                            <div className=" w-[150px] h-[120px]  rounded  border-2 border-gray-100  hover:border hover:border-orange-500 "  onClick={()=>handleCategory(index)}>
                             <div className=" w-full h-4/5  ">
                                <img src={front1} className=" w-full h-full object-contain " />
                            </div>
                            <div className=" flex flex-col pl-2 ">
                                <text className="  text-sm flex flex-row justify-center">{app[index]}</text>
                            </div> 
                               
                            </div>
                        )
                    })
                }
            </div>


            


            


            <div className=" flex flex-row justify-between w-4/5 mx-auto">
                <text className=" text-3xl "> All Product</text>
                <text className=" pt-5 text-blue-500 cursor-pointer" onClick={handleGotoProductpage}> See more</text>
            </div>

            <div className=" grid grid-rows-1 grid-flow-col w-11/12 sm:w-4/5  h-72 gap-x-2 pt-2   mx-auto my-2 overflow-scroll overflow-x-scroll overflow-y-hidden">
            {   data.length !=0 ? (
                data?.map((data, index)=>{
                    return(
                        <div className=" h-64 w-48 border-2 border-gray-400 rounded hover:border-orange-500 hover:text-orange-500" onClick={handleProduct1}>
                            <img src={`${Http.getUri()}/images/${data.image} ` } alt="loading" className=" w-4/5 h-2/5 mx-auto py-2 object-contain"/>
                            <div className=" flex flex-col pl-4">
                                <text>{data.name}</text>
                                <p>&#x20B9;<text className=" pr-1 line-through">{data.mrp}</text>{data.price}</p>
                                <div className="my-2 ">
                                    <button className="px-3 py-1 bg-red-600 text-white rounded  hover:bg-orange-500 " onClick={handleAddProduct}>Add</button>
                                </div>
                            </div>
                        </div>
                    )
                })  ):(
                    <text className=" text-center pt-20 text-2xl">Loading...</text>

                )
            }

                        
            </div>


           

            




            


            


            




           

            
            


           
            
        </div>
    )
}