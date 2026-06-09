import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../features/auth/store/useAuthStore";

const CheckAuthentication = ({ children }: any) => {
    const navigate = useNavigate()
    const isAuthenticated = useAuthStore((state) => state.token);

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.setItem('redirectAfterLogin', window.location.pathname);
            navigate("/login");
        }
    }, [navigate, isAuthenticated]);

    return (
        children
    )
}
export default CheckAuthentication