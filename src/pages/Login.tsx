import {useAuthStore} from "../store/AuthStore";
import {useEffect} from "react";
import LoginContainer from "../container/Login/Login.container";

const LoginPage = () => {
    const {setToken} = useAuthStore()

    useEffect(() => {
        setToken("", "")
    }, [setToken])

    return <LoginContainer></LoginContainer>
}

export default LoginPage
