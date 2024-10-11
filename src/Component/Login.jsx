import { useContext, useState } from "react"
import { Http } from "./Http";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./ContextAPI/context";


export const Login = ()=>{
    const [loginData, setLoginData] = useState({})
    const [registerData, setRegisterData] = useState({})
    const [show, setShow] = useState(true)
    const navigate = useNavigate()

    const { setLogin} = useContext(UserContext)

    const handleData1 = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setLoginData(loginData=>({...loginData, [name]:value}))

    }

    const handleData = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setRegisterData(registerData=>({...registerData, [name]:value}))

    }


    const SubmitLoginData = (e)=>{
        e.preventDefault();
        Http.post("/api/user/login", {
            email : loginData.email,
            password : loginData.password
        }).then((res)=>{
            setLogin(true)
           
            localStorage.setItem("Token", res.data.accessToken)
            navigate("/")
            console.log(res.data)
        }).catch((err)=>{
            alert(err.response.data.message)
            
        })
       setLoginData({email:"", password:""})
    }


    const SumbitRegisterdata = (e)=>{
        e.preventDefault();
        Http.post("/api/user/register", {
            username : registerData.username,
            email : registerData.email,
            password : registerData.password
        }).then((res)=>{
            alert("login Successfully")
            setShow(true)
        }).catch((err)=>{
            alert(err.response.data.message)
           
        })
       setLoginData({email:"", password:""})
    }





    return(
        <div className=" flex flex-col w-screen bg-orange-400 h-screen">
            {
                show ?(
                    <form onSubmit={SubmitLoginData} className=" flex flex-col w-4/5 h-96 mt-32 text-center bg-red-400 mx-auto gap-y-4 rounded lg:w-1/5 md:w-2/5 ">
                        <text className="text-white  text-center text-3xl mt-10">MiniStore</text>
                        <input className=" w-4/5 mx-auto h-10 rounded pl-3  " placeholder="Enter email"  name="email" value={loginData.email || ""} onChange={handleData1} />
                        <input type="password" className=" w-4/5 mx-auto h-10 rounded pl-3  " placeholder="Enter password"  name="password" value={loginData.password || ""} onChange={handleData1} />
                        <text className=" flex flex-row justify-end w-4/5 cursor-pointer  text-sm">Forgot password</text>
                        <button className=" w-4/5 mx-auto px-2 py-1.5 bg-orange-500 text-white cursor-pointer">Login</button>
                        <text className=" pb-5 text-white cursor-pointer " onClick={(e)=>setShow(false)}>Register</text>
                    </form>
                ):(
                    <form onSubmit={SumbitRegisterdata} className=" flex flex-col w-4/5 text-center h-96 mt-32 bg-red-400 mx-auto gap-y-6 rounded lg:w-1/5 md:w-2/5  ">
                        <text className="text-white  text-center text-3xl mt-10">MiniStore</text>
                        <input className=" w-4/5 mx-auto h-10 rounded pl-3  " placeholder="Enter username"  name="username" value={registerData.username || ""} onChange={handleData} />
                        <input className=" w-4/5 mx-auto h-10 rounded pl-3  " placeholder="Enter email"  name="email" value={registerData.email || ""} onChange={handleData} />
                        <input type="password" className=" w-4/5 mx-auto h-10 rounded pl-3  " placeholder="Enter password"  name="password" value={registerData.password || ""} onChange={handleData} />
                        <button className=" w-4/5 mx-auto px-2 py-1.5 bg-orange-500 text-white cursor-pointer">Register</button>
                        <text className=" pb-5 text-white cursor-pointer " onClick={(e)=>setShow(true)}> Click if already a customer</text>
                    </form>
                
                )
            }

        </div>
    )
}