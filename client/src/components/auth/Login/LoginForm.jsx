import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, clearError } from '../../../store/slices/authSlice';
import { Input } from '../../ui/Input/Input';
import { Button } from '../../ui/Button/Button';
import { Alert } from '../../ui/Alert/Alert';
import styles from './LoginForm.module.css';

const initialLoginForm = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password } = loginForm;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setLoginForm({ ...loginForm, [name]: value });
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    if (error) dispatch(clearError());
  };

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
    if (!validate()) return;
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      {error && (
        <Alert variant="error" title="No se pudo iniciar sesión">
          {error}
        </Alert>
      )}

      <Input
        label="Correo electrónico"
        type="email"
        name="email"
        value={email}
        onChange={onInputChange}
        disabled={loading}
        error={fieldErrors.email}
        autoComplete="email"
        placeholder="tu@correo.com"
      />

      <Input
        label="Contraseña"
        type="password"
        name="password"
        value={password}
        onChange={onInputChange}
        disabled={loading}
        error={fieldErrors.password}
        autoComplete="current-password"
        placeholder="••••••••"
      />

      <Button type="submit" loading={loading} fullWidth size="lg">
        {loading ? 'Iniciando...' : 'Iniciar sesión'}
      </Button>

      <div className={styles.footer}>
        <span className={styles.footerText}>¿No tienes cuenta?</span>
        <Link to="/register" className={styles.footerLink}>
          Registrate
        </Link>
      </div>
    </form>
  );
};