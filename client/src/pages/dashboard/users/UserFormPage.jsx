import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  fetchUserById,
  createUserThunk,
  updateUserThunk,
  clearCurrentUser,
  clearUsersError,
  clearFieldError
} from '../../../store/slices/usersSlice';
import { Input } from '../../../components/ui/Input/Input';
import { Button } from '../../../components/ui/Button/Button';
import { Alert } from '../../../components/ui/Alert/Alert';
import { Spinner } from '../../../components/ui/Spinner/Spinner';

import { Modal } from '../../../components/ui/Modal/Modal';
import { Clipboard, Check, ArrowPath } from '../../../assets/icons/Common/Common'

import styles from './UserFormPage.module.css';

// Generate a random password of 10 characters (letters, numbers and symbols)
const generatePassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 10; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const initialForm = {
  name: '',
  lastname: '',
  dni: '',
  email: '',
  password: generatePassword(),
  roles: ['ROLE_USER'],
  enabled: true,
};

export const UserFormPage = () => {

  const { id } = useParams();
  const isEditMode = Boolean(id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, loading, error, fieldErrors } = useSelector((state) => state.users);

  const [form, setForm] = useState(initialForm);
  const [localErrors, setLocalErrors] = useState({});

  // States for modals
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [newUserCredentials, setNewUserCredentials] = useState({ email: '', password: '' });
  const [copied, setCopied] = useState(false);

  // 1. Fetch user data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchUserById(id));
    }
    return () => {
      dispatch(clearCurrentUser());
      dispatch(clearUsersError());
    };
  }, [id, isEditMode, dispatch]);

  // 2. Populate form when data arrives
  useEffect(() => {
    if (isEditMode && currentUser) {
      setForm({
        name: currentUser.name || '',
        lastname: currentUser.lastname || '',
        dni: currentUser.dni || '',
        email: currentUser.email || '',
        password: '',
        roles: currentUser.roles || ['ROLE_USER'],
        enabled: currentUser.enabled ?? true,
      });
    }
  }, [currentUser, isEditMode]);

  // Function to regenerate the password
  const handleRegeneratePassword = () => {
    setForm({ ...form, password: generatePassword() });
  };

  // Function to copy to the clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(newUserCredentials.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onInputChange = ({ target }) => {
    const { name, value, type, checked } = target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
    setLocalErrors((prev) => ({ ...prev, [name]: '' }));

    // We clear the specific backend error.
    if (fieldErrors) {
      dispatch(clearFieldError(name));
    }
    // We clear the general error
    if (error) {
      dispatch(clearUsersError());
    }
  };

  const onRoleChange = (role) => {
    setForm((prev) => {
      const hasRole = prev.roles.includes(role);
      return {
        ...prev,
        roles: hasRole
          ? prev.roles.filter((r) => r !== role)
          : [...prev.roles, role]
      };
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!form.lastname.trim()) newErrors.lastname = 'El apellido es obligatorio';
    if (!form.dni.trim()) newErrors.dni = 'El DNI es obligatorio';

    if (!form.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'El correo no es válido';
    }

    // Only validate password if creating a new user
    if (!isEditMode) {
      if (!form.password) {
        newErrors.password = 'La contraseña es obligatoria';
      } else if (form.password.length < 8) {
        newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
      }
    }

    setLocalErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Merge local validation errors with backend error
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

    dispatch(clearUsersError());

    if (isEditMode) {
      const result = await dispatch(updateUserThunk({ id, userData: form }));
      if (updateUserThunk.fulfilled.match(result)) {
        navigate('/admin/users');
      }
    } else {
      const result = await dispatch(createUserThunk(form));
      if (createUserThunk.fulfilled.match(result)) {
        // Instead of navigating, we save the credentials and display the modal.
        setNewUserCredentials({ email: form.email, password: form.password });
        setIsSuccessOpen(true);
      }
    }
  };

  // Function to close the modal and return to the list
  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
    navigate('/admin/users');
  };

  if (isEditMode && loading && !currentUser) {
    return <Spinner centered label="Cargando datos del usuario..." />;
  }

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <Link to="/admin/users" className={styles.backLink}>
          ← Volver al listado
        </Link>
        <h2 className={styles.title}>
          {isEditMode ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
        </h2>
        <p className={styles.subtitle}>
          {isEditMode
            ? `Modificando los datos de ${form.name} ${form.lastname}.`
            : 'Completa los datos para registrar una nueva cuenta en el sistema.'}
        </p>
      </div>

      {error && (
        <Alert variant="error" title="Error al guardar">
          {error}
        </Alert>
      )}

      <form className={styles.formCard} onSubmit={onSubmit} noValidate>

        {/* Personal Information */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Datos Personales</h3>

          <div className={styles.row}>
            <Input
              label="Nombre"
              name="name"
              value={form.name}
              onChange={onInputChange}
              disabled={loading}
              error={getFieldError('name')}
              placeholder="Ej. Juan"
              required
            />
            <Input
              label="Apellido"
              name="lastname"
              value={form.lastname}
              onChange={onInputChange}
              disabled={loading}
              error={getFieldError('lastname')}
              placeholder="Ej. Pérez"
              required
            />
          </div>

          <div className={styles.row}>
            <Input
              label="DNI"
              name="dni"
              value={form.dni}
              onChange={onInputChange}
              disabled={loading}
              error={getFieldError('dni')}
              maxLength={8}
              placeholder="Ej. 12345678"
              required
            />
            <Input
              label="Correo electrónico"
              type="email"
              name="email"
              value={form.email}
              onChange={onInputChange}
              disabled={loading}
              error={getFieldError('email')}
              placeholder="tu@correo.com"
              required
            />
          </div>

          {!isEditMode && (
            <div className={styles.row}>
              <Input
                label="Contraseña generada"
                type="text"
                name="password"
                value={form.password}
                onChange={onInputChange}
                disabled={loading}
                error={getFieldError('password')}
                hint="El administrador debe copiar esta contraseña y compartirla con el usuario."
                placeholder="••••••••"
                required
              />

              <button
                type="button"
                className={styles.regenerateBtn}
                onClick={handleRegeneratePassword}
                title="Generar nueva contraseña"
              >
                <ArrowPath />
              </button>
            </div>
          )}
        </div>

        {/* Account Settings */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Configuración de la Cuenta</h3>

          <div className={styles.row}>
            <div className={styles.checkboxGroup}>
              <span className={styles.checkboxLabel}>Roles asignados</span>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={form.roles.includes('ROLE_USER')}
                  onChange={() => onRoleChange('ROLE_USER')}
                  disabled={loading}
                />
                Ciudadano (User)
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={form.roles.includes('ROLE_ADMIN')}
                  onChange={() => onRoleChange('ROLE_ADMIN')}
                  disabled={loading}
                />
                Administrador (Admin)
              </label>
            </div>

            <div className={styles.checkboxGroup}>
              <span className={styles.checkboxLabel}>Estado de la cuenta</span>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  name="enabled"
                  checked={form.enabled}
                  onChange={onInputChange}
                  disabled={loading}
                />
                Cuenta activa (puede iniciar sesión)
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={() => navigate('/admin/users')}
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
            {isEditMode ? 'Guardar cambios' : 'Crear usuario'}
          </Button>
        </div>

      </form>

      {/* ============ EXIT MODAL ============ */}
      <Modal
        isOpen={isSuccessOpen}
        onClose={handleCloseSuccess}
        title="Usuario creado exitosamente"
        footer={
          <Button variant="primary" onClick={handleCloseSuccess}>Volver al listado</Button>
        }
      >
        <Alert variant="success" title="¡Cuenta creada!">
          El usuario se registró correctamente en el sistema.
        </Alert>

        <div className={styles.credentialsBox}>
          <div className={styles.credentialRow}>
            <span className={styles.credentialLabel}>Correo electrónico</span>
            <span className={styles.credentialValue}>{newUserCredentials.email}</span>
          </div>

          <div className={styles.credentialDivider}></div>

          <div className={styles.credentialRow}>
            <span className={styles.credentialLabel}>Contraseña temporal</span>
            <div className={styles.passwordDisplay}>
              <span className={styles.passwordText}>{newUserCredentials.password}</span>
              <button
                type="button"
                className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
                onClick={handleCopy}
                title="Copiar contraseña"
              >
                {copied ? <Check /> : <Clipboard />}
              </button>
            </div>
          </div>
        </div>
      </Modal>

    </div>
  );
};