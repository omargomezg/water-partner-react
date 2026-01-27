import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppStore } from "../store/useAppStore";

const CheckAuthentication = ({ children }: any) => {
    const navigate = useNavigate()
    const isAuthenticated = useAppStore((state) => state.token);

    useEffect(() => {
        //const isAuthenticated = useAuthStore.getState().token;
        if (!isAuthenticated) {
            // Save current path to return after login
            localStorage.setItem('redirectAfterLogin', window.location.pathname);
            navigate("/login");
        }
    }, [navigate, isAuthenticated]);

    return (
        children
    )
}
export default CheckAuthentication