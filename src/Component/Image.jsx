import { useEffect, useState } from "react"
import { Http } from "./Http"



export const Image = ()=>{
    const [image, setImage] = useState()
    const [data, setData] = useState([])
    const [count, setCount] = useState(0)
    const [show, setShow] = useState(false)
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState("")
    const [mrp, setMrp] = useState("")
    const [error, setError] = useState("Data Uploaded Successfully")

    

    

    const SubmitImage = (e)=>{
        e.preventDefault()
       
        if(!name || !quantity || !category || !mrp || !price ){
            setShow(true)
            setError("Please fill all fields ")
        }
      
        const formData = new FormData() 
        formData.append("image", image)
        formData.append("name", name)
        formData.append("price", price)
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
            setShow(true)
            console.log(res.data)
            console.log("sucessfully uploaded")
            setCount(count =>count +=1)
          
        }).catch((err)=>{
            setShow(true)
            //setError(error=>err.response.data.message)
            //console.log(err.response.data.message)
        })

        

        setImage("")
        setName("")
        setCategory("")
        setMrp("")
        setPrice("")
        setQuantity("")

    }



   

    useEffect(()=>{
        Http.get("/api/image-upload").then((res)=>{
            console.log(res.data.Image)
            setData(res.data.Image)
            setImage('')
        }).catch((err)=>{
            console.log(err)
        })

    },[count])


    const handleClose = ()=>{
        setShow(false)

    }


    return(

        <>
        <text className=" flex flex-row w-4/5 mx-auto my-5 text-white justify-center text-2xl bg-red-600 py-2"> Add Product Details</text>

        {
            show && (
                <div className=" absolute flex flex-col w-2/5 bg-red-400 h-56 right-0 left-0 mx-auto top-44">
                    <div className=" flex flex-col mx-auto w-4/5 my-10 h-3/5   border-2 border-gray-200">
                        <text className=" text-right px-10 pt-5  text-white cursor-pointer" onClick={handleClose}>X</text>
                        <text className=" text-xl text-white text-center pt-4 ">{error}</text>

                    </div>

                </div>
            )
        }
        <form onSubmit={SubmitImage} action="/image-upload" enctype="multipart/form-data" className=" w-4/5 flex flex-col mx-auto my-5 gap-y-5 " >
            
            <div className=" w-4/5 border-2 border-red-400 pt-10 text-center flex flex-col justify-center mx-auto ">
               
                <input className=" border-2 border-black mt-2 w-4/5 mx-auto mb-4 py-2 pl-2 rounded" placeholder=" Enter name"  name=" name"  value={name || ""} onChange={(e)=>setName(e.target.value )} />
                <input className=" border-2 border-black mt-2 w-4/5 mx-auto mb-4 py-2 pl-2 rounded" placeholder=" Enter price"  name=" price" value={price || ""} onChange={(e)=>setPrice(e.target.value)} />
                <input className=" border-2 border-black mt-2 w-4/5 mx-auto mb-4 py-2 pl-2 rounded" placeholder=" Enter mrp"  name=" mrp" value={mrp || ""} onChange={(e)=>setMrp(e.target.value)} />
                <input className=" border-2 border-black mt-2 w-4/5 mx-auto mb-4 py-2 pl-2 rounded" placeholder=" Enter category"  name="  category" value={category || ""} onChange={(e)=>setCategory(e.target.value)} />
                <input className=" border-2 border-black mt-2 w-4/5 mx-auto mb-4 py-2 pl-2 rounded" placeholder=" Enter quantity"  name=" quantity" value={quantity || ""} onChange={(e)=>setQuantity(e.target.value)} />
                <div className=" w-4/5 flex flex-row mx-auto mb-10 mt-3">
                    <text className=" pr-5">Product Image :</text>
                    <input type="file" accept="image/*"  placeholder="Enter" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
            </div>
            <button className=" w-4/5 px-2 py-1.5 text-xl bg-orange-400 mx-auto text-white">Submit</button>
        </form>



        <div className=" flex flex-col w-4/5 mx-auto my-5">

        {
            data?.map((data, index)=>{
                return(
                    <div key={index}>
                    <div>{data?.image}</div>
                    <img src={`http://localhost:5000/images/${data?.image}`} alt="loading" />
                    
                    <text>{`Product name : ${data?.name}`}</text>
                    <text>{`Product MRP : ${data?.mrp}`}</text>
                    <text>{`Product Price : ${data?.price}`}</text>
                    <text>{`Product Quantity : ${data?.quantity}`}</text>
                    <text>{`Product Category : ${data?.category}`}</text>
                    </div>
                    
                )
            })
        }
        </div>
        
        
        
        
        </>
    )

}