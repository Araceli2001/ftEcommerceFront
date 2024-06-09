'use client';

import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validateRegister, UserDataRegister } from '@/app/helpers/validateRegister';
import { register } from '@/app/requests/auth';
import { useRouter } from 'next/navigation';

const Register = () => {
  const router = useRouter();

  const submit = async (values: UserDataRegister, actions: { resetForm: () => void; }) => {
    try {
      await register(values);
      alert('Registro exitoso');
      actions.resetForm();
      router.push("/login");
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  function FormikRegister() {
    return (
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          address: '',
          password: ''
        }}
        validate={validateRegister}
        onSubmit={submit}
      >
        <Form className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre:</label>
            <Field type="text" id="name" name="name" placeholder="Nombre" className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black" />
            <ErrorMessage name="name">{msg => <span className="text-red-500 text-xs mt-1">{msg}</span>}</ErrorMessage>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email:</label>
            <Field type="email" id="email" name="email" placeholder="Email" className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black" />
            <ErrorMessage name="email">{msg => <span className="text-red-500 text-xs mt-1">{msg}</span>}</ErrorMessage>
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Teléfono:</label>
            <Field type="number" id="phone" name="phone" placeholder="5555588888" className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black" />
            <ErrorMessage name="phone">{msg => <span className="text-red-500 text-xs mt-1">{msg}</span>}</ErrorMessage>
          </div>

          <div className="flex flex-col">
            <label htmlFor="address" className="text-sm font-medium text-gray-700">Dirección:</label>
            <Field type="text" id="address" name="address" placeholder="Calle Lucia" className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black" />
            <ErrorMessage name="address">{msg => <span className="text-red-500 text-xs mt-1">{msg}</span>}</ErrorMessage>
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Contraseña:</label>
            <Field type="password" id="password" name="password" placeholder="*****" className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black" />
            <ErrorMessage name="password">{msg => <span className="text-red-500 text-xs mt-1">{msg}</span>}</ErrorMessage>
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-orange-400 text-white rounded-md shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Registrarse</button>
        </Form>
      </Formik>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Registro</h1>
        <FormikRegister />
      </div>
    </div>
  );
};

export default Register;
