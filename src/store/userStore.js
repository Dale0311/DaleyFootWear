import { create } from "zustand";

export const useUserStore = create(() => ({
    user: null,
    userCart: []
}))

export const getUserCart = (data) => useUserStore.setState({userCart: data})
export const getUser = (data) => useUserStore.setState({user: data})
export const signOutUser = () => useUserStore.setState({user: null})

