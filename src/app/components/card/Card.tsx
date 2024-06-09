import React from "react";
import { IProduct } from '@/types';

export const Card: React.FC<IProduct> = ({ name, description, price, stock, image, categoryId }) => {
    return (
        <div className="flex flex-col bg-slate-50 text-black rounded-xl p-4 border gap-2 m-4 w-full max-w-[300px] h-[480px] shadow-lg">
            <img src={image} alt={name} className="w-full h-[200px] object-container rounded-t-xl" />
            <div className="flex flex-col justify-between flex-1 p-4">
                <div>
                    <h2 className="text-lg font-semibold mb-2">{name}</h2>
                    <p className="text-gray-700 mb-2 text-sm line-clamp-3">{description}</p>
                </div>
                <div>
                    <p className="text-lg font-bold mb-2">${price}</p>
                    <p className="text-gray-500">Stock: {stock}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;
