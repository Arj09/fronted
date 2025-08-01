import React, { useContext }  from "react";
import { useState, useEffect } from "react";
import { Http } from "./Http";
import { UserContext } from "./ContextAPI/context";
import { useNavigate } from "react-router-dom";


export const AddProduct = ()=>{

    const [data, setData] = useState({})
    const [image, setImage] = useState('')
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [mrp, setMrp] = useState("")
    const [category, setCategory] = useState("")
     const [subcategory, setsubCategory] = useState("")
    const [quantity, setQuantity] = useState("")
    const { editProductID , productEdit }  = useContext(UserContext)
    const navigate = useNavigate()
    const [category1, setCategory1] = useState([])
    const [type1, setType1] = useState([])



    
    useEffect(()=>{
             Http.get("/api/category",{
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                }
        
            }).then((res)=>{
                setCategory1(res.data)
            }).catch((err)=>{
                console.log(err)
            })
    
        }, [])


        
    

    const  HandleProductEdit = (e) =>{
        e.preventDefault()

        Http.put(`api/product/${editProductID._id}`,{

            mrp : data.mrp,
            name: data.name,
            price: data.price,
            category : data.category,
            subcategory : data.subcategory,
            quantity : data.quantity

        },{
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
        }
            
        ).then((res)=>{
            console.log(res.data)
           // setCount(count+1)
           alert("Product Add Sucessfully")
           navigate("/admin")
           
           
        }).catch((err)=>{
            console.log(err)
        
            
        })

    }

    const handleSubmit =  (e)=>{
        e.preventDefault()
        console.log(image)

        

        const formData = new FormData() 
        formData.append("image", image)
        formData.append("name", name)
        formData.append("price", price)
        formData.append("quantity", quantity)
     
        formData.append("subcategory", subcategory)
        formData.append("mrp", mrp)

        console.log(" it is form data",formData)
        
        
        Http.post("api/product",formData,{
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
        }
            
        ).then((res)=>{
            console.log(res.data)
           // setCount(count+1)
           alert("Product Add Sucessfully")
           
        }).catch((err)=>{
            console.log(err)
            
        })
        

       
        

    }

    const handleEditdata =(e)=>{
        const name = e.target.name;
        const value = e.target.value ;

        setData(data=>({...data, [name]:value}))

    }


    



  
    return(
        <>
        <text className=" mx-auto text-white bg-red-600 py-3 w-4/5 flex flex-row text-center justify-center text-xl mt-5">{productEdit ? `Edit Product Detail Page` :` Add Product Detail Page`}</text>
        <form onSubmit={productEdit ? HandleProductEdit : handleSubmit} action="/image-upload" enctype="multipart/form-data" className=" w-4/5 flex flex-col mx-auto my-5 border-2 border-red-400 gap-y-5 pt-10 pb-3  ">

            <input placeholder=" Enter Product Name" className=" w-4/5 border-2 border-black py-2 pl-2 mx-auto rounded"  name="name" value={ name || "" } onChange={(e)=>setName(e.target.value)}  />
            
            <input placeholder=" Enter Product Selling Price " className=" w-4/5 border-2 border-black py-2 pl-2 mx-auto rounded" name="price" value={price || ""} onChange={(e)=>setPrice(e.target.value)}/>
            <input placeholder=" Enter Product MRP " className=" w-4/5 border-2 border-black py-2 pl-2 mx-auto rounded" name="mrp" value={mrp || ""} onChange={(e)=>setMrp(e.target.value)}/>
            <input placeholder=" Enter Product quantity " className=" w-4/5 border-2 border-black py-2 pl-2 mx-auto rounded"  name="quantity"   value={ quantity || ""} onChange={(e)=>setQuantity(e.target.value)}/>
            

            <select className=" border-2 border-black py-2 pl-2 w-4/5 mx-auto rounded" name="category"  value={ category || ""} onChange={(e)=>setCategory(e.target.value)} >
                    {
                        category1.map((data)=>{
                            return(
                                <option >{data.category_name}</option>

                            )
                        })
                    }
                   
                    
            </select>

            <select className=" border-2 border-black py-2 pl-2 w-4/5 mx-auto rounded" name="subcategory"  value={ subcategory || ""} onChange={(e)=>setsubCategory(e.target.value)} >
                {
                    category1
                    .filter((data)=>data.category == category ?? data.category_item)
                    //.filter((data)=>)
                    .map((data, index)=>{
                        return(
                            <option key={index}>{data.item_name}</option>
                        )
                    })
                }
            </select>
            <input type="file" accept="image/*" className=" border-2 border-black py-2 pl-2 w-4/5 mx-auto rounded"  onChange={(e)=>setImage(e.target.files[0])} />
            <button className=" bg-red-600 py-2.5 cursor-pointer text-xl pl-2 w-4/5 mx-auto rounded text-white">Add Product</button>

        </form>
























        <form  onSubmit={HandleProductEdit} className=" w-4/5 border-2 rounded p-2 mx-auto my-5 flex flex-col gap-2">
            <input placeholder=" Enter Product Name" className=" w-4/5 border-2 border-black py-2 pl-2 mx-auto rounded"  name="name" value={ data.name || ""  }onChange={handleEditdata}  />
            <input placeholder=" Enter Product MRP" className=" w-4/5 border-2 border-black py-2 pl-2 mx-auto rounded"  name="mrp" value={ data.mrp || ""  }onChange={handleEditdata}  />
            <input placeholder=" Enter Product price" className=" w-4/5 border-2 border-black py-2 pl-2 mx-auto rounded"  name="price" value={ data.price || ""  }onChange={handleEditdata}  />
            <input placeholder=" Enter Product quantity" className=" w-4/5 border-2 border-black py-2 pl-2 mx-auto rounded"  name="quantity" value={ data.quantity || ""  }onChange={handleEditdata}  />
          
            <input placeholder=" Enter Product subcategory" className=" w-4/5 border-2 border-black py-2 pl-2 mx-auto rounded"  name="mrp" value={ data.subcategory || ""  }onChange={handleEditdata}  />

            <button className=" bg-red-600 py-2.5 cursor-pointer text-xl pl-2 w-4/5  mx-auto rounded text-white">Add Product</button>
        </form>










        <div className=" flex flex-col rounded w-4/5 mx-auto border-2 p-4 mb-10 gap-3">
            <input placeholder=" Enter Product name" className=" pl-2 w-4/5 m-auto rounded py-2  border-2" />
            
            <input placeholder=" Enter Product MRP" className=" pl-2 w-4/5 m-auto rounded py-2  border-2" />
            <input placeholder=" Enter Product Sale Price" className=" pl-2 w-4/5 m-auto rounded py-2  border-2" />
            <input placeholder=" Enter Product Quantity" className=" pl-2 w-4/5 m-auto rounded py-2  border-2" />
            <input placeholder=" Enter Product expairy" className=" pl-2 w-4/5 m-auto rounded py-2  border-2" />

            <div className=" w-4/5   mx-auto gap-2 grid grid-cols-1 md:grid-cols-2 grid-rows-1 rounded">

            <div className="   w-5/5 flex flex-col sm:flex-row gap-x-1   ">
                <label className=" w-1/5 border-2 py-2 rounded px-2">Category</label>
                <select className=" w-4/5 border-2 py-2 rounded px-2">
                    <option>Paneer</option>
                    <option>Paneer 1</option>
                    <option>Paneer 2</option>
                </select>

            </div>

            <div className="   w-5/5 flex flex-row gap-x-1  ">
                <label className=" w-1/5 border-2 py-2 rounded px-2">Type</label>
                <select className=" w-4/5 border-2 py-2 rounded px-2">
                    <option>Paneer</option>
                    <option>Paneer 1</option>
                    <option>Paneer 2</option>
                </select>

            </div>
           
            
            </div>
            <input type="file" accept="image/*" className=" border-2 py-2 pl-2 w-4/5 mx-auto rounded"  />
            <button className=" bg-red-600 py-2.5 cursor-pointer text-xl pl-2 w-4/5 mx-auto rounded text-white">Add Product</button>




        </div>


       

           


        </>
    )
}