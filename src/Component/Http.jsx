import axios from "axios";

export const Http = axios.create({
   // baseURL:'https://store-backend-o5qm.onrender.com'
   baseURL : "http://localhost:5000"
})