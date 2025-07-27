import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Http } from "./Http";
import { UserContext } from "./ContextAPI/context";


import front2  from "../Component/image/banner.png"
import front1  from "../Component/image/rename1.png"
import front3  from "../Component/image/Rename5.png"


export const Home = ()=>{
    
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const { login, noofProduct, setnoofProduct , productID, setProductID, sub, setSub} = useContext(UserContext)
    const [p, setp] = useState(front2)
    const [boxShow, setBoxshow] = useState(false)
    const [boxID, setBoxID] = useState()
    const [show, setShow] = useState(false)
    
    
    const [app,  setApp] = useState([])



    useEffect(()=>{
         Http.get("/api/category",{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }
    
        }).then((res)=>{
            console.log(res.data)
            setApp(res.data)
        }).catch((err)=>{
            console.log(err)
        })

    }, [])



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
                setnoofProduct(res.data.ItemStore.length)
                setProductID(id)
                setShow(true)
                
                

                setTimeout(() => {
                    setShow(false)
            
                }, 1000);

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


   

    const handleCategory = (data,name)=>{
        console.log("category ID", name)
        setProductID(name)
        setSub(data)
        navigate("/ProductPage")

    }

  
    const handleGotoProductpage = ()=>{
      navigate("/productpage")
    }


    const handleBox =(id)=>{
        setBoxID(id)
        boxShow ? setBoxID() : setBoxID(id)
        boxShow ? setBoxshow(false) : setBoxshow(true)
        

    }
    const handleShowBox =()=>{
        boxShow ? setBoxshow(false) : setBoxshow(true)
        
    }

    return(
        <div>
            <Navbar/>
            

            <div className=" relative w-11/12 h-40 sm:h-96 mx-auto rounded my-10   ">
            
                <img className="  w-full h-full object-cover rounded"  src={p} />

            
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 sm:size-10 absolute bg-red-800  rounded-full  text-white left-0 top-1/2 cursor-pointer" onClick={handleBack}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 sm:size-10 bg-red-800 rounded-full absolute right-0  text-white top-1/2 cursor-pointer" onClick={handlePlus}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
           
            </div>
 
           
           



            

            
            <div className=" flex flex-row  w-4/5 mx-auto  my-4">
                <text className=" text-3xl ">Category</text>
            </div>

            <div className=" grid grid-rows-1 grid-cols-2    w-5/5 gap-2  rounded justify-between  mx-auto my-5 p-2 border-none   sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 lg:w-4/5 lg:border-slate-400 lg:border-2  cursor-pointer">
                {
                    app.map((data, index)=>{
                        return(
                            <div className=" w-5/5 h-[120px] shadow-lg shadow-orange-300  rounded  border-2 border-gray-100  hover:border hover:border-orange-500 "  onClick={()=>handleCategory( data.category_item , data.category_name)}>
                             <div className=" w-full h-4/5  ">
                                <img src={front1} alt="ok" className=" w-full h-full object-contain " />
                            </div>
                            <div className=" flex flex-col pl-2 ">
                                <text className="  text-sm flex flex-row justify-center">{data.category_name}</text>
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

            <div className="w-5/5  md:w-4/5 mx-auto rounded  grid grid-flow-col gap-x-2 grid-rows-1 px-2  py-2 overflow-x-scroll">
                {  data.length !=0 ? ( 
                    data?.map((data, index)=>{
                        return(
                            <div className=" relative rounded w-[200px] shadow-lg shadow-orange-300 border-2 border-gray-100 p-1 gap-y-1 flex flex-col">
                                
                                
                                <div className=" w-5/5 h-[120px] rounded ">
                                    <img className="w-4/5 h-full mx-auto  object-contain rounded"  src={`${Http.getUri()}/images/${data.image} ` } />
                                </div>
                                
                                {
                                    show && productID == data._id ?  (
                                        <label  className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded px-10 py-1.5">Added</label>
                                    ):(
                                        <div className=" hidden"></div>
                                    )
                                }
                                
                                <div className=" w-5/5 h-14  p-1   rounded overflow-hidden " >
                                    <text className=" text-sm">{data.name} </text>

                                </div>
                                

                                
                                
                                
                                <div className=" w-5/5 flex flex-row justify-between    rounded p-1 " >
                                {
                                    data.mrp > data.price ? <p>&#x20B9;<text className=" pr-1 line-through">{data.mrp}</text>{data.price}</p> : <p>&#x20B9;<text>{data.mrp}</text></p>
                                }
                                    <button className=" px-3 py-1.5 text-white bg-red-700  rounded" onClick={()=>handleAddProduct(data._id)}>Add</button>
                                    

                                </div>
                            </div>

                        )
                    })):(
                        <text className=" text-center pt-20 text-2xl">Loading...</text>
    
                    )
                }


            </div>



            <div className=" flex flex-row justify-between w-4/5 mx-auto mt-5">
                <text className=" font-medium text-2xl "> Pulse</text>
                <text className=" pt-5 text-blue-500 cursor-pointer" onClick={handleGotoProductpage}> See more</text>
            </div>

            <div className="w-5/5  md:w-4/5 mx-auto rounded  grid grid-flow-col gap-x-2 grid-rows-1 px-2  py-2 overflow-x-scroll">
                {  data.length !=0 ? ( 
                    data?.filter((data)=>(data.category =="Atta, dal & Rice"))
                    .filter((data)=>data.subcategory =="dal")
                    .map((data, index)=>{
                        return(
                            <div className=" relative rounded shadow-lg shadow-orange-300 w-[200px] border-2 border-gray-100 p-1 gap-y-1 flex flex-col">
                                
                                
                                <div className=" w-5/5 h-[120px] rounded ">
                                    <img className="w-4/5 h-full mx-auto  object-contain rounded"  src={`${Http.getUri()}/images/${data.image} ` } />
                                </div>

                                {
                                    show && productID == data._id ?  (
                                        <label  className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded px-10 py-1.5">Added</label>
                                    ):(
                                        <div className=" hidden"></div>
                                    )
                                }
                                
                                <div className=" w-5/5 h-14 p-1   rounded overflow-hidden " >
                                    <text className=" text-sm">{data.name} </text>

                                </div>
                                
                                
                                <div className=" w-5/5 flex flex-row justify-between    rounded p-1 " >
                                {
                                    data.mrp > data.price ? <p>&#x20B9;<text className=" pr-1 line-through">{data.mrp}</text>{data.price}</p> : <p>&#x20B9;<text>{data.mrp}</text></p>
                                }
                                    <button className=" px-3 py-1.5 text-white bg-red-700  rounded"onClick={()=>handleAddProduct(data._id)}>Add</button>
                                    

                                </div>
                            </div>

                        )
                    })):(
                        <text className=" text-center pt-20 text-2xl">Loading...</text>
    
                    )
                }


            </div>




            <div className=" flex flex-row justify-between w-4/5 mx-auto mt-5">
                <text className=" font-medium text-2xl "> Snakes & Chips</text>
                <text className=" pt-5 text-blue-500 cursor-pointer" onClick={handleGotoProductpage}> See more</text>
            </div>

            <div className="w-5/5  md:w-4/5  mx-auto rounded  grid grid-flow-col gap-x-2 grid-rows-1 px-2  py-2 overflow-x-scroll">
                {  data.length !=0 ? ( 
                    data?.filter((data)=>(data.category =="Chips & Namkeen"))
                    .filter((data)=>data.subcategory =="Chips")
                    .map((data, index)=>{
                        return(
                            <div className=" relative rounded shadow-lg shadow-orange-300 w-[200px] border-2 border-gray-100 p-1 gap-y-1 flex flex-col">
                                
                                
                                <div className=" w-5/5 h-[120px] rounded relative  ">
                                    <img className="w-4/5 h-full mx-auto  object-contain rounded"  src={`${Http.getUri()}/images/${data.image} ` } />
                                    
                                </div>


                                
                                <div className=" w-5/5 h-14 p-1   rounded overflow-hidden " >
                                    <text className=" text-sm">{data.name} </text>

                                </div>

                                {
                                    show && productID == data._id ?  (
                                        <label  className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded px-10 py-1.5">Added</label>
                                    ):(
                                        <div className=" hidden"></div>
                                    )
                                }
                                
                                
                                
                               
                                
                                 
                                
                                <div className=" w-5/5 flex flex-row justify-between    rounded p-1 " >
                                {
                                    data.mrp > data.price ? <p className="py-1.5">&#x20B9;<text className=" py-1.5 pr-1 line-through">{data.mrp}</text>{data.price}</p> : <p className=" py-1.5">&#x20B9;<text className="py-1.5">{data.mrp}</text></p>
                                }
                                    <button className=" px-3 py-1.5 text-white bg-red-700  rounded" onClick={()=>handleAddProduct(data._id)}>Add</button>
                                    

                                </div>
                            </div>

                        )
                    })):(
                        <text className=" text-center pt-20 text-2xl">Loading...</text>
    
                    )
                }


            </div>


            <div className=" flex flex-row justify-between w-4/5 mx-auto mt-5">
                <text className=" font-medium text-sm md:text-2xl ">Dairy Milk Silk </text>
                <text className=" pt-5 text-blue-500 cursor-pointer" onClick={handleGotoProductpage}> See more</text>
            </div>

            <div className="w-5/5  md:w-4/5  mx-auto rounded  grid grid-flow-col gap-x-2 grid-rows-1 px-2  py-2 overflow-x-scroll">
                {  data.length !=0 ? ( 
                    data?.filter((data)=>(data.category =="Chocolate & Ice Cream"))
                    .filter((data)=>data.subcategory =="Chocolate")
                    .map((data, index)=>{
                        return(
                            <div className=" relative rounded shadow-lg shadow-orange-300 w-[200px] border-2 border-gray-100 p-1 gap-y-1 flex flex-col">
                                
                                
                                <div className=" w-5/5 h-[120px] rounded relative  ">
                                    <img className="w-4/5 h-full mx-auto  object-contain rounded"  src={`${Http.getUri()}/images/${data.image} ` } />
                                    
                                </div>


                                
                                <div className=" w-5/5 h-14 p-1   rounded overflow-hidden " >
                                    <text className=" text-sm">{data.name} </text>

                                </div>

                                {
                                    show && productID == data._id ?  (
                                        <label  className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded px-10 py-1.5">Added</label>
                                    ):(
                                        <div className=" hidden"></div>
                                    )
                                }
                                
                                
                                
                               
                                
                                 
                                
                                <div className=" w-5/5 flex flex-row justify-between    rounded p-1 " >
                                {
                                    data.mrp > data.price ? <p className="py-1.5">&#x20B9;<text className=" py-1.5 pr-1 line-through">{data.mrp}</text>{data.price}</p> : <p className=" py-1.5">&#x20B9;<text className="py-1.5">{data.mrp}</text></p>
                                }
                                    <button className=" px-3 py-1.5 text-white bg-red-700  rounded" onClick={()=>handleAddProduct(data._id)}>Add</button>
                                    

                                </div>
                            </div>

                        )
                    })):(
                        <text className=" text-center pt-20 text-2xl">Loading...</text>
    
                    )
                }


            </div>



            

















           

            

















            <div className=" bg-red-700 w-5/5">

            <div className=" w-4/5  bg-red-700  mx-auto mt-5 grid grid-rows-1 grid-cols-1 sm:grid-cols-4 gap-x-4 p-2 gap-y-4  ">
                
                <div className=" w-5/5 border-red-600 border-2 rounded flex flex-col p-2 text-white ">
                    <text className=" font-medium"> MiniStore</text>
                    <text>Help</text>
                    <text>About US</text>
                </div>



                <div className=" w-5/5 border-red-600 border-2 rounded flex flex-col p-2 text-white ">
                    <text className=" font-medium"> Product</text>
                    <text></text>
                </div>


                <div className=" w-5/5 border-red-600 border-2 rounded flex flex-col p-2 text-white ">
                    <text className=" font-medium"> Category</text>
                    <text>Dry Fruits, Masala & Oil</text>
                    <text>Atta, Rice & Dal</text>
                    <text>Sweets & Chocolate</text>
                    <text>Dairy & Bread</text>
                    <text>Cleaning Essentials</text>
                    <text>Sauces & Spreads</text>
                    <text>Instant Food & Breakfast</text>
                </div>


                <div className=" w-5/5 border-red-600 border-2 rounded flex flex-col p-2 text-white ">
                    <text className=" font-medium text-white"> Service in Gwalior City Part</text>
                    <text>Veerpur</text>
                    <text>Maheshpura</text>
                    <text>Nichlapura</text>
                    <text>Savariyadham</text>
                    <text>Sikandar Kampoo</text>
                    <text>Baharbigha</text>
                    
                </div>




            </div>
            </div>

            <div className=" flex flex-row justify-center  w-5/5 bg-red-600 text-white ">
                <text className=" font-light py-3">© Copyright 2025. Chanchal Mart, Gwalior-474020, India</text>
            </div>
           


           

            




            


            


            




           

            
            


           
            
        </div>
    )
}