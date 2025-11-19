import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useAuthStore} from "../store/AuthStore";
import {appStore} from "../store/appStore";

const CheckAuthentication = ({children}: any)=>{
    const navigate = useNavigate()
    const isAuthenticated = appStore((state) => state.token);

    useEffect(() =>{
        //const isAuthenticated = useAuthStore.getState().token;
        if(!isAuthenticated) {
            navigate("/login");
        }
    },[navigate]);

    return (
        children
    )
}
export default CheckAuthentication