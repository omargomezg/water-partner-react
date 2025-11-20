import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useAppStore} from "../store/useAppStore";

const CheckAuthentication = ({children}: any)=>{
    const navigate = useNavigate()
    const isAuthenticated = useAppStore((state) => state.token);

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