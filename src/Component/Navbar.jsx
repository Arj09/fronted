import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./ContextAPI/context";
import { Http } from "./Http";
import { Link } from "react-router-dom";




export const Navbar = ()=>{
    const [Show, setShow] = useState(false)
    const [searchIcon, setSearchIcon] = useState(false)
    const navigate = useNavigate()
    const { login, setLogin, noofProduct} = useContext(UserContext)

    const handleClose =()=>{
        setShow(false)
    
    }

    const handleOpen =()=>{
        setShow(true)
    
    }
    const handleSearch = ()=>{
        setSearchIcon(true)
    }
    const handleCloseIcon = ()=>{
        setSearchIcon(false)
    }


    const handleGotoCart = ()=>{

        if(!login){
            navigate("/login")
        }
        else{
            navigate("/cart")
            console.log( noofProduct)
        }
    }

    const handleLogout = ()=>{
        setLogin(false)
        localStorage.removeItem('Token')
        navigate("/")
        setShow(false)
    
    }

    const handleLogin = ()=>{
        navigate("/login")
    }

    


    useEffect(()=>{
        Http.get("/api/user/current",{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
            
        }).then((res)=>{
            console.log(res.data)
            res.data.username && setLogin(true)
            
        }).catch((err)=>{
            setLogin(false)
        })
    }, [])

  

    

   
    return(
        <>
        <div className="  bg-orange-500 w-full   h-20 flex flex-row justify-between px-5 text-center align-middle py-5 relative">

                {
                    searchIcon ? (
                        <div className=" flex flex-row w-full justify-between ">
                            <input className=" w-full rounded px-3" placeholder="Search " />
                            <text className="pt-1.5 pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={handleCloseIcon}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                            </text>

                            
                        </div>
                    ):(
                        <text className=" text-4xl text-white cursor-pointer">Chanchal Mart</text>
                    )
                }
                
                <div className=" hidden  flex-row justify-evenly  gap-10 pt-2 text-white  lg:flex md:flex sm:flex  ">
                    <ul  className="flex flex-row justify-between gap-5 cursor-pointer ">
                        
                            <Link to="/" className=" hover:border-b-2 hover:border-white"  >Home</Link>
                            <Link to="/contact"  className=" hover:border-b-2 hover:border-white"  >Contact Us</Link>

                        {
                            login ? (
                                <>
                                    <Link to="/profile" className=" hover:border-b-2 hover:border-white"   >Profile</Link>
                                    <Link onClick={handleLogout} className=" hover:border-b-2 hover:border-white"  >Logout</Link>
                                </>
                            ) : (
                                <Link to="/login" className=" hover:border-b-2 hover:border-white" >Login</Link>
                                )
                        }


                    </ul>
                    <text className="cursor-pointer" >
                    <text className=" absolute rounded-full bg-white text-red-500 px-1.5 top-4 right-3 py-0.1 " onClick={handleGotoCart}>{noofProduct}</text>  
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"  onClick={handleGotoCart}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>

                    </text>
                   

                </div>
                <div className=" flex flex-row justify-between gap-x-1 cursor-pointer text-white pt-2 lg:hidden md:hidden sm:hidden">
                    
                    {
                        searchIcon ? (
                            <div className=" hidden"></div>
                        ):(
                            <>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={handleSearch}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>

                            <div>
                            <text className=" absolute rounded-full bg-white text-red-500 px-2 top-3 right-10 py-0.5 ">{noofProduct}</text>    
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" onClick={handleGotoCart}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            </div>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={handleOpen}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                            </svg>

                           </>
                        )
                    }

                </div>
        </div>
        {
            Show ? (
                <div className=" absolute w-full bg-orange-500 h-60 flex flex-col mx-auto top-0 z-40  ">
                   

                    <text className="flex flex-row mx-10 my-5 text-white text-2xl justify-end" onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    </text>
                    <ul className=" flex flex-col justify-center mx-auto my-1 text-white cursor-pointer  gap-1">
                        {
                            login ? (
                                <>
                                <Link to="/"  >Home</Link>
                                <Link to="/contact" >Contact US</Link>
                                <Link to="/profile" >Profile</Link>
                                <Link to="/"  onClick={handleLogout}>Logout</Link>
                                
                                </>
                            ):(
                                <>
                                <Link to="/" >Home</Link>
                                <Link to="/contact" >Contact US</Link>
                                <Link to="/login" >Login</Link>
                                </>

                            )
                        }

                    </ul>

                </div>
            ):(
                <div className=" hidden"></div>
            )
        }
        </>



    )
}