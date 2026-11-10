import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchUserById,
  updateUserThunk,
  clearUsersError,
  clearFieldError,
  clearCurrentUser,
} from '../../../store/slices/usersSlice';
import { Input } from '../../../components/ui/Input/Input';
import { Button } from '../../../components/ui/Button/Button';
import { Alert } from '../../../components/ui/Alert/Alert';
import { Spinner } from '../../../components/ui/Spinner/Spinner';
import styles from './ProfileEditPage.module.css';

const initialForm = {
  name: '',
  lastname: '',
  dni: '',
  email: '',
};

export const ProfileEditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { currentUser, loading, error, fieldErrors } = useSelector((state) => state.users);

  const userId = user?.userId;

  const [form, setForm] = useState(initialForm);
  const [localErrors, setLocalErrors] = useState({});

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
    return () => {
      dispatch(clearCurrentUser());
      dispatch(clearUsersError());
    };
  }, [dispatch, userId]);

  useEffect(() => {
    if (currentUser) {
      setForm({
        name: currentUser.name,
        lastname: currentUser.lastname,
        dni: currentUser.dni,
        email: currentUser.email,
      });
    }
  }, [currentUser]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
    setLocalErrors((prev) => ({ ...prev, [name]: '' }));
    dispatch(clearFieldError(name));
    if (error) dispatch(clearUsersError());
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

    // DNI is disabled, no need to validate if it's empty (comes from backend)
    // But we keep the validation in case the backend returns an empty string
    if (!form.dni.trim()) {
      newErrors.dni = 'El DNI es obligatorio';
    }

    if (!form.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'El email no es válido';
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

    const result = await dispatch(updateUserThunk({ id: userId, userData: form }));

    if (updateUserThunk.fulfilled.match(result)) {
      navigate('/profile');
    }
  };

  if (loading && !currentUser) {
    return <Spinner centered label="Cargando datos..." />;
  }

  return (
    <div className={styles.page}>

      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>Editar perfil</h1>
        <p className={styles.subtitle}>
          Actualiza tu información personal.
        </p>
      </div>

      {error && (
        <Alert variant="error" title="Error al guardar">
          {error}
        </Alert>
      )}

      <form className={styles.form} onSubmit={onSubmit} noValidate>

        <div className={styles.row}>
          <Input
            label="Nombre"
            name="name"
            value={form.name}
            onChange={onInputChange}
            disabled={loading}
            error={getFieldError('name')}
            autoComplete="given-name"
          />
          <Input
            label="Apellido"
            name="lastname"
            value={form.lastname}
            onChange={onInputChange}
            disabled={loading}
            error={getFieldError('lastname')}
            autoComplete="family-name"
          />
        </div>

        <div className={styles.row}>
          <Input
            label="DNI"
            name="dni"
            value={form.dni}
            disabled
            hint="El DNI no puede ser modificado desde aquí."
          />
          <Input
            label="Correo electrónico"
            type="email"
            name="email"
            value={form.email}
            onChange={onInputChange}
            disabled={loading}
            error={getFieldError('email')}
            autoComplete="email"
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
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        </div>

      </form>
    </div>
  );
};