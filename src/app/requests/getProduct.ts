import { IProduct } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
let cachedProducts: IProduct[] | null = null;

export async function getAllProducts() {
    try {
        if (cachedProducts) {
            return cachedProducts;
        }

        const response = await fetch(`${apiUrl}/products`, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true'
            },
            next: { revalidate: 10800 }
        });

        if (!response.ok) {
            throw new Error(`Error al obtener productos: ${response.statusText}`);
        }

        const products: IProduct[] = await response.json();
        cachedProducts = products;
        return products;

    } catch (error: any) {
        console.error("Error al obtener productos:", error);
        throw new Error(error.message || "Error desconocido al obtener productos");
    }
}

export async function getIdProduct(id: string) {
    try {
        const products = await getAllProducts();
        const product = products.find((product) => product.id.toString() === id);
        if (!product) throw new Error(`Producto con ID ${id} no encontrado`);
        return product;
    } catch (error: any) {
        console.error("Error al obtener producto por ID:", error);
        throw new Error(error.message || "Error desconocido al obtener producto por ID");
    }
}
