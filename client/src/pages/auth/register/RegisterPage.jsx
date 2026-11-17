import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, clearRegisterError } from '../../../store/slices/authSlice';
import { Input } from '../../../components/ui/Input/Input';
import { Button } from '../../../components/ui/Button/Button';
import { Alert } from '../../../components/ui/Alert/Alert';
import styles from './RegisterPage.module.css';

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

  const { registerLoading, registerError, registerFieldErrors } = useSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState(initialForm);
  const [localErrors, setLocalErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Handle input changes and clear specific field errors
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
    setLocalErrors((prev) => ({ ...prev, [name]: '' }));

    if (registerError) {
      dispatch(clearRegisterError());
    }
  };

  // Local validation before sending to backend
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
      newErrors.email = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'El correo no es válido';
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

  // Merge local validation errors with backend errors
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
    }
  };

  // Success view
  if (success) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successIcon}>✓</div>
        <h1 className={styles.successTitle}>Registro exitoso</h1>
        <p className={styles.successSubtitle}>
          Tu cuenta ha sido creada correctamente.
          <br />
          Ya puedes iniciar sesión en el sistema.
        </p>

        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/auth/login')}
          style={{ marginTop: 'var(--space-md)' }}
        >
          Ir al inicio de sesión
        </Button>

      </div>
    );
  }

  // Main form view
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Crear cuenta</h1>
        <p className={styles.subtitle}>
          Completa tus datos para registrarte en el sistema.
        </p>
      </div>

      {registerError && (
        <Alert variant="error" title="Error al registrarse">
          {registerError}
        </Alert>
      )}

      <form className={styles.form} onSubmit={onSubmit} noValidate>

        <div className={styles.row}>
          <Input
            label="Nombre"
            name="name"
            value={form.name}
            onChange={onInputChange}
            disabled={registerLoading}
            error={getFieldError('name')}
            autoComplete="given-name"
            placeholder="Ej. Juan"
          />
          <Input
            label="Apellido"
            name="lastname"
            value={form.lastname}
            onChange={onInputChange}
            disabled={registerLoading}
            error={getFieldError('lastname')}
            autoComplete="family-name"
            placeholder="Ej. Pérez"
          />
        </div>

        <div className={styles.row}>
          <Input
            label="DNI"
            name="dni"
            value={form.dni}
            onChange={onInputChange}
            disabled={registerLoading}
            error={getFieldError('dni')}
            hint="Ingresa tu DNI sin puntos ni guiones."
            maxLength={8}
            placeholder="Ej. 12345678"
          />
          <Input
            label="Correo electrónico"
            type="email"
            name="email"
            value={form.email}
            onChange={onInputChange}
            disabled={registerLoading}
            error={getFieldError('email')}
            autoComplete="email"
            placeholder="tu@correo.com"
          />
        </div>

        <div className={styles.row}>
          <Input
            label="Contraseña"
            type="password"
            name="password"
            value={form.password}
            onChange={onInputChange}
            disabled={registerLoading}
            error={getFieldError('password')}
            hint="Mínimo 8 caracteres."
            autoComplete="new-password"
            placeholder="••••••••"
          />
          <Input
            label="Confirmar contraseña"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={onInputChange}
            disabled={registerLoading}
            error={getFieldError('confirmPassword')}
            autoComplete="new-password"
            placeholder="••••••••"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={registerLoading}
          className={styles.submitBtn}
        >
          {registerLoading ? 'Registrando...' : 'Crear cuenta'}
        </Button>
      </form>

      <div className={styles.footer}>
        <span className={styles.footerText}>¿Ya tienes cuenta?</span>
        <Link to="/auth/login" className={styles.footerLink}>
          Inicia sesión
        </Link>
      </div>
    </div>
  );
};