import React, {useState} from "react";


export const Notification = ({title, description})=>{

    const [show, setShow] = useState(false)

    const handleButton = ()=>{
        setShow(true)

        setTimeout(() => {
            setShow(false)
            console.log("off")
        }, 1000);
    }



    return(
        <>

        <div className=" relative w-2/5 bg-orange-500 text-white rounded flex flex-col gap-2 px-4 py-5 my-20 mx-auto ">

        <text className=" text-2xl">{title}</text>
        <text >{description}</text>
        {
            show && (
                <label  className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-400 rounded px-4 py-1.5">Added</label>
            )
        }

        <button className=" bg-red-500 text-white px-4 py-2 rounded"  onClick={handleButton}>Click</button>

        </div>
        
        
        
        </>
    )

}