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
        setData(data=>({...data, [name] : value}))
 
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
            setUserdata(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    

    const handleUserinfo = (e) =>{
        e.preventDefault()

        Http.put("/api/user/profile",{

            mobile_no : data.mobile ? data.mobile : userdata.mobile_no,
            username : data.username ? data.username : userdata.username,
            pin_no : data.pincode ? data.pincode : userdata.pin_no,
            address : data.address ? data.address : userdata.address,
            email : data.email ? data.email : userdata.email

        },
        {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }
        }).then((res)=>{
            alert("Suc")
            setData(res.data)
            setData({mobile:"", pincode:"", email :"", address:"", username:''})
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
        

    }

    


    return(
        <div className=" flex flex-row">
        <div className="  w-2/12 ">
            <Navbar1/>

        </div>
        <div className=" w-10/12 bg-red-800 ">

            {
                show ? (
                    <div className=" w-5/5  flex flex-col py-4 mt-5 px-10  text-white rounded m-2">
                        <text  className=" text-2xl font-light p-2  text-white"> Personal Information</text>
                        <text className="px-2 ">Username : {userdata.username}</text>
                        <text className=" px-2">Email Address : {userdata.email}</text>
                        <text className=" px-2">address : {userdata.address}</text>
                        <text className=" px-2">Mobile : {userdata.mobile_no}</text>
                       



                    </div>
                ) : (

                    <form onSubmit={handleUserinfo} className=" w-5/5  flex flex-col py-4 mt-5 px-10 gap-2 ">
                        <text  className=" text-2xl font-light p-2  text-white"> Personal Information</text>
                        <input className=" w-4/5 p-2 rounded " placeholder=" Enter Username" name="username" value={data.username} onChange={handledata } />
                        <input className=" w-4/5 p-2 rounded " placeholder=" Enter Mobile_no" name="mobile" value={data.mobile} onChange={handledata} />
                        <input className=" w-4/5 p-2 rounded " placeholder=" Enter Email Address"  name="email" value={data.email} onChange={handledata }/>
                        <input className=" w-4/5 p-2 rounded " placeholder=" Enter Pin code"  name=" Pincode" value={data.pincode} onChange={handledata}/>
                        <input className=" w-4/5 p-2 rounded " placeholder=" Enter Address" name="address" value={ data.address} onChange={ handledata} />
                        <button className=" bg-orange-500 p-2 w-4/5 rounded cursor-pointer text-white"> Change Personal Details</button>
                    </form>
                    )

            }


            <form className=" w-5/5  flex flex-col py-4 mt-5 px-10 gap-2">
                <text  className=" text-2xl font-light p-2  text-white"> Password</text>
                <input className=" w-4/5 p-2 rounded " placeholder=" Enter current password" />
                <input className=" w-4/5 p-2 rounded " placeholder=" Enter new passowrd" />
                <button className=" bg-orange-500 p-2 w-4/5 rounded cursor-pointer text-white"> Change Password</button>
                
            </form>
            
            

        </div>
        </div>
    )
}