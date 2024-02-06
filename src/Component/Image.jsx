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

    

    

    const SubmitImage = async(e)=>{
        e.preventDefault()
        console.log("upload")

        const formData = new FormData() 
        formData.append("product", image)
        formData.append("name", name)
        formData.append("price", price)
        formData.append("quantity", quantity)
        formData.append("category", category)

        const result = await Http.post("api/image-upload",
            formData,
            
            {
            headers: { "Content-Type": "multipart/form-data" },
            }
        ).then((res)=>{
            setShow(true)
            console.log(res.data)
            console.log("sucessfully uploaded")
            setCount(count =>count +=1)
           setImage('')
        }).catch((err)=>{
            console.log(err)
        })

    }



   

    useEffect(()=>{
        Http.get("https://store-backend-o5qm.onrender.com/api/image-upload").then((res)=>{
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
        <text>working on image</text>

        {
            show && (
                <div className=" absolute flex flex-col w-3/5 bg-red-400 h-44 right-0 left-0 mx-auto top-8">
                    <div className=" flex flex-col mx-auto w-4/5 my-3 text-center justify-center">
                        <text className=" flex flex-row justify-end px-5  text-xl text-white" onClick={handleClose}>X</text>
                        <text className=" text-xl text-white ">Image Uploaded </text>

                    </div>

                </div>
            )
        }
        <form onSubmit={SubmitImage} action="/image-upload" enctype="multipart/form-data" className=" w-4/5 flex flex-col mx-auto my-5 gap-y-5 " >
            
            <div className=" w-4/5 border-2 border-red-400 pt-10 text-center flex flex-col justify-center mx-auto ">
                <input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files[0])}  className=" text-center flex flex-row mx-auto"/>
                <input className=" border-2 border-black mt-2 w-4/5 mx-auto mb-4" placeholder=" Enter name"  name=" name" onChange={(e)=>setName(e.target.value)} />
                <input className=" border-2 border-black mt-2 w-4/5 mx-auto mb-4" placeholder=" Enter price"  name=" price" onChange={(e)=>setPrice(e.target.value)} />
                <input className=" border-2 border-black mt-2 w-4/5 mx-auto mb-4" placeholder=" Enter category"  name=" category" onChange={(e)=>setCategory(e.target.value)} />
                <input className=" border-2 border-black mt-2 w-4/5 mx-auto mb-4" placeholder=" Enter quantity"  name=" quantity" onChange={(e)=>setQuantity(e.target.value)} />
            </div>
            <button className=" w-4/5 px-2 py-1.5 bg-orange-400 mx-auto text-white">Submit</button>
        </form>



        <div className=" flex flex-col w-4/5 mx-auto my-5">

        {
            data.map((data, index)=>{
                return(
                    <>
                    <div>{data.image}</div>
                    <img src={`http://localhost:5000/images/${data.image}`} alt="loading" />
                    <text>{data.name}</text>
                    </>
                    
                )
            })
        }
        </div>
        
        
        
        
        </>
    )

}