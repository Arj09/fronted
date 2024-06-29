import axios from "axios";

export const Http = axios.create({
   baseURL : "http://localhost:5000"
   //:'https://store-backend-o5qm.onrender.com'
   
})