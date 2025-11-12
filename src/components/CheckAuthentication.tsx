import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useAuthStore} from "../store/AuthStore";

const CheckAuthentication = ({children}: any)=>{
    const navigate = useNavigate()

    useEffect(() =>{
        const isAuthenticated = useAuthStore.getState().token;
        if(!isAuthenticated) {
            navigate("/login");
        }
    },[navigate])

    return (
        children
    )
}
export default CheckAuthentication