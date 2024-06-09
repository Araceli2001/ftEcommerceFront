"use client";
import React, { useEffect, useState } from 'react';
import { getIdProduct } from "@/app/requests/getProduct";
import { IProduct, userLogin } from "@/types";
import { useRouter } from "next/navigation";


const IdProduct = ({ params }: { params: { productid: string } }) => {
   const router = useRouter();
   const [product, setProduct] = useState<IProduct>();
   const [userData, setUserData] = useState<userLogin>();

   useEffect(() => {
       if (typeof window !== "undefined" && window.localStorage) {
           const userData = localStorage.getItem('userLogin');
           setUserData(userData ? JSON.parse(userData) : null);
       }

       const fetchProduct = async () => {
           try {
               const product = await getIdProduct(params.productid);
               setProduct(product);
           } catch (error) {
               console.error('Error fetching product:', error);
           }
       };

       fetchProduct();
   }, [params.productid]); // Agregar params.productid a la lista de dependencias

   const handleAddCart = (e: any) => {
       if (!userData?.token) {
           alert("Debes estar logueado");
       } else {
           const cart = JSON.parse(localStorage.getItem("cart") || "[]");
           const productExist = cart.some((product: IProduct) => product.id === Number(e?.target?.id));

           if (productExist) {
               alert("Este producto ya existe en tu carrito");
               router.push("/cart");
           } else {
               cart.push(product);
               localStorage.setItem("cart", JSON.stringify(cart));
               alert("Se agregó el producto a tu carrito");
               router.push("/cart");
           }
       }
   };

   return (
       <div className="flex items-center justify-center min-h-screen bg-gray-100">
           <div className="w-1/2 items-center justify-center flex flex-col bg-white p-6 rounded my-4">
               <h2 className="text-black">{product?.name}</h2>
               <img src={product?.image} alt="imagen de un producto" className="w-[300px] h-[300px] object-container rounded-t-xl" width={300} height={300} />
               <p className="text-black">{product?.description}</p>
               <p className="text-black">Precio: {product?.price}</p>
               <p className="text-black">Stock: {product?.stock}</p>
               <button onClick={handleAddCart} className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300">Agregar al carrito</button>
           </div>
       </div>
   );
}

export default IdProduct;
