import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePasswordThunk, clearUsersError, clearFieldError } from '../../../store/slices/usersSlice';
import { Input } from '../../../components/ui/Input/Input';
import { Button } from '../../../components/ui/Button/Button';
import { Alert } from '../../../components/ui/Alert/Alert';
import styles from './ChangePasswordPage.module.css';

const initialForm = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { loading, error, fieldErrors } = useSelector((state) => state.users);

  const [form, setForm] = useState(initialForm);
  const [localErrors, setLocalErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
    setLocalErrors((prev) => ({ ...prev, [name]: '' }));

    // Clear backend field errors if the user starts typing
    if (fieldErrors) {
      dispatch(clearFieldError(name));
    }
    // Clear general backend error
    if (error) {
      dispatch(clearUsersError());
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.currentPassword) {
      newErrors.currentPassword = 'La contraseña actual es obligatoria';
    }

    if (!form.newPassword) {
      newErrors.newPassword = 'La nueva contraseña es obligatoria';
    } else if (form.newPassword.length < 8) {
      newErrors.newPassword = 'La nueva contraseña debe tener al menos 8 caracteres';
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar la nueva contraseña';
    } else if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setLocalErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getFieldError = (fieldName) => {
    return (
      localErrors[fieldName] ||
      fieldErrors?.find((e) => e.field === fieldName)?.message ||
      null
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLocalErrors({});
    dispatch(clearUsersError());

    const result = await dispatch(
      changePasswordThunk({
        id: user.userId,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      })
    );

    if (changePasswordThunk.fulfilled.match(result)) {
      setSuccess(true);
      setForm(initialForm);
    }
  };

  // Success state view
  if (success) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successIcon}>✓</div>
        <h1 className={styles.successTitle}>Contraseña actualizada</h1>
        <p className={styles.successSubtitle}>
          Tu contraseña se cambio correctamente.
        </p>

        {/* Botón para volver manualmente */}
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/profile')}
          style={{ marginTop: 'var(--space-md)' }}
        >
          Volver a mi perfil
        </Button>

      </div>
    );
  }

  // Main form view
  return (
    <div className={styles.page}>

      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>Cambiar contraseña</h1>
        <p className={styles.subtitle}>
          Por seguridad, ingresa tu contraseña actual antes de crear una nueva.
        </p>
      </div>

      {error && (
        <Alert variant="error" title="Error al cambiar la contraseña">
          {error}
        </Alert>
      )}

      <form className={styles.form} onSubmit={onSubmit} noValidate>

        <div className={styles.fullWidth}>
          <Input
            label="Contraseña actual"
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={onInputChange}
            disabled={loading}
            error={getFieldError('currentPassword')}
            autoComplete="current-password"
            placeholder="••••••••"
          />
        </div>

        <div className={styles.row}>
          <Input
            label="Nueva contraseña"
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={onInputChange}
            disabled={loading}
            error={getFieldError('newPassword')}
            hint="Mínimo 8 caracteres."
            autoComplete="new-password"
            placeholder="••••••••"
          />
          <Input
            label="Confirmar nueva contraseña"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={onInputChange}
            disabled={loading}
            error={getFieldError('confirmPassword')}
            autoComplete="new-password"
            placeholder="••••••••"
          />
        </div>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={() => navigate('/profile')}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
          >
            {loading ? 'Actualizando...' : 'Cambiar contraseña'}
          </Button>
        </div>

      </form>
    </div>
  );
};