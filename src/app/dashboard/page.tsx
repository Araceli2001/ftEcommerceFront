'use client';
import { userLogin } from "@/types";
import React, { useEffect, useState } from "react";
import OrdersUser from "./orders/page";

const Dashboard = () => {
    const [userData, setUserData] = useState<userLogin | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const userData = localStorage.getItem('userLogin');
            if (userData) {
                setUserData(JSON.parse(userData));
            }
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 justify-center">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md ">
                <h1 className="text-2xl font-bold mb-6 text-amber-600">Mis datos</h1>
                <div className="mb-6">
                    <h2 className="text-lg font-medium mb-2 text-gray-700">Dirección: {userData?.userData?.address}</h2>
                    <h2 className="text-lg font-medium mb-2 text-gray-700">Teléfono: {userData?.userData?.phone}</h2>
                    <h2 className="text-lg font-medium mb-2 text-gray-700">Email: {userData?.userData?.email}</h2>
                </div>
                <OrdersUser />
            </div>
        </div>
    );
};

export default Dashboard;
