import "./LoginForm.css"

import { useDispatch, useSelector } from 'react-redux';

import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { loginUser, clearError } from '../../../store/slices/authSlice';


const initialLoginForm = {
    email: '',
    password: '',
}

export const LoginForm = () => {

    const { loading, error } = useSelector((state) => state.auth);

    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const [fieldErrors, setFieldErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { email, password } = loginForm;

    const onInputChange = ({target}) => {
        const {name, value} = target;

        setLoginForm({
            ...loginForm,
            [name] : value
        });

        setFieldErrors(prev => ({
            ...prev,
            [name]: ''
        }));

        if (error) dispatch(clearError());
    }

    // Local validation before calling the backend

    const validate = () => {
        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = 'El correo es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'El correo no es válido';
        }
        if (!password) {
            newErrors.password = 'La contraseña es obligatoria';
        }
        setFieldErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };    


    const onSubmit = async (event) => {
        event.preventDefault();

        // 1. Local validation
        if (!validate()) return;

        const result = await dispatch(loginUser({ email, password }));

        if (loginUser.fulfilled.match(result)) {
        navigate('/');
        }
    };

    return (
        <form onSubmit={onSubmit}>

            {error && (
                <div className="error-banner">{error}</div>
            )}

    
            <label>Correo electrónico</label>
            <input 
                type="email"
                name="email"
                value={email}
                onChange={onInputChange}
                disabled={loading}
            />   
            {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}

            <label>Contraseña</label>
            <input 
                type="password"
                name="password"
                value={password}
                onChange={onInputChange}
                disabled={loading}
            />
            {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}


            <button type="submit" disabled={loading}>
                {loading ? 'Iniciando...' : 'Iniciar'}
            </button>

        </form>
    )
}        