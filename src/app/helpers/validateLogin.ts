export interface UserDataLogin {
    email: string;
    password: string;
}

export interface UserDataLoginError {
    email?: string;
    password?: string;
}

// export function validateLogin  (values: UserDataLogin){
//     let isValid: UserDataLoginError = { email: "", password: "" };
   
//     if (!values.email) {
//         isValid.email = "necesario email";
//     }

//     if (!values.password) {
//         isValid.password = "necesita contraseña";
//     }


//     return isValid;
// }

// export default validateLogin
type SetErrorsFunction = React.Dispatch<React.SetStateAction<{ email: string; password: string }>>;

const validateLogin = (dataUser: UserDataLogin, setErrors: SetErrorsFunction): boolean => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!dataUser.email) {
        newErrors.email = "Es necesario ingresar un email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(dataUser.email)) {
        newErrors.email = "El email ingresado no es válido";
    }

    if (!dataUser.password) {
        newErrors.password = 'Password is required';
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
}

export default validateLogin;
