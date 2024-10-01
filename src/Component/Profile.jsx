import React, { useEffect, useState } from "react";
import { Navbar1 } from "./Navbar1";
import { useSearchParams } from "react-router-dom";
import { Http } from "./Http";



export const Profile = ()=>{
    const [data, setData] = useState({})
    const [show, setShow] = useState(true)
    const [userdata, setUserdata] = useState({})


    const handledata = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setUserdata(userdata=>({...userdata, [name] : value}))
 
    }


    const handleButton = ()=>{
        setShow(false)
    }



    useEffect(()=>{
        Http.get("/api/user/profile",{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }
        }).then((res)=>{
            setData(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    

    const handleUserinfo = (e) =>{
        console.log(userdata)
        e.preventDefault()
        Http.put("/api/user/profile",{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }
        },{
            username :userdata.name
        }).then((res)=>{
            setData(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
        

    }

    


    return(
        <>
        <Navbar1/>
        <div className=" flex flex-col lg:absolute top-0  right-0  bg-orange-500 h-screen   w-full   lg:w-10/12 ">
            
            <div className=" flex flex-col mx-auto my-4 gap-y-3 text-xl rounded  border-red-600 border-2 py-5 w-11/12 h-96 mt-10  px-10 text-white">
                <text className="  text-2xl text-black">Personal Information</text>
               
                {
                    show ? (
                        <div className=" flex flex-col "> 
                            <div className=" flex-row flex justify-end">
                                <button onClick={handleButton} className="  rounded bg-blue-400 text-white px-4 py-1.5 ">Update Information</button>
                            </div>
                            <text>{`Username : ${data.username}`}</text>

                        </div>

                    ):(

                        

                        <div className=" flex flex-col gap-1 "> 
                            
                            <input className=" rounded py-1 pl-1" placeholder=" Enter username" name="username" value={userdata.username} onChange={handledata}  />
                            
                            <button onClick={handleUserinfo} className=" w-1/5 my-2 rounded bg-blue-400 text-white px-4 py-1.5 ">Update Information</button>
                        </div>

                    )
                }




                

                

            </div>
        </div>
        </>
    )
}