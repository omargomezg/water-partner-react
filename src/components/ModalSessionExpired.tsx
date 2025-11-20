import {Modal} from "antd";
import {useAppStore} from "../store/useAppStore";
import {useEffect} from "react";

const ModalSessionExpired = () => {
    const openModal = useAppStore((state) => state.openModalSessionExpired)
    useEffect(()=>{
        if (openModal) {
            Modal.warning({
                title: "Sesión expirada",
                content: "Se ha finalizado su sesión.",
                onOk() {
                    window.location.href = '/login'
                }})
        }
    }, [openModal]);
    return <></>
}

export default ModalSessionExpired;