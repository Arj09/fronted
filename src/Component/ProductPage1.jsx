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
    const { login, category1 , noofProduct, setnoofProduct, sub, setSub,  productID , setProductID } = useContext(UserContext)
    const [popup, setPopup] = useState(true)
    const [show, setShow] = useState(false)
   // const [productID , setProductID] = useState()
    const [itemA, setItemA] = useState(true)

    const [cate, setCate] = useState([])

    const [item, setItem] = useState('')

    const [selectSub, setselectSub] = useState("all")
    


   


   
    
   

  
    


   
    useEffect(()=>{
             Http.get("/api/category",{
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                }
        
            }).then((res)=>{
                //console.log(res.data)
               
                setCate(res.data)
                
            }).catch((err)=>{
                console.log(err)
            })
    
        }, [])


        


    
    
    
   
    

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
    },[noofProduct])

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




    

    const handleSearch = ()=>{

    }



   


    const handleCategory = (e)=>{
      
        setCategory(e.target.value)

    }
    

    const handledata = (data, cate)=>{
        setselectSub("all")
        setProductID(cate)
        setSub(data)
        console.log(data)

    }

    const handleSubCategory = (data)=>{
        setselectSub(data)
        
        
    }
    

   

    return(
        <>
        <Navbar/>

        <div className=" w-4/5 mx-auto flex flex-row my-5 justify-center ">
            <input  placeholder=" Search" className=" border-2 border-black    pl-2 w-4/5 py-2 rounded mr-5"  onChange={(e)=>setItem(e.target.value)} value={item}  />
            <button className=" bg-red-700 text-white  rounded px-4 py-1.5 " onSubmit={handleSearch}>Search</button>
        </div>

        


        <div className=" w-4/5 mx-auto p-2 rounded grid grid-flow-row grid-cols-5 gap-1.5  ">
                    
            {
                cate.map((data, index)=>{
                    return(
                        <div className=" w-5/5 border-2  rounded p-1.5 flex justify-center ">
                            <text className=" cursor-pointer" onClick={()=>handledata(data.category_item,data.category_name )}>{data.category_name}</text>
                        </div>
                    )
                })

            }

        </div>

       


        
        


       

        <div className=" flex flex-row w-4/5   mx-auto rounded">
            <div className=" w-1/12 border-2 border-r-0 flex flex-col gap-y-1.5 p-1 rounded  ">
                  

                    {
                        sub.map((data, index)=>{
                            return(
                                <div className=" w-5/5 border-2  rounded p-1.5  cursor-pointer justify-center flex" onClick={()=>handleSubCategory(data.item_name)}>
                                    <text className=" text-xs text-center"  >{data.item_name}</text>
                                </div>
                    )
                })

            }


            </div>



            <div className=" w-11/12  border-2 grid grid-flow-row grid-cols-5 gap-1.5 p-1 rounded  ">
                {
                    data
                    .filter((data)=>data.name.toLowerCase().startsWith(item.toLowerCase()))
                    .filter((data)=> productID == "all"  ? data :  data.category.toLowerCase() == productID.trim().toLowerCase() )
                    .filter((data)=> selectSub == "all" ? data : data.subcategory.toLowerCase() == selectSub.toLowerCase()  )
                    .map((data, index)=>{
                        return(
                            <div className=" relative w-5/5 rounded border-2 shadow-lg shadow-orange-200 hover:border-red-700 px-1 py-2 flex flex-col">
                                    <div className=" w-5/5 h-[150px] rounded ">
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
                                                            
                                    <div className=" w-5/5 flex flex-row justify-between  rounded p-1 " >
                                        {
                                            data.mrp > data.price ? <p className="py-1.5">&#x20B9;<text className=" pr-1 line-through py-1.5">{data.mrp}</text>{data.price}</p> : <p className="py-1.5">&#x20B9;<text className="py-1.5">{data.mrp}</text></p>
                                        }
                                        <button className=" px-2 py-1.5 text-white bg-red-700  rounded" onClick={()=>handleAddProduct(data._id)}>Add</button>
                                                                
                            
                                    </div>
                                                        
                            
                                </div>
                        )
                    })
                }
                    



            </div>

        </div>


       

        
        </>

    )
}