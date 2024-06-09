'use client';

import { IProduct, userLogin } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createOrder } from "../requests/orders";

const ShoppingCart = () => {
    const [cart, setCart] = useState<IProduct[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [userData, setUserData] = useState<userLogin | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const userData: userLogin = JSON.parse(localStorage.getItem("userLogin")!);
            setUserData(userData);
            if (!userData?.token) {
                router.push("/login");
            }
        }

        const storedCart: IProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
        if (storedCart) {
            let totalPay = 0;
            storedCart.forEach((item: IProduct) => {
                totalPay += item.price;
            });
            setTotal(totalPay);
            setCart(storedCart);
        }
    }, [router]);

    console.log("EL CARRITO:", cart, "USERDATA", userData, "TOTAL", total);

    const handlerPay = async () => {
        const idProducts = new Set(cart.map((product) => product.id));
        await createOrder(Array.from(idProducts), userData?.token!);
        alert("Compra exitosa");
        setCart([]);
        setTotal(0);
        localStorage.setItem("cart", "[]");
    };

    const handleRemoveItem = (id: number) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        const updatedTotal = updatedCart.reduce((acc, item) => acc + item.price, 0);
        setTotal(updatedTotal);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 flex flex-col items-center">
            <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-amber-600">Mi carrito</h2>
                {
                    cart.length > 0 ? (
                        cart.map(item => (
                            <div key={item.id} className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 py-4 w-full">
                                <div className="flex flex-col sm:flex-row items-center w-full">
                                    <img src={item.image} alt={item.name} className="w-[200px] h-[200px] object-cover rounded-t-lg mr-4"/>
                                    <div className="flex flex-col sm:ml-4 mt-4 sm:mt-0">
                                        <p className="text-lg font-medium text-gray-600">{item.name}</p>
                                        <p className="text-sm text-gray-600">Precio: ${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleRemoveItem(item.id)} 
                                    className="mt-4 sm:mt-0 sm:ml-4 bg-red-500 text-white py-1 px-3 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-600">
                            <p>No tienes ningún producto en tu carrito</p>
                        </div>
                    )
                }
                <div className="flex justify-between items-center mt-6 w-full">
                    <p className="text-xl font-semibold text-gray-600">TOTAL: ${total.toFixed(2)}</p>
                    <button 
                        onClick={handlerPay} 
                        disabled={cart.length === 0}
                        className={`py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${cart.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-400 text-white hover:bg-orange-500 text-xl font-semibold'}`}
                    >
                        Pagar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart;
