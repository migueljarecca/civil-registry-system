import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    fetchAllCitizens,
    deleteCitizenThunk,
    clearCitizensError
} from '../../../store/slices/citizensSlice';
import { Button } from '../../../components/ui/Button/Button';
import { Alert } from '../../../components/ui/Alert/Alert';
import { Spinner } from '../../../components/ui/Spinner/Spinner';
import { Modal } from '../../../components/ui/Modal/Modal';
import { Eye, Pencil, Plus, Trash } from '../../../assets/icons/Common/Common';
import styles from './CitizenListPage.module.css';

// Helper to format the full name
const getFullName = (c) => {
    const names = [c.firstName, c.secondName, c.thirdName].filter(Boolean).join(' ');
    const lastnames = [c.fatherLastname, c.motherLastname].filter(Boolean).join(' ');
    return { names, lastnames };
};

// Helper to format date
const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const CitizenListPage = () => {
    const dispatch = useDispatch();
    const { citizens, loading, error } = useSelector((state) => state.citizens);

    // States for the deletion modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [citizenToDelete, setCitizenToDelete] = useState(null);

    useEffect(() => {
        dispatch(fetchAllCitizens());
    }, [dispatch]);

    const handleDeleteClick = (citizen) => {
        setCitizenToDelete(citizen);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (citizenToDelete) {
            dispatch(deleteCitizenThunk(citizenToDelete.id));
            setIsDeleteModalOpen(false);
            setCitizenToDelete(null);
        }
    };

    if (loading && citizens.length === 0) {
        return <Spinner centered label="Cargando ciudadanos..." />;
    }

    return (
        <div className={styles.page}>

            {/* Data Table Header */}
            <div className={styles.header}>
                <div>
                    <h2 className={styles.title}>Registro de Ciudadanos</h2>
                    <p className={styles.subtitle}>Gestiona las personas registradas en el sistema.</p>
                </div>
                <Link to="/admin/citizens/new">
                    <Button variant="primary" size="md">
                        <Plus />
                        Nuevo Ciudadano
                    </Button>
                </Link>
            </div>

            {/* Error Banner */}
            {error && (
                <Alert variant="error" title="Error" onClose={() => dispatch(clearCitizensError())}>
                    {error}
                </Alert>
            )}

            {/* Data Table */}
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Ciudadano</th>
                            <th>DNI</th>
                            <th>Género</th>
                            <th>F. Nacimiento</th>
                            <th className={styles.textRight}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citizens.map((c) => {
                            const { names, lastnames } = getFullName(c);
                            return (
                                <tr key={c.id}>

                                    {/* Citizen (Names + Lastnames) */}
                                    <td>
                                        <div className={styles.citizenCell}>
                                            <span className={styles.citizenName}>{names}</span>
                                            <span className={styles.citizenLastnames}>{lastnames}</span>
                                        </div>
                                    </td>

                                    {/* DNI */}
                                    <td className={styles.cellText}>{c.dni}</td>

                                    {/* Gender */}
                                    <td className={styles.cellText}>
                                        {c.gender === 'MALE' ? 'Masculino' : c.gender === 'FEMALE' ? 'Femenino' : '—'}
                                    </td>

                                    {/* Birth Date */}
                                    <td className={styles.cellText}>
                                        {formatDate(c.birthDate)}
                                    </td>

                                    {/* Actions */}
                                    <td>
                                        <div className={styles.actions}>
                                            <Link to={`/admin/citizens/${c.id}`} title="Ver detalle">
                                                <button className={styles.actionBtn}><Eye /></button>
                                            </Link>
                                            <Link to={`/admin/citizens/${c.id}/edit`} title="Editar">
                                                <button className={styles.actionBtn}><Pencil /></button>
                                            </Link>
                                            <button
                                                className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                                onClick={() => handleDeleteClick(c)}
                                                title="Eliminar"
                                            >
                                                <Trash />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* ============ ELIMINATION MODAL ============ */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Eliminar ciudadano"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={confirmDelete} loading={loading}>
                            Sí, eliminar
                        </Button>
                    </>
                }
            >
                <p>
                    ¿Estás seguro de que deseas eliminar a <strong>{citizenToDelete?.firstName} {citizenToDelete?.fatherLastname}</strong>?
                </p>
                <p style={{ marginTop: 'var(--space-md)', color: 'var(--color-danger)', fontWeight: 'bold' }}>
                    Esta acción no se puede deshacer.
                </p>
            </Modal>

        </div>
    );
};