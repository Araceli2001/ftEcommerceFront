import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Cambiar "next/navigation" a "next/router"
import { userLogin } from "@/types";
import { triggerLogoutEvent } from "@/app/helpers/autEvent";

const Logout = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<userLogin | null>(null); // Asegúrate de que sea null inicialmente

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("userLogin");
    if (userDataFromStorage) {
      setUserData(JSON.parse(userDataFromStorage));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    triggerLogoutEvent();
    alert("Sesión cerrada");
    router.push("/");
  };

  const handleGoToCart = () => {
    router.push("/dashboard"); // Ajusta esta ruta según tu configuración
  };

  const isAuthenticated = userData !== null;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        {isAuthenticated && (
          <div className="mb-4">
            <img
              src="/profile.png" // Reemplaza con la ruta a la imagen del perfil
              alt="Profile"
              className="w-33 h-30 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-700 text-xl font-semibold">
              Bienvenid@ {userData?.userData.name}
            </p>
          </div>
        )}
        <button
          onClick={handleGoToCart}
          className="mt-4 w-full py-2 px-4 bg-orange-400 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Mis compras
        </button>
        <button
          onClick={handleLogout}
          className="mt-4 w-full py-2 px-4 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Logout;
