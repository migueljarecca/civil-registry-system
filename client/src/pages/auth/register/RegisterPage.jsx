import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, clearRegisterError } from '../../../store/slices/authSlice';

const initialForm = {
  name: '',
  lastname: '',
  dni: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const RegisterPage = () => {
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerLoading, registerError, registerFieldErrors } = useSelector((state) => state.auth);

  const [form, setForm] = useState(initialForm);
  const [localErrors, setLocalErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
    setLocalErrors((prev) => ({ ...prev, [name]: '' }));
    if (registerError) dispatch(clearRegisterError());
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!form.lastname.trim()) {
      newErrors.lastname = 'El apellido es obligatorio';
    } else if (form.lastname.trim().length < 2) {
      newErrors.lastname = 'El apellido debe tener al menos 2 caracteres';
    }

    if (!form.dni.trim()) {
      newErrors.dni = 'El DNI es obligatorio';
    } else if (!/^\d{8}$/.test(form.dni)) {
      newErrors.dni = 'El DNI debe tener exactamente 8 dígitos';
    }

    if (!form.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!form.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (form.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar la contraseña';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setLocalErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getFieldError = (fieldName) => {
    return (
      localErrors[fieldName] ||
      registerFieldErrors?.find((e) => e.field === fieldName)?.message ||
      null
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLocalErrors({});
    dispatch(clearRegisterError());

    const result = await dispatch(
      registerUser({
        name: form.name,
        lastname: form.lastname,
        dni: form.dni,
        email: form.email,
        password: form.password,
      })
    );

    if (registerUser.fulfilled.match(result)) {
      setSuccess(true);
      setForm(initialForm);
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
    }
  };

  if (success) {
    return (
      <div>
        <h1>Registro exitoso</h1>
        <p>Tu cuenta ha sido creada. Redirigiendo al login...</p>
        <Link to="/auth/login">Ir al login ahora</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Crear cuenta</h1>

      {registerError && <div className="error-banner">{registerError}</div>}

      <form onSubmit={onSubmit} noValidate>
        <label>Nombre</label>
        <input name="name" value={form.name} onChange={onInputChange} disabled={registerLoading} />
        {getFieldError('name') && <span className="field-error">{getFieldError('name')}</span>}

        <label>Apellido</label>
        <input name="lastname" value={form.lastname} onChange={onInputChange} disabled={registerLoading} />
        {getFieldError('lastname') && <span className="field-error">{getFieldError('lastname')}</span>}

        <label>DNI</label>
        <input name="dni" value={form.dni} onChange={onInputChange} disabled={registerLoading} />
        {getFieldError('dni') && <span className="field-error">{getFieldError('dni')}</span>}

        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={onInputChange} disabled={registerLoading} />
        {getFieldError('email') && <span className="field-error">{getFieldError('email')}</span>}

        <label>Contraseña</label>
        <input type="password" name="password" value={form.password} onChange={onInputChange} disabled={registerLoading} />
        {getFieldError('password') && <span className="field-error">{getFieldError('password')}</span>}

        <label>Confirmar contraseña</label>
        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={onInputChange} disabled={registerLoading} />
        {getFieldError('confirmPassword') && <span className="field-error">{getFieldError('confirmPassword')}</span>}

        <button type="submit" disabled={registerLoading}>
          {registerLoading ? 'Registrando...' : 'Crear cuenta'}
        </button>
      </form>

      <p>
        ¿Ya tienes cuenta? <Link to="/auth/login">Inicia sesión</Link>
      </p>
    </div>
  );
};