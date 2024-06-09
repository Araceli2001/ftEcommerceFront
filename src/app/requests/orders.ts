// orders.ts
import { IOrder } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function createOrder(products: number[], token: string) {
    try {
        const response = await fetch(`${apiUrl}/orders`, {
            method: 'POST',
            headers: {
                "content-type" : "application/json",
                Authorization: token,
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify({products})
        });

        const orders = await response.json(); 
        return orders;
    } catch (error: any) {
        throw new Error(error);
    }
}


export async function getOrderUser(token: string): Promise<IOrder[]> {
    try {
        const response = await fetch(`${apiUrl}/users/orders`, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                Authorization: token,
                'ngrok-skip-browser-warning': 'true'
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching orders');
        }

        const orders: IOrder[] = await response.json();
        return orders;
    } catch (error: any) {
        throw new Error(error);
    }
}
