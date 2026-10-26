
import { Link } from 'react-router-dom';

export const ForbiddenPage = () => {
  return (
    <div>
      <h1>403 - Acceso denegado</h1>
      <p>No tienes permisos para acceder a esta página.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};