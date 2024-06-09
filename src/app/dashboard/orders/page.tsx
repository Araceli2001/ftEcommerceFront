"use client";
import { getOrderUser } from "@/app/requests/orders";
import React, { useEffect, useState } from "react";
import { IOrder, userLogin, IProduct } from "@/types";

const OrdersUser = () => {
    const [userData, setUserData] = useState<userLogin | null>(null);
    const [orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const userData = localStorage.getItem('userLogin');
            if (userData) {
                setUserData(JSON.parse(userData));
            }
        }
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            if (userData?.token) {
                try {
                    const ordersResponse = await getOrderUser(userData.token);
                    setOrders(ordersResponse);
                } catch (error) {
                    console.error('Error en fetching orders:', error);
                }
            }
        };

        fetchOrders();
    }, [userData?.token]);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 py-6 px-4">
            <h2 className="text-2xl font-bold mb-6 text-amber-600">Mis órdenes</h2>
            {
                orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order.id} className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mb-6">
                            <p className="text-lg font-medium mb-2 text-blue-400">{new Date(order.date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600 mb-4">Estado: {order.status}</p>
                            <p className="font-semibold mb-2 text-blue-400">Productos comprados:</p>
                            <ul className="list-disc list-inside">
                                {order.products.map((product: IProduct) => (
                                    <li key={product.id} className="text-gray-700">{product.name}</li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                        <p className="text-center text-gray-600">No tienes ninguna orden aún</p>
                    </div>
                )
            }
        </div>

        
    );
};

export default OrdersUser;
