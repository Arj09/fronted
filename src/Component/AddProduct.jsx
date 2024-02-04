import React  from "react";
import { useState } from "react";
import { Http } from "./Http";


export const AddProduct = ()=>{

    const [data, setData] = useState({})

    const handleProduct =(e)=>{
        const name = e.target.name
        const value = e.target.value
        setData(data=>({...data, [name]: value}))

    }

    const handleImage =(e)=>{
        setData(data=>({...data, ['image']: e.target.files[0]}))

    }

    const handleSubmit =  async(e)=>{
        e.preventDefault()

        const formData = new FormData() 
        formData.append("product", data.image)

        const result = await Http.post("api/product",
            formData,
            {
            headers: { "Content-Type": "multipart/form-data" },
            }
        ).then((res)=>{
            console.log(res.data)
           // setCount(count+1)
           
        }).catch((err)=>{
            console.log(err)
        })
        

        setData({p_mrp:"", p_name:"", p_selling_price:"", category:"", image:''})
        

    }

    return(
        <>
        <text className=" mx-auto text-white bg-red-600 py-3 w-4/5 flex flex-row text-center justify-center text-xl mt-5">Add Product</text>
        <form onSubmit={handleSubmit} action="/image-upload" enctype="multipart/form-data" className=" w-4/5 flex flex-col mx-auto my-5 border-2 border-red-400 gap-y-5 pt-10 pb-3  ">

            <input placeholder=" Enter Product Name" className=" w-4/5 border-2 border-black py-2 pl-2 mx-auto rounded"   name="p_name" value={data.p_name} onChange={handleProduct} />
            
            <input placeholder=" Enter Product Selling Price " className=" w-4/5 border-2 border-black py-2 pl-2 mx-auto rounded" name="p_selling_price" value={data.p_selling_price} onChange={handleProduct}/>
            <input placeholder=" Enter Product quantity " className=" w-4/5 border-2 border-black py-2 pl-2 mx-auto rounded" name="p_quantity" value={data.p_quantity} onChange={handleProduct}/>
            <select className=" border-2 border-black py-2 pl-2 w-4/5 mx-auto rounded" name="category" value={data.category} onChange={handleProduct} >
                <option value="cata">Category</option>
                <option value="Food">Food</option>
                <option value="nodle ">Noodle</option>
                <option value="electronic">Electronic</option>
                <option value="ice">Ice</option>
            </select>
            <input type="file" accept="image/*" className=" border-2 border-black py-2 pl-2 w-4/5 mx-auto rounded"  onChange={handleImage} />
            <button className=" bg-red-600 py-2.5 cursor-pointer text-xl pl-2 w-4/5 mx-auto rounded text-white">Add Product</button>

        </form>


        </>
    )
}