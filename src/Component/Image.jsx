import { useEffect, useState } from "react"
import { Http } from "./Http"



export const Image = ()=>{
    const [image, setImage] = useState()
    const [data, setData] = useState([])
    const [count, setCount] = useState(0)

    

    const SubmitImage = async(e)=>{
        e.preventDefault()

        const formData = new FormData() 
        formData.append("product", image)

        const result = await Http.post("api/image-upload",
            formData,
            {
            headers: { "Content-Type": "multipart/form-data" },
            }
        ).then((res)=>{
            console.log(res.data)
            setCount(count+1)
           setImage(' ')
        }).catch((err)=>{
            console.log(err)
        })

    }



    const handleImage = (e) =>{
        console.log(e.target.files[0])
        setImage(e.target.files[0])
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


    return(

        <>
        <text>working on image</text>

        <form onSubmit={SubmitImage} action="/image-upload" enctype="multipart/form-data" className=" w-4/5 flex flex-col mx-auto my-5 gap-y-5 " >
            
            <div className=" w-4/5 border-2 border-red-400 h-24 text-center flex flex-col justify-center mx-auto ">
            <input type="file" accept="image/*" onChange={handleImage}  className=" text-center flex flex-row mx-auto">

                
            </input>

            

            </div>
            <button className=" w-4/5 px-2 py-1.5 bg-orange-400 mx-auto text-white">Submit</button>
        </form>

        <div className=" flex flex-col w-4/5 mx-auto my-5">

        {
            data.map((data, index)=>{
                return(
                    <>
                    <div>{data.image}</div>
                    <img src={`https://store-backend-o5qm.onrender.com/images/${data.image}`} alt="loading" />
                    </>
                    
                )
            })
        }
        </div>
        
        
        
        
        </>
    )

}