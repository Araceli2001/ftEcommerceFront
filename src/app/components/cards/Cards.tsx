"use client";
import React, { useState } from "react";
import Card from "../card/Card";
import { IProduct } from "@/types";
import Link from "next/link";
import Carousel from "../carousel/carousel";

interface CardsProps {
    products: IProduct[];
}

const Cards: React.FC<CardsProps> = ({ products }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log("Renderizando Cards componente");

    return (
        <>
        <div>
            <Carousel />
        </div>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearch}
                className="mb-8 p-4 w-full max-w-lg border text-gray-600 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            {filteredProducts.length === 0 ? (
                <div className="text-red-500 font-bold text-lg mt-4">
                    No se encontró este producto
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                        <Link key={product.id} href={`product/${product.id}`}>
                            <Card {...product} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
        </>
    );
}

export default Cards;


// "use client";
// import React, { useState } from "react";
// import Card from "../card/Card";
// import { IProduct } from "@/types";
// import Link from "next/link";
// import Carousel from "../carousel/carousel";

// interface CardsProps {
//     products: IProduct[];
// }

// const Cards: React.FC<CardsProps> = ({ products }) => {
//     const [searchTerm, setSearchTerm] = useState("");

//     const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(event.target.value);
//     };

//     const filteredProducts = products.filter((product) =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.description.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//             <div>
//                 <Carousel />
//             </div>
//             <input
//                 type="text"
//                 placeholder="Buscar..."
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 className="mb-8 p-4 w-full max-w-lg border text-gray-600 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
//             />
//             {filteredProducts.length === 0 ? (
//                 <div className="text-red-500 font-bold text-lg mt-4">
//                     No se encontró este producto
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                     {filteredProducts.map((product) => (
//                         <Link key={product.id} href={`product/${product.id}`}>
//                             <Card {...product} />
//                         </Link>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Cards;
