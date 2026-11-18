import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
    fetchCitizenById,
    clearCurrentCitizen,
    clearCitizensError
} from '../../../store/slices/citizensSlice';
import { Card } from '../../../components/ui/Card/Card';
import { Badge } from '../../../components/ui/Badge/Badge';
import { Button } from '../../../components/ui/Button/Button';
import { Spinner } from '../../../components/ui/Spinner/Spinner';
import { Alert } from '../../../components/ui/Alert/Alert';
import styles from './CitizenDetailPage.module.css';

export const CitizenDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { currentCitizen, loading, error } = useSelector((state) => state.citizens);

    useEffect(() => {
        if (id) dispatch(fetchCitizenById(id));
        return () => {
            dispatch(clearCurrentCitizen());
            dispatch(clearCitizensError());
        };
    }, [id, dispatch]);

    const formatDate = (dateString) => {
        if (!dateString) return '—';
        return new Date(dateString).toLocaleDateString('es-PE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatBirthDate = (dateString) => {
        if (!dateString) return '—';
        // The date of birth is provided in "YYYY-MM-DD" format; we do not need the time.
        return new Date(dateString + 'T00:00:00').toLocaleDateString('es-PE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (loading && !currentCitizen) {
        return <Spinner centered label="Cargando detalles del ciudadano..." />;
    }

    if (error) {
        return <Alert variant="error" title="Error al cargar">{error}</Alert>;
    }

    if (!currentCitizen) {
        return null;
    }

    return (
        <div className={styles.page}>

            {/* Header */}
            <div className={styles.header}>
                <div>
                    <Link to="/admin/citizens" className={styles.backLink}>
                        ← Volver al listado
                    </Link>
                    <h2 className={styles.title}>Detalle del Ciudadano</h2>
                </div>
                <div className={styles.headerActions}>
                    <Link to={`/admin/citizens/${currentCitizen.id}/edit`}>
                        <Button variant="primary" size="md">Editar Ciudadano</Button>
                    </Link>
                </div>
            </div>

            <div className={styles.gridContainer}>

                {/* Left Column: Personal Details*/}
                <div className={styles.mainColumn}>
                    <Card title="Información Personal">
                        <div className={styles.dataGrid}>
                            <div className={styles.dataGroup}>
                                <span className={styles.label}>Primer Nombre</span>
                                <span className={styles.value}>{currentCitizen.firstName}</span>
                            </div>
                            <div className={styles.dataGroup}>
                                <span className={styles.label}>Segundo Nombre</span>
                                <span className={styles.value}>{currentCitizen.secondName || '—'}</span>
                            </div>
                            <div className={styles.dataGroup}>
                                <span className={styles.label}>Tercer Nombre</span>
                                <span className={styles.value}>{currentCitizen.thirdName || '—'}</span>
                            </div>

                            <div className={styles.dataGroup}>
                                <span className={styles.label}>Apellido Paterno</span>
                                <span className={styles.value}>{currentCitizen.fatherLastname}</span>
                            </div>
                            <div className={styles.dataGroup}>
                                <span className={styles.label}>Apellido Materno</span>
                                <span className={styles.value}>{currentCitizen.motherLastname}</span>
                            </div>
                            <div className={styles.dataGroup}>
                                {/* This empty div is for keeping the grid aligned.*/}
                            </div>

                            <div className={styles.dataGroup}>
                                <span className={styles.label}>DNI</span>
                                <span className={styles.value}>{currentCitizen.dni}</span>
                            </div>
                            <div className={styles.dataGroup}>
                                <span className={styles.label}>Fecha de Nacimiento</span>
                                <span className={styles.value}>{formatBirthDate(currentCitizen.birthDate)}</span>
                            </div>
                            <div className={styles.dataGroup}>
                                <span className={styles.label}>Género</span>
                                <div>
                                    <Badge variant={currentCitizen.gender === 'MALE' ? 'info' : 'neutral'}>
                                        {currentCitizen.gender === 'MALE' ? 'Masculino' : 'Femenino'}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Audit */}
                <div className={styles.sideColumn}>
                    <Card title="Información del Sistema" padding="md">
                        <div className={styles.auditList}>
                            <div className={styles.auditItem}>
                                <span className={styles.auditLabel}>ID de Ciudadano</span>
                                <span className={styles.auditValue}>#{currentCitizen.id}</span>
                            </div>
                            <div className={styles.auditItem}>
                                <span className={styles.auditLabel}>Creado el</span>
                                <span className={styles.auditValue}>{formatDate(currentCitizen.createdAt)}</span>
                            </div>
                            <div className={styles.auditItem}>
                                <span className={styles.auditLabel}>Creado por</span>
                                <span className={styles.auditValue}>{currentCitizen.createdBy || 'Sistema'}</span>
                            </div>
                            <div className={styles.auditDivider}></div>
                            <div className={styles.auditItem}>
                                <span className={styles.auditLabel}>Última modificación</span>
                                <span className={styles.auditValue}>{formatDate(currentCitizen.updatedAt)}</span>
                            </div>
                            <div className={styles.auditItem}>
                                <span className={styles.auditLabel}>Modificado por</span>
                                <span className={styles.auditValue}>{currentCitizen.updatedBy || '—'}</span>
                            </div>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
};