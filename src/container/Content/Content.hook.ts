import { useEffect } from "react"
import { Category } from "./types/types";
import useCategoryStore from "./store/CategoryStore";
import axios from "axios";

export const useContentManager = () => {
    const setCategories = useCategoryStore((state) => state.setCategories);
    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.get<Category[]>(`http://localhost:8080/category`);
            setCategories(data);
        }
        fetch();
    }, []);
    return {}
}
