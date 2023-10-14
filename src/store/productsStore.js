import { create } from "zustand";
import {persist} from "zustand/middleware"

export const useProductsStore = create(persist(() => ({
    products: []
}), {name: "products"}))

export const addProducts = (data) => useProductsStore.setState({products: data})

