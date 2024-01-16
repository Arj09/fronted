import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Home = ()=>{
    const [Show, setShow] = useState(false)
    const [searchIcon, setSearchIcon] = useState(false)
    const data = [1,1,1,1,,1,1,1,1,1,]
    const navigate = useNavigate()

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
        navigate("/cart")
    }
    const handleLogout = ()=>{
        
    }

    const handleProduct = ()=>{
        navigate("/productpage")
    }
    return(
        <div>
            <div className=" relative bg-orange-400 w-full  h-20 flex flex-row justify-between px-5 text-center align-middle py-5 relative">
                
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
                        <text className=" text-3xl text-white cursor-pointer">MiniMart</text>
                    )
                }
                
                <input  className=" hidden rounded px-3 py-2 xl:w-96 lg:w-96 md:w-64 sm:w-36 sm:flex " placeholder="Search"/>
                <div className="flex flex-row justify-evenly  gap-10 pt-2 text-white hidden lg:flex md:flex sm:flex ">
                    <ul  className="flex flex-row justify-between gap-5 cursor-pointer ">
                        
                        <li><a href="http://localhost:3000" >Home</a> </li>
                        <li><a href="http://localhost:3000/contact" >About us</a> </li>
                        <li><a href="http://localhost:3000/profile" >Profile</a> </li>
                        <li onClick={handleLogout}>Logout</li>
                    </ul>
                    <text className="cursor-pointer" >
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

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" onClick={handleGotoCart}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>

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
                    <div className=" absolute w-full bg-orange-400 h-60 flex flex-col mx-auto top-0  ">
                       

                        <text className="flex flex-row mx-10 my-5 text-white text-2xl justify-end" onClick={handleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        </text>
                        <ul className=" flex flex-col justify-center mx-auto my-1 text-white cursor-pointer  gap-1">
                            <li>Home</li>
                            <li>Contact</li>
                            <li>Profile</li>
                            <li>Cart</li>
                            <li>Logout</li>
                        </ul>

                    </div>
                ):(
                    <div className=" hidden"></div>
                )
            }






            <div className=" flex flex-row mx-auto w-4/5 my-5 border-2 file:border-gray-500 h-96  rounded">
                
            </div>
            <text className=" w-4/5 mx-auto flex flex-row text-2xl"> New add Product</text>

            <div className=" grid grid-rows-1 grid-flow-col w-4/5 h-72 gap-x-2 pt-2   mx-auto my-2 overflow-scroll overflow-x-scroll overflow-y-hidden">
            {
                data.map((data, index)=>{
                    return(
                        <div className=" h-64 w-48 border-2 border-gray-400 rounded">
                            <img src="https://m.media-amazon.com/images/I/81GSuovbkwL._AC_UL480_FMwebp_QL65_.jpg" className=" w-4/5 h-3/5 mx-auto py-2" alt="aloo"/>
                            <div className=" flex flex-col pl-4">
                                <text>Tata Salt, 1kg</text>
                                <text>MRP : 28/-</text>
                                <div className="my-2 ">
                                    <button className="px-3 py-1 bg-red-600 text-white rounded">Add</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

                        <div className=" h-64 w-48 border-2 border-gray-400 rounded">
                             <text className=" flex flex-row justify-center align-middle mx-auto pt-28 cursor-pointer text-blue-700"  onClick={handleProduct}> More</text>
                        </div>
            </div>
            


            <text className=" w-4/5 mx-auto flex flex-row text-2xl"> New add Product</text>

            <div className=" grid grid-rows-1 grid-flow-col w-4/5 h-72 gap-x-2 pt-2   mx-auto my-2 overflow-scroll overflow-x-scroll overflow-y-hidden">
            {
                data.map((data, index)=>{
                    return(
                        <div className=" h-64 w-48 border-2 border-gray-400 rounded">
                            <img src="https://m.media-amazon.com/images/I/81GSuovbkwL._AC_UL480_FMwebp_QL65_.jpg" className=" w-4/5 h-3/5 mx-auto py-2" alt="aloo"/>
                            <div className=" flex flex-col pl-4">
                                <text>Tata Salt, 1kg</text>
                                <text>MRP : 28/-</text>
                                <div className="my-2 ">
                                    <button className="px-3 py-1 bg-red-600 text-white rounded">Add</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

                        <div className=" h-64 w-48 border-2 border-gray-400 rounded">
                             <text className=" flex flex-row justify-center align-middle mx-auto pt-28 cursor-pointer text-blue-700" onClick={handleProduct}> More</text>
                        </div>
            </div>


            


            




           

            
            


           
            
        </div>
    )
}