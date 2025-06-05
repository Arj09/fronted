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
    const { login, mutlisector, category1 , noofProduct, setnoofProduct, setmultisector } = useContext(UserContext)
    const [popup, setPopup] = useState(true)
    const [show, setShow] = useState(false)
    const [productID , setProductID] = useState()
    const [itemA, setItemA] = useState(true)

    const [item, setItem] = useState('')



    
  
   



    
    
    

    

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
        setmultisector("")
        setCategory(e.target.value)

    }
   

    console.log("multi", mutlisector , "cate" , category)

    return(
        <>
        <Navbar/>

        <div className=" w-4/5 mx-auto flex flex-row my-5 justify-center ">
            <input  placeholder=" Search" className=" border-2 border-black    pl-2 w-4/5 py-2 rounded mr-5"  onChange={(e)=>setItem(e.target.value)} value={item}  />
            <button className=" bg-red-700 text-white  rounded px-4 py-1.5 " onSubmit={handleSearch}>Search</button>
        </div>

        <div className=" w-4/5 mx-auto my-3 flex flex-row justify-between border-2 bg-orange-500 border-red-500 rounded sm:px-5 px-1 py-1">
            <div className=" flex flex-row align-middle   ">

                <text className=" sm:px-2 mx-2 sm:pt-1 text-white text-xl">Filter</text>
                
                <select className=" appearance-none px-2 py-1 border-2 border-gra-100 rounded " value={category} onChange={handleCategory}>
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
        
        


        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 grid-flow-row mx-auto border-none w-5/5 sm:w-11/12 md:w-4/5 p-2 my-5">
            {   data.length !=0 ? (
                data
                .filter((data)=>data.name.toLowerCase().startsWith(item.toLowerCase()))
                .filter((data)=> category == "all" ? data : data.category.toLowerCase() === category.toLowerCase())
                .filter((data)=> category1 == "all" ? data :  data.category.toLowerCase() == mutlisector[0] || data.category.toLowerCase() == mutlisector[1])
                .map((data, index)=>{
                    return(
                        <div className=" relative w-5/5 rounded border-2 hover:border-red-700 px-1 py-2 flex flex-col">
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
                ):(
                    <text>Loading</text> 
                )
            }

        </div>


       

        
        </>

    )
}