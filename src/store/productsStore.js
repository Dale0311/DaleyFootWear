import { create } from "zustand";

export const useProductsStore = create(() => ({
    products: []
}))

export const addProducts = (data) => useProductsStore.setState({products: data})

