
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
    return <p>Cargando perfil...</p>;
  }

  return (
    <div>
      <h1>Editar perfil</h1>

      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={onSubmit} noValidate>
        <label>Nombre</label>
        <input name="name" value={form.name} onChange={onInputChange} />
        {getFieldError('name') && <span className="field-error">{getFieldError('name')}</span>}

        <label>Apellido</label>
        <input name="lastname" value={form.lastname} onChange={onInputChange} />
        {getFieldError('lastname') && <span className="field-error">{getFieldError('lastname')}</span>}

        <label>DNI</label>
        <input name="dni" value={form.dni} onChange={onInputChange} readOnly />
        {getFieldError('dni') && <span className="field-error">{getFieldError('dni')}</span>}

        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={onInputChange} />
        {getFieldError('email') && <span className="field-error">{getFieldError('email')}</span>}

        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>   
        <button type="button" onClick={() => navigate('/profile')}>
          Cancelar
        </button>
      </form>
    </div>
  );
};