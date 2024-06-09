export interface UserDataRegister {
    email: string;
    password: string;
    address: string;
    phone: string;
    name: string;
 }
 
 export interface UserDataError {
    email?: string;
    password?: string;
    address?: string;
    phone?: string;
    name?: string;
 }
 
 export function validateRegister(values: UserDataRegister) {
    let isValid: UserDataError = {};
 
    // Email validation
    if (!values.email) {
        isValid.email = "Es necesario ingresar un email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        isValid.email = "El email ingresado no es válido";
    }
 
    // Password validation
    if (!values.password) {
        isValid.password = "Es necesario ingresar una contraseña";
    } else if (!/^[a-zA-Z0-9]{6,10}$/.test(values.password)) {
        isValid.password = "La contraseña debe ser de 6 y 10 caracteres";
    }
 
    // Name validation
    if (!values.name) {
        isValid.name = "Es necesario ingresar tu nombre";
    } else if (!/^[a-zA-Z\s]{2,20}$/.test(values.name)) {
        isValid.name = "El nombre debe contener solo letras";
    }
 
    // Address validation
    if (!values.address) {
        isValid.address = "Es necesario ingresar una dirección";
    } else if (!/^[a-zA-Z0-9\s]{5,30}$/.test(values.address)) {
        isValid.address = "La dirección debe contener solo letras y números";
    }
 
    // Phone validation
    if (!values.phone) {
        isValid.phone = "Es necesario ingresar un número de teléfono";
    } else if (!/^\d{10}$/.test(values.phone)) {
        isValid.phone = "Deben ser 10 dígitos";
    }
 
    return isValid;
 }
 