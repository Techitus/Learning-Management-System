import axios from "axios";


const API = axios.create({
    baseURL : "https://elearnnnepal.vercel.app/api", 
    headers : {
        "Content-Type" : "application/json", 
        "Accept" : "application/json"
    }
})

export default API