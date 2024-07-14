import React  from "react";
import { useState } from "react";
import { Http } from "./Http";


export const AddProduct = ()=>{

    const [data, setData] = useState({})
    const [image, setImage] = useState('')
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [mrp, setMrp] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState("")

    

    

    const handleSubmit =  (e)=>{
        e.preventDefault()
        console.log(image)

        const formData = new FormData() 
        formData.append("image", image)
        formData.append("name", name)
        formData.append("price", mrp)
        formData.append("quantity", quantity)
        formData.append("category", category)
        formData.append("mrp", mrp)


      
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
            console.log(formData)
        })
        

       
        

    }

    return(
        <>
        <text className=" mx-auto text-white bg-red-600 py-3 w-4/5 flex flex-row text-center justify-center text-xl mt-5">Add Product</text>
        <form onSubmit={handleSubmit} action="/image-upload" enctype="multipart/form-data" className=" w-4/5 flex flex-col mx-auto my-5 border-2 border-red-400 gap-y-5 pt-10 pb-3  ">

            <input placeholder=" Enter Product Name" className=" w-4/5 border-2 border-black py-2 pl-2 mx-auto rounded"  name="name" value={ name || "" } onChange={(e)=>setName(e.target.value)}  />
            
            <input placeholder=" Enter Product Selling Price " className=" w-4/5 border-2 border-black py-2 pl-2 mx-auto rounded" name="price" value={price || ""} onChange={(e)=>setPrice(e.target.value)}/>
            <input placeholder=" Enter Product MRP " className=" w-4/5 border-2 border-black py-2 pl-2 mx-auto rounded" name="mrp" value={mrp || ""} onChange={(e)=>setMrp(e.target.value)}/>
            <input placeholder=" Enter Product quantity " className=" w-4/5 border-2 border-black py-2 pl-2 mx-auto rounded"  name="quantity"   value={ quantity || ""} onChange={(e)=>setQuantity(e.target.value)}/>
            <select className=" border-2 border-black py-2 pl-2 w-4/5 mx-auto rounded" name="category"  value={category || ""} onChange={(e)=>setCategory(e.target.value)} >
            <option>Biscuit</option>
                    <option>Hair oil</option>
                    <option> Oil</option>
                    <option>Pulse</option>
                    <option>Rice</option>
                    <option>Food</option>
                    <option>chocolate</option>
                    <option>Wheat floor</option>
                    <option>Cool Drink</option>
                    <option>Noodles</option>
                    <option>Tea</option>
                    <option>Detergent Powder</option>
            </select>
            <input type="file" accept="image/*" className=" border-2 border-black py-2 pl-2 w-4/5 mx-auto rounded"  onChange={(e)=>setImage(e.target.files[0])} />
            <button className=" bg-red-600 py-2.5 cursor-pointer text-xl pl-2 w-4/5 mx-auto rounded text-white">Add Product</button>

        </form>


        </>
    )
}