import axios from "axios";


const API = axios.create({
    baseURL : "https://elearn.kamalonweb.com//api", 
    headers : {
        "Content-Type" : "application/json", 
        "Accept" : "application/json"
    }
})

export default API