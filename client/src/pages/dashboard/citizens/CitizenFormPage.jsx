import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
    fetchCitizenById,
    createCitizenThunk,
    updateCitizenThunk,
    clearCurrentCitizen,
    clearFieldError,
    clearCitizensError
} from '../../../store/slices/citizensSlice';
import { Input } from '../../../components/ui/Input/Input';
import { Button } from '../../../components/ui/Button/Button';
import { Alert } from '../../../components/ui/Alert/Alert';
import { Spinner } from '../../../components/ui/Spinner/Spinner';
import styles from './CitizenFormPage.module.css';

const initialForm = {
    firstName: '',
    secondName: '',
    thirdName: '',
    fatherLastname: '',
    motherLastname: '',
    dni: '',
    birthDate: '',
    gender: 'MALE',
};

export const CitizenFormPage = () => {
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentCitizen, loading, error, fieldErrors } = useSelector((state) => state.citizens);

    const [form, setForm] = useState(initialForm);
    const [localErrors, setLocalErrors] = useState({});

    // 1. Fetch citizen data if in edit mode
    useEffect(() => {
        if (isEditMode && id) {
            dispatch(fetchCitizenById(id));
        }
        return () => {
            dispatch(clearCurrentCitizen());
            dispatch(clearCitizensError());
        };
    }, [id, isEditMode, dispatch]);

    // 2. Populate form when data arrives
    useEffect(() => {
        if (isEditMode && currentCitizen) {
            setForm({
                firstName: currentCitizen.firstName || '',
                secondName: currentCitizen.secondName || '',
                thirdName: currentCitizen.thirdName || '',
                fatherLastname: currentCitizen.fatherLastname || '',
                motherLastname: currentCitizen.motherLastname || '',
                dni: currentCitizen.dni || '',
                birthDate: currentCitizen.birthDate || '',
                gender: currentCitizen.gender || 'MALE',
            });
        }
    }, [currentCitizen, isEditMode]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value,
        });
        setLocalErrors((prev) => ({ ...prev, [name]: '' }));

        // We clear the specific backend error.
        if (fieldErrors) {
            dispatch(clearFieldError(name));
        }
        // We clear the general error
        if (error) {
            dispatch(clearCitizensError());
        }

    };

    const validate = () => {
        const newErrors = {};

        if (!form.firstName.trim()) newErrors.firstName = 'El primer nombre es obligatorio';
        if (!form.secondName.trim()) newErrors.secondName = 'El segundo nombre es obligatorio';
        if (!form.fatherLastname.trim()) newErrors.fatherLastname = 'El apellido paterno es obligatorio';
        if (!form.motherLastname.trim()) newErrors.motherLastname = 'El apellido materno es obligatorio';
        if (!form.dni.trim()) newErrors.dni = 'El DNI es obligatorio';
        if (!form.birthDate) newErrors.birthDate = 'La fecha de nacimiento es obligatoria';

        setLocalErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Merge local validation errors with backend errors
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

        dispatch(clearCitizensError());

        if (isEditMode) {
            const result = await dispatch(updateCitizenThunk({ id, citizenData: form }));
            if (updateCitizenThunk.fulfilled.match(result)) {
                navigate('/admin/citizens');
            }
        } else {
            const result = await dispatch(createCitizenThunk(form));
            if (createCitizenThunk.fulfilled.match(result)) {
                navigate('/admin/citizens');
            }
        }
    };

    if (isEditMode && loading && !currentCitizen) {
        return <Spinner centered label="Cargando datos del ciudadano..." />;
    }

    return (
        <div className={styles.page}>

            {/* Header */}
            <div className={styles.header}>
                <Link to="/admin/citizens" className={styles.backLink}>
                    ← Volver al listado
                </Link>
                <h2 className={styles.title}>
                    {isEditMode ? 'Editar Ciudadano' : 'Registrar Nuevo Ciudadano'}
                </h2>
                <p className={styles.subtitle}>
                    {isEditMode
                        ? `Modificando los datos de ${form.firstName} ${form.fatherLastname}.`
                        : 'Completa los datos personales para registrar al ciudadano.'}
                </p>
            </div>

            {error && (
                <Alert variant="error" title="Error al guardar">
                    {error}
                </Alert>
            )}

            <form className={styles.formCard} onSubmit={onSubmit} noValidate>

                {/* ============ PERSONAL DATA ============ */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Datos del Ciudadano</h3>

                    {/* Names */}
                    <div className={styles.row3}>
                        <Input
                            label="Primer Nombre"
                            name="firstName"
                            value={form.firstName}
                            onChange={onInputChange}
                            disabled={loading}
                            error={getFieldError('firstName')}
                            placeholder="Ej. Juan"
                            required
                        />
                        <Input
                            label="Segundo Nombre"
                            name="secondName"
                            value={form.secondName}
                            onChange={onInputChange}
                            disabled={loading}
                            error={getFieldError('secondName')}
                            placeholder="Ej. Carlos"
                            required
                        />
                        <Input
                            label="Tercer Nombre"
                            name="thirdName"
                            value={form.thirdName}
                            onChange={onInputChange}
                            disabled={loading}
                            error={getFieldError('thirdName')}
                            placeholder="Ej. Alberto"
                        />
                    </div>

                    {/* Lastname */}
                    <div className={styles.row}>
                        <Input
                            label="Apellido Paterno"
                            name="fatherLastname"
                            value={form.fatherLastname}
                            onChange={onInputChange}
                            disabled={loading}
                            error={getFieldError('fatherLastname')}
                            placeholder="Ej. Pérez"
                            required
                        />
                        <Input
                            label="Apellido Materno"
                            name="motherLastname"
                            value={form.motherLastname}
                            onChange={onInputChange}
                            disabled={loading}
                            error={getFieldError('motherLastname')}
                            placeholder="Ej. Gómez"
                            required
                        />
                    </div>

                    {/* National ID and Date of Birth*/}
                    <div className={styles.row}>
                        <Input
                            label="DNI"
                            name="dni"
                            value={form.dni}
                            onChange={onInputChange}
                            disabled={loading}
                            error={getFieldError('dni')}
                            maxLength={8}
                            placeholder="Ej. 87654321"
                            required
                        />
                        <Input
                            label="Fecha de Nacimiento"
                            type="date"
                            name="birthDate"
                            value={form.birthDate}
                            onChange={onInputChange}
                            disabled={loading}
                            error={getFieldError('birthDate')}
                            required
                        />
                    </div>
                </div>

                {/* ============ ADDITIONAL INFORMATION ============ */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Información Adicional</h3>

                    <div className={styles.row}>
                        <div className={styles.checkboxGroup}>
                            <span className={styles.checkboxLabel}>Género</span>
                            <div className={styles.radioGroup}>
                                <label className={styles.radio}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="MALE"
                                        checked={form.gender === 'MALE'}
                                        onChange={onInputChange}
                                        disabled={loading}
                                    />
                                    Masculino
                                </label>
                                <label className={styles.radio}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="FEMALE"
                                        checked={form.gender === 'FEMALE'}
                                        onChange={onInputChange}
                                        disabled={loading}
                                    />
                                    Femenino
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ============ ACTIONS ============ */}
                <div className={styles.actions}>
                    <Button
                        type="button"
                        variant="ghost"
                        size="lg"
                        onClick={() => navigate('/admin/citizens')}
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
                        {isEditMode ? 'Guardar cambios' : 'Registrar ciudadano'}
                    </Button>
                </div>

            </form>
        </div>
    );
};