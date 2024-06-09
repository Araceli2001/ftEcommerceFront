'use client'

import { useEffect, useState } from 'react';
import validateLogin from '@/app/helpers/validateLogin';
import { login1 } from '@/app/requests/auth';
import { useRouter } from 'next/navigation';
import { triggerLoginEvent } from '@/app/helpers/autEvent';

const Login = () => {
    const router = useRouter();
    const [dataUser, setDataUser] = useState({ email: "", password: "" });
    const [errorUser, setError] = useState<{ email: string; password: string }>({ email: "", password: "" });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataUser({
            ...dataUser,
            [event.target.name]: event.target.value
        });
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (!errorUser.email && !errorUser.password) {
            try {
                const response = await login1(dataUser);
                console.log(response, 'aqui response');
                const { token, user } = response;

                localStorage.setItem('userLogin', JSON.stringify({ token: token, userData: user }));
                triggerLoginEvent();
                alert("Inicio de sesión EXITOSO");
                router.push("/"); // Redirigir a home
            } catch (error: any) {
                alert("Error en el inicio de sesión");
                console.error(error);
            }
        }
    };

    useEffect(() => {
        validateLogin(dataUser, setError);
    }, [dataUser]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <div className="flex flex-col mb-4">
                    <label htmlFor='email' className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id='email'
                        name='email'
                        value={dataUser.email}
                        placeholder='example@gmail.com'
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                    />
                    {formSubmitted && errorUser.email && <span style={{ color: 'red' }} className="text-red-500 text-xs mt-1">{errorUser.email}</span>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor='password' className="text-sm font-medium text-gray-700">Contraseña</label>
                    <input
                        type="password"
                        id='password'
                        name='password'
                        value={dataUser.password}
                        placeholder='****'
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                    />
                    {formSubmitted && errorUser.password && <span style={{ color: 'red' }} className="text-red-500 text-xs mt-1">{errorUser.password}</span>}
                </div>
                <div>
                    <button type='submit' className="w-full py-2 px-4 mt-4 bg-orange-400 text-white rounded-md shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2">Iniciar sesión</button>
                </div>
            </form>
        </div>
    )
}

export default Login;
