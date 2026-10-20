import { useState } from "react";
import { useAuth } from "../../../config/useAuth";

const initialLoginForm = {
    email: '',
    password: '',
}

export const LoginForm = () => {

    const {handleLogin} = useAuth();
    const [loginForm, setLoginForm] = useState(initialLoginForm);

    const { email, password } = loginForm;

    const onInputChange = ({target}) => {
        const {name, value} = target;
        setLoginForm({
            ...loginForm,
            [name] : value
        });
    }

    const onSubmit = async(event) => {
        event.preventDefault();

        try {
            await handleLogin(email, password);
        } catch (error) {
            throw error;
        }
    }


    return (
        <form onSubmit={onSubmit}>
    
            <label>Correo electrónico</label>
            <input 
                type="email"
                name="email"
                value={email}
                onChange={onInputChange}
            />   

            <label>Contraseña</label>
            <input 
                type="password"
                name="password"
                value={password}
                onChange={onInputChange}
            />


            <button
                type="submit"
            >
                Iniciar
            </button>                 
        </form>
    )
}        