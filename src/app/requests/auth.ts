import { UserDataLogin } from "../helpers/validateLogin";
import { UserDataRegister } from "../helpers/validateRegister";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//REGISTRO
export async function register(data: UserDataRegister) {
    try {
        const response = await fetch(`${apiUrl}/users/register`, {
            method: 'POST',
            headers: { "Content-Type": "application/json",
            'ngrok-skip-browser-warning': 'true'
             },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            return response.json();
        } else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || "Error en el registro");
        }
    } catch (error: any) {
        throw new Error(error);
    }
}

//LOGIN 
export async function login1(data: UserDataLogin) {
    try {
        const response = await fetch(`${apiUrl}/users/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json",
            'ngrok-skip-browser-warning': 'true'
             },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            return response.json();
        } else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || "Error al iniciar sesion");
        }
    } catch (error: any) {
        throw new Error(error);
    }
}