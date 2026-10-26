import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  changePasswordThunk,
  clearUsersError,
} from '../../../store/slices/usersSlice';

const initialForm = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const ChangePasswordPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, fieldErrors } = useSelector((state) => state.users);

  const [form, setForm] = useState(initialForm);
  const [localErrors, setLocalErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
    setLocalErrors((prev) => ({ ...prev, [name]: '' }));
    if (error) dispatch(clearUsersError());
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
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      })
    );

    if (changePasswordThunk.fulfilled.match(result)) {
      setSuccess(true);
      setForm(initialForm);
    }
  };

  return (
    <div>
      <h1>Cambiar contraseña</h1>

      {success && (
        <div className="success-banner">
          Contraseña cambiada correctamente.
        </div>
      )}

      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={onSubmit} noValidate>
        <label>Contraseña actual</label>
        <input
          type="password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={onInputChange}
          disabled={loading}
        />
        {getFieldError('currentPassword') && (
          <span className="field-error">{getFieldError('currentPassword')}</span>
        )}

        <label>Nueva contraseña</label>
        <input
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={onInputChange}
          disabled={loading}
        />
        {getFieldError('newPassword') && (
          <span className="field-error">{getFieldError('newPassword')}</span>
        )}

        <label>Confirmar nueva contraseña</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={onInputChange}
          disabled={loading}
        />
        {getFieldError('confirmPassword') && (
          <span className="field-error">{getFieldError('confirmPassword')}</span>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Cambiando...' : 'Cambiar contraseña'}
        </button>
        <button type="button" onClick={() => navigate('/profile')}>
          Cancelar
        </button>
      </form>
    </div>
  );
};