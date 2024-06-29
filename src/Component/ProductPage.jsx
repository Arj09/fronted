import React, { useContext, useEffect, useState } from "react";
import { Http } from "./Http";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./ContextAPI/context";


export const ProductPage = ()=>{
    const [data, setData] = useState([])
    const [userID, setUserID] = useState()
    const [admin, setAdmin] = useState([])
    const [category, setCategory] = useState("all")
    const [search, setSearch] = useState("all")
    const { login } = useContext(UserContext)
    const [popup, setPopup] = useState(true)
    

    const navigate = useNavigate()


    const selectCategory = () => {
        return [...new Set(data.map((data) => data.category))];
      };

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

        <input  placeholder=" Search" className=" border-2 border-black mx-auto my-5 flex pl-2 w-4/5 py-2 rounded" />

        <div className=" w-4/5 mx-auto my-3 flex flex-row justify-between border-2 bg-orange-500 border-red-500 rounded sm:px-5 px-1 py-1">
            <div className=" flex flex-row align-middle   ">

                <text className=" sm:px-2 mx-2 sm:pt-1 text-white text-xl">Filter</text>
                
                <select className=" appearance-none px-2 py-1 border-2 border-gra-100 rounded " value={category} onChange={(e)=>setCategory(e.target.value)}>
                    <option value="all">All</option>
                    {
                        selectCategory().map((category)=>{
                            return(
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            )
                        })
                    }



                </select>
               

            </div>
            
            

        </div>
        
        <div  className=" grid grid-rows-1 grid-cols-1  w-5/5 gap-y-3 border-2 justify-between pl-10 mx-auto my-5 px-2 py-4   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:w-4/5 lg:border-slate-400 lg:border-2  cursor-pointer">
            {
                data
                .filter((data)=> category == "all" ? data : data.category === category)
                .map((data, index)=>{
                    return(
                        <div className=" w-11/12 h-[450px] rounded  border-2 border-gray-100  hover:border hover:border-orange-500 ">
                            <div className=" w-full bg-gray-100 h-72 rounded ">
                            <img alt="loading" src={`http://localhost:5000/images/${data.image}`} className="  w-4/5 h-full mx-auto py-6 bg-none   mix-blend-multiply object-contain"/>
                            </div>
                           

                            <div className=" flex flex-col pl-5 py-3 ">
                                <text  >{data.name}</text>
                                <p>&#x20B9;{data.price}</p>
                               
                                {
                                    data._id == "667dc74888b25e2953448547" ? (
                                        <div className="my-2 "> 
                                            <button className="px-3.5 py-1 bg-red-600 text-white rounded  hover:bg-orange-500 " onClick={()=>handleAddProduct(data._id)}>Add more</button>
                                        </div>

                                    ):(
                                        <div className="my-2 "> 
                                            <button className="px-3.5 py-1 bg-red-600 text-white rounded  hover:bg-orange-500 " onClick={()=>handleAddProduct(data._id)}>Add</button>
                                        </div>
                                    )
                                }

                            </div>
                            
                        </div>
                    )
                })
            }
            

        </div>


        <div className=" w-4/5 h-96 border-2 border-red-900 mx-auto my-10">
        <button className=" px-5 py-2 border-2 border-red-800 m-20">Click</button>
        {
            popup && (
                <div className=" w-4/5 border-2 border-red-800  h-20 mx-auto" >

                </div>
            )
        }

        </div>

        
        </>

    )
}