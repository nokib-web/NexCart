"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { API_URL } from "@/config";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useUser();
    const [cartCount, setCartCount] = useState(0);

    const fetchCartCount = async () => {
        if (!user?.id) {
            setCartCount(0);
            return;
        }

        try {
            const res = await fetch(`${API_URL}/cart/${user.id}`);
            if (res.ok) {
                const data = await res.json();
                const count = data.reduce((acc, item) => acc + item.quantity, 0);
                setCartCount(count);
            }
        } catch (error) {
            console.error("Failed to fetch cart count:", error);
        }
    };

    useEffect(() => {
        fetchCartCount();
    }, [user]);

    return (
        <CartContext.Provider value={{ cartCount, fetchCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
