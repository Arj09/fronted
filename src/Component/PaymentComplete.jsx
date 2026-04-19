import React, {useEffect, useState} from "react";
import { Http } from "./Http";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./ContextAPI/context";




export const PaymentComplete = ()=>{
    const navigate = useNavigate()
    const { setOrderID,  orderDetail } = useContext(UserContext)
    const [ user, SetUser] = useState({})


    useEffect(()=>{
            Http.get("/api/user/current",{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
                
            }).then((res)=>{
                console.log(res.data)
                SetUser(res.data.id)
               
                
            }).catch((err)=>{
                console.log(err.data)
               
            })
        }, [])

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        //const result = await axios.post("http://localhost:5000/payment/order");

        const result = await Http.post(`/api/payment/${100}`)

        console.log(result)
        
        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        
        

        const options = {
            key: "rzp_live_BQiooBjzDJVZ20", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Chanchal Mart",
            description: "Groccery Store",
           
            order_id: order_id,
            
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    user_id : user
                };
                setOrderID(data)
                console.log(data)
              

                const result = await Http.post("/api/payment/success", data);
                //setOrderID(data.response.razorpay_order_id)
                
                if(result){
                    navigate("/success")
                }
            },
            prefill: {
                name: user.username,
                email: user.email,
                contact: user?.mobile,
            },
            notes: {
                address: "",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }


    return(
        <div className=" w-4/5 mx-auto p-5">
                <p className=" font-serif">Order Amount</p>
                <button className=" px-2 py-1 bg-red-500 text-white rounded" onClick={displayRazorpay}>
                    Pay ₹500
                </button>
        </div>
    )
}