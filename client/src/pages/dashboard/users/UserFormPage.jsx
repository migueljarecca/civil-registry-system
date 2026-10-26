// src/pages/users/UserFormPage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchUserById,
  createUserThunk,
  updateUserThunk,
  clearUsersError,
  clearCurrentUser,
  clearFieldError,
} from '../../../store/slices/usersSlice';

const initialForm = {
  name: '',
  lastname: '',
  dni: '',
  email: '',
  password: '',
};

export const UserFormPage = () => {
  
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isEditMode = Boolean(id);

    const { currentUser, loading, error, fieldErrors } = useSelector((state) => state.users);

    const [localErrors, setLocalErrors] = useState({});
    const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchUserById(id));
    }
    return () => {
      dispatch(clearCurrentUser());
      dispatch(clearUsersError());
    };
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (isEditMode && currentUser) {
      setForm({
        name: currentUser.name,
        lastname: currentUser.lastname,
        dni: currentUser.dni,
        email: currentUser.email,
        password: '',
      });
    }
  }, [isEditMode, currentUser]);


  const onInputChange = ({ target }) => {

    const { name, value } = target;

    setForm({ ...form, [name]: value });

    setLocalErrors((prev) => ({ ...prev, [name]: '' }));
    dispatch(clearFieldError(name));
    if (error) dispatch(clearUsersError());
  };

    // validate local
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
    if (!isEditMode && !form.password) {
        newErrors.password = 'La contraseña es obligatoria';
    } else if (form.password && form.password.length < 8) {
        newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
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

    if (isEditMode) {
      const payload = {
        name: form.name,
        lastname: form.lastname,
        dni: form.dni,
        email: form.email,
      };

      const result = await dispatch(updateUserThunk({ id, userData: payload }));
      if (updateUserThunk.fulfilled.match(result)) {
        navigate(`/admin/users/${result.payload.id}`);
      }

    } else {
      const result = await dispatch(createUserThunk(form));
      if (createUserThunk.fulfilled.match(result)) {
        navigate(`/admin/users/${result.payload.id}`);
      }
    }
  };

  if (isEditMode && loading && !currentUser) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <h1>{isEditMode ? 'Editar usuario' : 'Crear usuario'}</h1>

      {error && <div className="error-banner">{error}</div>}

      <label>Nombre</label>
      <input name="name" value={form.name} onChange={onInputChange} />
      {getFieldError('name') && <span className="field-error">{getFieldError('name')}</span>}

      <label>Apellido</label>
      <input name="lastname" value={form.lastname} onChange={onInputChange} />
      {getFieldError('lastname') && <span className="field-error">{getFieldError('lastname')}</span>}

      <label>DNI</label>
      <input name="dni" value={form.dni} onChange={onInputChange} />
      {getFieldError('dni') && <span className="field-error">{getFieldError('dni')}</span>}

      <label>Email</label>
      <input type="email" name="email" value={form.email} onChange={onInputChange} />
      {getFieldError('email') && <span className="field-error">{getFieldError('email')}</span>}

      {!isEditMode && (
        <>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onInputChange}
          />
          {getFieldError('password') && (
            <span className="field-error">{getFieldError('password')}</span>
          )}
        </>
      )}


      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar'}
      </button>

      <button type="button" onClick={() => navigate('/admin/users')}>
        Cancelar
      </button>

    </form>
  );
};