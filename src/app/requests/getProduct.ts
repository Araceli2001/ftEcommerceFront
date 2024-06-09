import { IProduct } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export async function getAllProducts() {
    try {
        const response = await fetch(`${apiUrl}/products`, {
            method:'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true'
            },
            //cache: 'no-cache',
            next: {revalidate: 10800} //quiero que cada 3 horas vayas y actualizes lo que tienes en cache
        });
        const products: IProduct[] = await response.json()
        return products;
        
    } catch (error:any) {
        throw new Error(error)
    }
}

export async function  getIdProduct(id:string) {
    try {
        const products = await getAllProducts();
        const product = products.find((product) => product.id.toString() === id);
        if(!product) throw new Error(`product no encontrado`)
            return product;
    } catch (error:any) {
        throw new Error(error)
    }
};